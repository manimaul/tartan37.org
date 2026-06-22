import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Form} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {AuthContext} from '../AuthContext';
import {loadFleet} from './fleetLoader';
import ImageDropzone from '../components/ImageDropzone';

interface FormState {
    hull: string;
    ownerName: string;
    name: string;
    type: string;
    blurb: string;
    location: string;
    web: string;
}

const emptyForm: FormState = {hull: '', ownerName: '', name: '', type: '', blurb: '', location: '', web: ''};

function FleetEdit() {
    const {username, loading} = useContext(AuthContext);
    const history = useHistory();
    const [hulls, setHulls] = useState<number[]>([]);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!loading && !username) {
            history.push('/login');
        }
    }, [loading, username, history]);

    useEffect(() => {
        loadFleet().then((fleet) => setHulls(fleet.map((f) => f.hull).sort((a, b) => a - b)));
    }, []);

    function applyRecord(record: any, hull: number, fromPending: boolean) {
        setForm({
            hull: String(hull),
            ownerName: record?.owner?.name ?? '',
            name: record?.name ?? '',
            type: record?.type ?? '',
            blurb: record?.blurb ?? '',
            location: record?.location ?? '',
            web: record?.web ?? '',
        });
        setImageFile(null);
        if (record?.img) {
            setPreviewUrl(fromPending ? `/fleet_pending_image.php?hull=${hull}&t=${Date.now()}` : `/fleetimg/${record.img}`);
        } else {
            setPreviewUrl(null);
        }
    }

    function handleHullSelect(value: string) {
        setError(null);
        setSuccess(null);
        const hull = parseInt(value, 10);
        if (!hull) {
            setForm(emptyForm);
            setImageFile(null);
            setPreviewUrl(null);
            return;
        }
        fetch(`/fleet_pending.php?hull=${hull}`, {credentials: 'same-origin'})
            .then((r) => r.json())
            .then((data) => {
                if (data.record) {
                    applyRecord(data.record, hull, true);
                    return;
                }
                return loadFleet().then((fleet) => {
                    const existing = fleet.find((f) => f.hull === hull);
                    applyRecord(existing ?? null, hull, false);
                });
            })
            .catch(() => applyRecord(null, hull, false));
    }

    function handleFileSelected(file: File) {
        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        const hull = parseInt(form.hull, 10);
        if (!hull) {
            setError('Select a hull number.');
            return;
        }
        setSubmitting(true);
        const record = {
            hull,
            owner: {name: form.ownerName},
            name: form.name,
            type: form.type,
            blurb: form.blurb,
            location: form.location,
            web: form.web,
        };
        const body = new FormData();
        body.append('data', JSON.stringify(record));
        if (imageFile) {
            body.append('image', imageFile);
        }
        fetch('/fleet_update.php', {method: 'POST', credentials: 'same-origin', body})
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || 'update failed');
                }
                setSuccess('Fleet update submitted for review.');
            })
            .catch(() => setError('Failed to submit fleet update.'))
            .finally(() => setSubmitting(false));
    }

    return (
        <div className="container">
            <h2>Update Fleet Record Request</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && (
                <>
                    <Alert variant="success">{success}</Alert>
                    <Button variant="primary" onClick={() => history.push('/fleet')}>
                        OK
                    </Button>
                </>
            )}
            {!success && (
            <Form style={{maxWidth: '600px'}} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="hullSelect">
                    <Form.Label>Hull Number</Form.Label>
                    <Form.Control as="select" value={form.hull} onChange={(e) => handleHullSelect(e.target.value)}>
                        <option value="">Select a hull...</option>
                        {hulls.map((h) => (
                            <option key={h} value={h}>{h}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="ownerName">
                    <Form.Label>Owner Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={form.ownerName}
                        onChange={(e) => setForm({...form, ownerName: e.target.value})}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="boatName">
                    <Form.Label>Boat Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({...form, name: e.target.value})}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="boatType">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                        type="text"
                        value={form.type}
                        onChange={(e) => setForm({...form, type: e.target.value})}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="boatLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type="text"
                        value={form.location}
                        onChange={(e) => setForm({...form, location: e.target.value})}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="boatWeb">
                    <Form.Label>Website</Form.Label>
                    <Form.Control
                        type="text"
                        value={form.web}
                        onChange={(e) => setForm({...form, web: e.target.value})}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="boatBlurb">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        value={form.blurb}
                        onChange={(e) => setForm({...form, blurb: e.target.value})}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="boatImage">
                    <Form.Label>Image</Form.Label>
                    <ImageDropzone previewUrl={previewUrl} onFileSelected={handleFileSelected} />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={submitting || !form.hull}>
                    Submit Update
                </Button>
            </Form>
            )}
        </div>
    );
}

export default FleetEdit;
