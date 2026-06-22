import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Form} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {AuthContext} from '../AuthContext';

interface PendingRecord {
    hull: number;
    owner?: {name?: string};
    name?: string;
    type?: string;
    blurb?: string;
    location?: string;
    web?: string;
    img?: string;
}

function FleetPending() {
    const {username, loading} = useContext(AuthContext);
    const history = useHistory();
    const [records, setRecords] = useState<PendingRecord[]>([]);
    const [approved, setApproved] = useState<Record<number, boolean>>({});
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!loading && !username) {
            history.push('/login');
        }
    }, [loading, username, history]);

    useEffect(() => {
        fetch('/fleet_pending.php', {credentials: 'same-origin'})
            .then((r) => r.json())
            .then((data) => setRecords(data.records ?? []))
            .catch(() => setError('Failed to load pending fleet updates.'));
    }, []);

    function toggleApprove(hull: number) {
        setApproved({...approved, [hull]: !approved[hull]});
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        const hulls = Object.keys(approved).filter((hull) => approved[Number(hull)]).map(Number);
        if (hulls.length === 0) {
            setError('Select at least one record to approve.');
            return;
        }
        setSubmitting(true);
        fetch('/fleet_approve.php', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({hulls}),
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || 'approve failed');
                }
                setRecords(records.filter((r) => !hulls.includes(r.hull)));
                setApproved({});
                setSuccess('Approved fleet update(s) for hull ' + hulls.join(', ') + '.');
            })
            .catch(() => setError('Failed to approve fleet update(s).'))
            .finally(() => setSubmitting(false));
    }

    return (
        <div className="container">
            <h2>Pending Fleet Updates</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            {records.length === 0 && <p>No pending fleet updates.</p>}
            <Form onSubmit={handleSubmit}>
                {records.map((record) => (
                    <div key={record.hull}>
                        <h4>Hull #{record.hull}</h4>
                        Owner: {record.owner?.name}<br/>
                        Type: {record.type}<br/>
                        Name: <b>{record.name?.toUpperCase()}</b><br/>
                        Location: {record.location}<br/>
                        {record.web && <div>Web: <a href={record.web}>{record.web}</a><br/></div>}
                        {record.img && (
                             <div><br/><img src={`/fleet_pending_image.php?hull=${record.hull}`} style={{ maxWidth: 300, maxHeight: 300 }} /><br/></div>
                        )}
                        <p><i>{record.blurb}</i></p>
                        <Form.Check
                            type="checkbox"
                            id={`approve-${record.hull}`}
                            label="Approve"
                            checked={!!approved[record.hull]}
                            onChange={() => toggleApprove(record.hull)}
                        />
                        <hr/>
                    </div>
                ))}
                {records.length > 0 && (
                    <Button variant="primary" type="submit" disabled={submitting}>
                        Submit
                    </Button>
                )}
            </Form>
        </div>
    );
}

export default FleetPending;
