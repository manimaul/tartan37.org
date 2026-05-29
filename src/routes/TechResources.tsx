import React from 'react';

function TechResources() {
    return (
        <div className="container">
            <b>Follow the resource tree to the area of interest - then select articles by subject name. Click on the
                article name and your browser should open a pdf file that you can save and print.</b>
            <br />
            <br />

            <ul className="list-group list-group-flush">
                <li className="list-group-item list-group-item-dark">Chapter 1: Hull and Deck Structure (Includes wheel,
                    rudder, etc.)
                </li>
                <li className="list-group-item"><a className="nav-link" href="/techres/T37TRC1S1.pdf">Section 1: Pintle Replacement</a></li>
                <li className="list-group-item"><a className="nav-link" href="/techres/T37TRC1S2.pdf">Section 2: Replacing Balsa In A Cored Deck</a></li>
                <li className="list-group-item"><a className="nav-link" href="/techres/T37TRC1S3.pdf">Section 3: Replacing the Skeg</a></li>
            </ul>

            <br />
            <ul className="list-group list-group-flush">
                <li className="list-group-item list-group-item-dark">Chapter 2: Sails and rigging</li>
                <li className="list-group-item"><a className="nav-link" href="/techres/T37TRC2S1.pdf">Section 1: Boom-end Outhaul Control</a></li>
                <li className="list-group-item"><a className="nav-link" href="/techres/T37TRC2S2.pdf">Section 2: Boom—Internal Outhaul Repair/Refurbish</a></li>
                <li className="list-group-item"><a className="nav-link" href="/techres/T37TRC2S3.pdf">Section 3: Chainplate Islands</a></li>
            </ul>

            <br />
            <ul className="list-group list-group-flush">
                <li className="list-group-item list-group-item-dark">Chapter 3: Engine, transmission and prop</li>
                <li className="list-group-item"><a className="nav-link" href="/techres/T37TRC3S1.pdf">Section 1: Engine Replacement</a></li>
                <li className="list-group-item"><a className="nav-link" href="/techres/T37TRC3S2.pdf">Section 2: W50 Raw Water Pump Rebuild</a></li>
                <li className="list-group-item"><a className="nav-link" href="/techres/T37TRC3S3.pdf">Section 3: Bleeding the Westerbeke 50</a></li>
                <li className="list-group-item"><a className="nav-link" href="/techres/T37TRC3S4.pdf">Section 4: Bleeding the Westerbeke 40</a></li>
                <li className="list-group-item"><a className="nav-link" href="/techres/T37TRC3S5.pdf">Section 5: Engine Overheating</a></li>
            </ul>

            <br />
            <ul className="list-group list-group-flush">
                <li className="list-group-item list-group-item-dark">Chapter 4: Plumbing (Water, wastewater, bilge, washdown)</li>
                <li className="list-group-item"><a className="nav-link" href="/techres/T37TRC4S1.pdf">Section 1: Water Heater Replacement</a></li>
                <li className="list-group-item"><a className="nav-link" href="/techres/T37TRC4S2.pdf">Section 2: Propane Locker Installation</a></li>
            </ul>

            <br />
            <ul className="list-group list-group-flush">
                <li className="list-group-item list-group-item-dark">Chapter 5: Electric (Charging systems, general wiring, batteries, inverters)</li>
                <li className="list-group-item"><a className="nav-link" href="/techres/T37TRC5S1.pdf">Section 1: Solar Panels for a Tartan 37</a></li>
            </ul>

            <br />
            <ul className="list-group list-group-flush">
                <li className="list-group-item list-group-item-dark">Chapter 6: Electronics (Instruments, radar, GPS, communications)</li>
            </ul>

            <br />
            <ul className="list-group list-group-flush">
                <li className="list-group-item list-group-item-dark">Chapter 7: Interior (Galley, upholstery, finishes)</li>
            </ul>

            <br />
            <ul className="list-group list-group-flush">
                <li className="list-group-item list-group-item-dark">Chapter 8: Ground tackle (Anchors, rode, windlasses etc.)</li>
            </ul>

            <br />
            <ul className="list-group list-group-flush">
                <li className="list-group-item list-group-item-dark">Chapter 9: General (Information not fitting other categories)</li>
            </ul>

            <br />
            <br />
            <br />

        </div>
    );
}

export default TechResources;