export interface Owner {
    name: string;
    modified_ds?: string;
}

export interface FleetItem {
    hull: number;
    owner: Owner;
    name: string;
    type: string;
    blurb: string;
    location: string;
    img: string;
    web: string;
}

export function loadFleet(): Promise<FleetItem[]> {
    return fetch('/fleet.json', { cache: 'no-store' }).then(r => r.json());
}

export function filterFleet(fleet: FleetItem[], query: string): FleetItem[] {
    const q = query.trim().toLowerCase();
    if (!q) {
        return fleet;
    }
    return fleet.filter((it) =>
        [String(it.hull), it.name, it.type, it.location, it.owner?.name]
            .some((field) => field != null && field.toString().toLowerCase().includes(q))
    );
}
