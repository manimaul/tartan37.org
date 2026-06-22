import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../AuthContext';
import { FleetItem, loadFleet } from './fleetLoader';

function Image(named: string) {
    if (named != null && named.length > 0) {
        return <div><br /><img src={'/fleetimg/' + named} style={{ maxWidth: 300, maxHeight: 300 }} /><br /></div>;
    }
    return null;
}

function Web(named: string) {
    if (named != null && named.length > 0) {
        return <div>Web: <a href={named}>{named}</a><br /></div>;
    }
    return null;
}

function Item(it: FleetItem) {
    return (
        <div>
            <h4>Hull #{it.hull}</h4>
            Owner: {it.owner.name}<br/>
            Type: {it.type}<br />
            Name: <b>{it.name.toUpperCase()}</b><br />
            Location: {it.location}<br />
            {Web(it.web)}
            {Image(it.img)}<br />
            <p><i>{it.blurb}</i></p>
            <hr />
        </div>
    );
}

export default class Fleet extends React.Component<any, { fleet: FleetItem[] }> {
    static contextType = AuthContext;
    declare context: React.ContextType<typeof AuthContext>;

    constructor(props: any) {
        super(props);
        this.state = { fleet: [] };
    }

    componentDidMount() {
        loadFleet().then(fleet => this.setState({ fleet }));
    }

    public render() {
        return (
            <div className="container">
                {this.context.username && (
                    <div className="mb-3">
                        <Link to="/fleet/edit"><Button variant="primary">Request Update</Button></Link>
                    </div>
                )}
                {this.state.fleet.map((it) => Item(it))}
            </div>
        );
    }
}
