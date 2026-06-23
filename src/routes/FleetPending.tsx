import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Form} from 'react-bootstrap';
import {useHistory, useLocation} from 'react-router-dom';
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
    const location = useLocation();
    const [records, setRecords] = useState<PendingRecord[]>([]);
    const [approved, setApproved] = useState<Record<number, boolean>>({});
    const [rejected, setRejected] = useState<Record<number, boolean>>({});
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!loading && !username) {
            history.push('/login', {from: location.pathname});
        }
    }, [loading, username, history, location]);

    useEffect(() => {
        fetch('/fleet_pending.php', {credentials: 'same-origin'})
            .then((r) => r.json())
            .then((data) => setRecords(data.records ?? []))
            .catch(() => setError('Failed to load pending fleet updates.'));
    }, []);

    function toggleApprove(hull: number) {
        setApproved({...approved, [hull]: !approved[hull]});
        if (!approved[hull]) {
            setRejected({...rejected, [hull]: false});
        }
    }

    function toggleReject(hull: number) {
        setRejected({...rejected, [hull]: !rejected[hull]});
        if (!rejected[hull]) {
            setApproved({...approved, [hull]: false});
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        const approveHulls = Object.keys(approved).filter((hull) => approved[Number(hull)]).map(Number);
        const rejectHulls = Object.keys(rejected).filter((hull) => rejected[Number(hull)]).map(Number);
        if (approveHulls.length === 0 && rejectHulls.length === 0) {
            setError('Select at least one record to approve or reject.');
            return;
        }
        setSubmitting(true);
        Promise.all([
            approveHulls.length > 0
                ? fetch('/fleet_approve.php', {
                      method: 'POST',
                      credentials: 'same-origin',
                      headers: {'Content-Type': 'application/json'},
                      body: JSON.stringify({hulls: approveHulls}),
                  }).then(async (res) => {
                      const data = await res.json();
                      if (!res.ok) {
                          throw new Error(data.error || 'approve failed');
                      }
                  })
                : Promise.resolve(),
            rejectHulls.length > 0
                ? fetch('/fleet_reject.php', {
                      method: 'POST',
                      credentials: 'same-origin',
                      headers: {'Content-Type': 'application/json'},
                      body: JSON.stringify({hulls: rejectHulls}),
                  }).then(async (res) => {
                      const data = await res.json();
                      if (!res.ok) {
                          throw new Error(data.error || 'reject failed');
                      }
                  })
                : Promise.resolve(),
        ])
            .then(() => {
                const handled = [...approveHulls, ...rejectHulls];
                setRecords(records.filter((r) => !handled.includes(r.hull)));
                setApproved({});
                setRejected({});
                const messages = [];
                if (approveHulls.length > 0) {
                    messages.push('Approved hull ' + approveHulls.join(', '));
                }
                if (rejectHulls.length > 0) {
                    messages.push('Rejected hull ' + rejectHulls.join(', '));
                }
                setSuccess(messages.join('. ') + '.');
            })
            .catch(() => setError('Failed to submit fleet update review.'))
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
                        <Form.Check
                            type="checkbox"
                            id={`reject-${record.hull}`}
                            label="Reject"
                            checked={!!rejected[record.hull]}
                            onChange={() => toggleReject(record.hull)}
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
