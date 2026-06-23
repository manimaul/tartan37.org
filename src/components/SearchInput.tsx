import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

interface Props {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

function SearchInput({ value, onChange, placeholder }: Props) {
    return (
        <InputGroup className="mb-3">
            <Form.Control
                type="text"
                placeholder={placeholder ?? 'Search'}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={() => onChange('')} disabled={!value}>
                Clear
            </Button>
        </InputGroup>
    );
}

export default SearchInput;
