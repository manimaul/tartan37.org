import React, {useContext, useState} from 'react';
import {Alert, Button, Form} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {AuthContext} from '../AuthContext';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const {setUsername: setAuthUsername} = useContext(AuthContext);
    const history = useHistory();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        fetch('/forum_login.php', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password}),
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || 'login failed');
                }
                setAuthUsername(data.username);
                history.push('/');
            })
            .catch(() => setError('Invalid username or password.'))
            .finally(() => setSubmitting(false));
    }

    return (
        <div className="container">
            <Form style={{maxWidth: '400px', margin: '0 auto'}} onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form.Group className="mb-3" controlId="loginUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={submitting}>
                    Login
                </Button>
            </Form>
        </div>
    );
}

export default Login;
