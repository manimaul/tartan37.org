import React, { useState, useEffect } from 'react';
import { FleetItem, loadFleet, filterFleet } from './fleetLoader';
import SearchInput from '../components/SearchInput';

const chunkSize = 4;

function Chunk(arr: FleetItem[]) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        res.push(arr.slice(i, i + chunkSize));
    }
    return res;
}

function Image(named: string) {
    return (
        <div>
            <img src={'/fleetimg/' + named} style={{ maxWidth: 300, maxHeight: 300 }}/><br/>
        </div>
    );
}

function Col(item: FleetItem) {
    return (
        <div className="col-sm">
            <div>
                <b>Hull #{item.hull} - {item.name.toUpperCase()}</b><br/>
                {item.owner.name}<br/>
                {Image(item.img)}<br/>
            </div>
        </div>
    );
}

function Row(groups: FleetItem[]) {
    return (
        <div className="row">
            {groups.map((item) => Col(item))}
            <hr />
        </div>
    );
}

function Gallery() {
    const [fleet, setFleet] = useState<FleetItem[]>([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        loadFleet().then(setFleet);
    }, []);

    const withImages = filterFleet(fleet, query).filter(item => item.img != null && item.img.length > 0);

    return (
        <div className="container">
            <SearchInput value={query} onChange={setQuery} placeholder="Search gallery" />
            {Chunk(withImages).map((chunk) => Row(chunk))}
        </div>
    );
}

export default Gallery;
