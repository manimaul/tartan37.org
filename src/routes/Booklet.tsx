import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';

interface BookletItem {
    label: string;
    // physical page number of the scanned PDF (1-based), or null if this
    // item was not included in the scanned booklet.
    page: number | null;
}

interface BookletSection {
    title: string;
    items: BookletItem[];
}

const TOTAL_PAGES = 30;

const sections: BookletSection[] = [
    {
        title: 'Cover',
        items: [
            {label: 'Intro', page: 1},
        ],
    },
    {
        title: 'I. Commissioning',
        items: [
            {label: 'Before Launching', page: 4},
            {label: 'After Launching', page: 4},
            {label: 'Stepping the Mast', page: 4},
            {label: 'Preliminary Tuning', page: 5},
            {label: 'Final Tuning', page: 6},
            {label: 'Chocking the Mainmast', page: 7},
            {label: 'Adjustment of Mast Step', page: 7},
            {label: 'Adjusting Centerboard Travel', page: 7},
            {label: 'Diagram of Centerboard Lift System', page: 9},
            {label: 'Steering', page: 8},
            {label: 'Rigging Tips', page: 10},
        ],
    },
    {
        title: 'II. General Information',
        items: [
            {label: 'Masthead', page: 11},
            {label: 'Mast Boot', page: 11},
            {label: 'Draft Marks', page: 11},
            {label: 'Hatches', page: 11},
            {label: 'Portlights', page: 11},
            {label: 'Compass', page: 12},
            {label: 'Head', page: 12},
            {label: 'Electrical System', page: 12},
            {label: 'Fresh Water System', page: 14},
            {label: 'Hot Water', page: 14},
            {label: 'Automatic Sump Pump', page: 15},
            {label: 'Tankage', page: 16},
            {label: 'Fuel Tank', page: 16},
            {label: 'Diesel Engine', page: 17},
            {label: 'Engine Operation', page: 17},
            {label: 'Exhaust System', page: 18},
            {label: 'Changing Centerboard Pennant', page: 18},
            {label: 'Diagram of Centerboard Pennant', page: 20},
            {label: 'Stove Operation', page: 21},
            {label: 'Jiffy Reefing', page: 22},
            {label: 'Holding Tank Operation', page: 23},
        ],
    },
    {
        title: 'III. Maintenance',
        items: [
            {label: 'General', page: 24},
            {label: 'Finishes', page: 24},
            {label: 'Exterior Teak', page: 25},
            {label: 'Interior Teak', page: 25},
            {label: 'Sails, Sheets, Etc.', page: 25},
            {label: 'Spars and Standing Rigging', page: 25},
            {label: 'Engine and Fuel System', page: 25},
            {label: 'Head', page: 26},
            {label: 'Batteries', page: 26},
            {label: 'Fresh Water System', page: 26},
            {label: 'Winter Storage', page: 26},
            {label: 'Pedestal Steering Data Sheet', page: null},
        ],
    },
    {
        title: 'IV. Rigging List',
        items: [{label: 'Rigging List', page: 27}],
    },
    {
        title: 'V. Electrical Diagram',
        items: [{label: 'Electrical Diagram', page: 28}],
    },
    {
        title: 'VI. Plumbing Diagram',
        items: [{label: 'Plumbing Diagram', page: 29}],
    },
    {
        title: 'VII. Warranty Certificate',
        items: [{label: 'Warranty Certificate', page: null}],
    },
    {
        title: 'VIII. Brochure',
        items: [{label: 'Brochure', page: 30}],
    },
];

function pageSrc(page: number) {
    return `/book_pages/page-${String(page).padStart(2, '0')}.jpg`;
}

interface FlatBookletItem extends BookletItem {
    key: string;
}

const flatItems: FlatBookletItem[] = sections.flatMap((section) =>
    section.items.map((item) => ({...item, key: `${section.title}::${item.label}`}))
);

function firstItemKeyForPage(targetPage: number): string | undefined {
    return flatItems.find((item) => item.page === targetPage)?.key;
}

function Booklet() {
    const [page, setPage] = useState(flatItems[0].page as number);
    const [selectedKey, setSelectedKey] = useState(flatItems[0].key);

    const goToPage = (newPage: number) => {
        setPage(newPage);
        setSelectedKey(firstItemKeyForPage(newPage) ?? '');
    };

    const goBack = () => goToPage(Math.max(1, page - 1));
    const goForward = () => goToPage(Math.min(TOTAL_PAGES, page + 1));

    const navButtons = (
        <div className="d-flex justify-content-between my-3">
            <Button variant="outline-secondary" onClick={goBack} disabled={page <= 1}>
                {'< back'}
            </Button>
            <Button variant="outline-secondary" onClick={goForward} disabled={page >= TOTAL_PAGES}>
                {'forward >'}
            </Button>
        </div>
    );

    return (
        <div className="container">
            <h1>Owner's Booklet</h1>
            <Button
                variant="outline-success"
                href="/techres/T37OwnersBooklet.pdf"
                download
                className="mb-3"
            >
                Download PDF
            </Button>
            <Form.Group className="mb-3" controlId="bookletContents">
                <Form.Label>Contents</Form.Label>
                <Form.Control
                    as="select"
                    value={selectedKey}
                    onChange={(e) => {
                        const key = e.target.value;
                        const item = flatItems.find((i) => i.key === key);
                        if (item && item.page != null) {
                            setPage(item.page);
                            setSelectedKey(key);
                        }
                    }}
                >
                    {sections.map((section) => (
                        <optgroup label={section.title} key={section.title}>
                            {section.items.map((item) => (
                                <option
                                    key={item.label}
                                    value={`${section.title}::${item.label}`}
                                    disabled={item.page == null}
                                >
                                    {item.label}
                                </option>
                            ))}
                        </optgroup>
                    ))}
                </Form.Control>
            </Form.Group>

            {navButtons}
            <div className="text-center">
                <img className="img-fluid" src={pageSrc(page)} alt={`Owner's Booklet page ${page}`}/>
            </div>
            {navButtons}
        </div>
    );
}

export default Booklet;
