import React from 'react';
import image294 from '../assets/images/image294.gif';
import image3051 from '../assets/images/image3051.jpg';
import image3071 from '../assets/images/image3071.jpg';
import image3091 from '../assets/images/image3091.jpg';

function Specifications() {
    return (
        <div className="container">
            <h1>Tartan 37 Specifications</h1>
            <h4>Designer: Sparkman & Stephens</h4>
            <br />
            <div className="row">
                <div className="col">
                    <img src={image294}/>
                </div>
                <div className="col">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col" colSpan={2}>Specifications</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">L.O.A.</th>
                            <td>37'3-1/2"</td>
                        </tr>
                        <tr>
                            <th scope="row">Beam</th>
                            <td>11'9"</td>
                        </tr>
                        <tr>
                            <th scope="row">Draft (Centerboard)</th>
                            <td>Up 4' 2" - Down 7' 9"</td>
                        </tr>
                        <tr>
                            <th scope="row">Draft (Fin)</th>
                            <td>6' 7"</td>
                        </tr>
                        <tr>
                            <th scope="row">Displacement</th>
                            <td>17,800.00 lb</td>
                        </tr>
                        <tr>
                            <th scope="row">Ballast</th>
                            <td>7,500.00 lb</td>
                        </tr>
                        <tr>
                            <th scope="row">Datum Waterline</th>
                            <td>28' 6"</td>
                        </tr>
                        <tr>
                            <th scope="row">Sailing Waterline - Point of Immersion forward to after point of immersion</th>
                            <td>33'+</td>
                        </tr>
                        <tr>
                            <th scope="row">Sail Area</th>
                            <td>625 Sq. Ft.</td>
                        </tr>
                        <tr>
                            <th scope="row">Berths</th>
                            <td>6</td>
                        </tr>
                        <tr>
                            <th scope="row">Auxiliary Power</th>
                            <td>Most are powered with the Westerbeke 40 or Westerbeke 50 engine.</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <br />
                    <img src={image3071}/>
                </div>
                <div className="col">
                    <br />
                    <img src={image3051}/>
                </div>
            </div>
            <br />
            <p>Above are color images of a Keel/Centerboard T37 in profile, and of the T37 accommodation plan. Thanks to Ray Durkee, #373 VELERA, who found these.</p>
            <br />
            <h4>Westerbeke 50 Specifications</h4>
            <p>Thanks to Eric Freedman, former owner of Hull #252 KIMBERLITE, who sent along the specifications for the Westerbeke 50. The power curves and the written specifications appear below.</p>
            <table className="table">
                <tbody>
                <tr>
                    <th scope="row">TYPE</th>
                    <td>Four cylinder four cycle overhead valve vertical in-line diesel.</td>
                </tr>
                <tr>
                    <th scope="row">DISPLACEMENT</th>
                    <td>110 cubic inches. Bore 3 5/32", stroke 3 1/2".</td>
                </tr>
                <tr>
                    <th scope="row">POWER</th>
                    <td>41 HP at 3200 RPM (See power curve.)</td>
                </tr>
                <tr>
                    <th scope="row">COMPRESSION RATIO</th>
                    <td>21.47 : 1</td>
                </tr>
                <tr>
                    <th scope="row">WEIGHT</th>
                    <td>460 lbs. basic engine.</td>
                </tr>
                <tr>
                    <th scope="row">FUEL INJECTION EQUIPMENT</th>
                    <td>CAV distributor type injection pump and CAV Pintaux nozzles working        in conjunction with Ricardo Comet V combustion chambers.</td>
                </tr>
                <tr>
                    <th scope="row">CYLINDER BLOCK AND HEAD</th>
                    <td>Special cast iron mono blocks.</td>
                </tr>
                <tr>
                    <th scope="row">CRANKSHAFT</th>
                    <td>Forged steel, counter balanced.</td>
                </tr>
                <tr>
                    <th scope="row">CAMSHAFT</th>
                    <td>Forged steel.</td>
                </tr>
                <tr>
                    <th scope="row">CONNECTION RODS</th>
                    <td>I section alloy steel stampings</td>
                </tr>
                <tr>
                    <th scope="row">PISTONS</th>
                    <td>Aluminum alloy with solid skirt.</td>
                </tr>
                <tr>
                    <th scope="row">MAIN BEARINGS</th>
                    <td>Five, tri metal, heavy duty.</td>
                </tr>
                <tr>
                    <th scope="row">LUBRICATION</th>
                    <td>Wet sump, eccentric rotor pressure pump, camshaft driven.</td>
                </tr>
                <tr>
                    <th scope="row">EXHAUST MANIFOLD</th>
                    <td>Fresh water cooled. Front or rear opening.</td>
                </tr>
                <tr>
                    <th scope="row">COOLING SYSTEM</th>
                    <td>Closed circuit system, including lube oil cooler with heat exchanger mounted.</td>
                </tr>
                <tr>
                    <th scope="row">ANGLE OF INSTALLATION</th>
                    <td>15 degrees maximum.</td>
                </tr>
                <tr>
                    <th scope="row">ELECTRICAL SYSTEM</th>
                    <td>12 Volt negative grounded system with 55 Amp alternator.</td>
                </tr>
                <tr>
                    <th scope="row">MOUNTING</th>
                    <td>Flexible rubber mounts on 18" centers standard.</td>
                </tr>
                </tbody>
            </table>
            <br />
            <img src={image3091}/>

        </div>
    );
}

export default Specifications;