import React from 'react';
import tartan37 from '../assets/images/tartan-37.jpg';
import image297 from '../assets/images/image297.jpg';
import image299 from '../assets/images/image299.jpg';
import image301 from '../assets/images/image301.jpg';
import image303 from '../assets/images/image303.jpg';
import silentVoyage from '../assets/images/silentVoyage.jpeg';
import oceansAreWaiting from '../assets/images/oceansAreWaiting.jpeg';
import superiorRun from '../assets/images/superiorRun.jpeg';
import soulianis from '../assets/images/soulianis.jpg';
import whim from '../assets/images/whim.jpg';
import holiday from '../assets/images/holiday.jpg';
import './Home.css'
import Hero from "../components/Hero";

function Home() {
    return (
        <div>
            {Hero()}
            <div className="container">
                <br/>

                <br/>
                <div className="row">
                    <div className="col">
                        <img src={image297}/>
                    </div>
                    <div className="col">
                        <img src={image299}/>
                    </div>
                    <div className="col">
                        <img src={image301}/>
                    </div>
                    <div className="col">
                        <img src={image303}/>
                    </div>
                </div>

                <br/>
                <br/>
                <h3>Vlogs featuring the Tartan 37</h3>

                <div className="card">
                    <img src={soulianis} className="card-img-top vlog-img"/>
                    <div className="card-body">
                        <h5 className="card-title">Sailing Soulianis</h5>
                        <p className="card-text">We're a couple of born and raised Midwesterners with hearts belonging
                            to
                            the ocean. After a decade of dreaming + planning to buy a sailboat, we found a beautiful
                            Tartan
                            37 in Wisconsin, sailed for a season in the fresh water of Lake Michigan, and are migrating
                            south via the inland river system to saltwater and warmer climates. Join us on our
                            journey!</p>
                        <a href="https://www.youtube.com/channel/UCRqsOR0Y2zru-jXSzLcMcxg" className="btn btn-danger">Watch
                            on YouTube</a>
                    </div>
                </div>
                <br/>
                <div className="card">
                    <img src={holiday} className="card-img-top vlog-img"/>
                    <div className="card-body">
                        <h5 className="card-title">Fun On Holiday Sailing</h5>
                        <p className="card-text">Zach and Lindy quit their jobs, sold most of their stuff, and moved
                            onto
                            their sailboat permanently for cruising. Follow along with us as we travel around on our
                            Tartan
                            37 sailboat Holiday.</p>
                        <a href="https://www.youtube.com/channel/UCuQlVVLEskmQk-d2222OREg" className="btn btn-danger">Watch
                            on YouTube</a>
                    </div>
                </div>
                <br/>
                <div className="card">
                    <img src={whim} className="card-img-top vlog-img"/>
                    <div className="card-body">
                        <h5 className="card-title">Sailing on a Whim</h5>
                        <p className="card-text">Join Dan, Krista, Lilly, and crew as we leave the frigid north and head
                            south to tropical waters in our new sailboat, Whim! We are excited to set off on our
                            adventures
                            and take you with us. We are just getting started, so buckle-up and come along with us as we
                            begin our new adventure!</p>
                        <a href="https://www.youtube.com/c/SailingonaWhim" className="btn btn-danger">Watch
                            on YouTube</a>
                    </div>
                </div>

                <br/>
                <br/>
                <h3>Books featuring the Tartan 37</h3>

                <div className="card">
                    <img src={silentVoyage} className="card-img-top book-img"/>
                    <div className="card-body">
                        <h5 className="card-title">Silent Voyage</h5>
                        <p className="card-text">In 2004, Charl de Villiers became the first deaf person to complete
                            a solo circumnavigation aboard his Tartan 37 Island Time</p>
                        <a href="https://www.amazon.com/s?k=Silent+voyage&i=stripbooks" className="btn btn-primary">Buy
                            on
                            Amazon</a>
                    </div>
                </div>
                <br/>
                <div className="card">
                    <img src={oceansAreWaiting} className="card-img-top book-img"/>
                    <div className="card-body">
                        <h5 className="card-title">The Oceans Are Waiting</h5>
                        <p className="card-text">Sharon Ragle is a woman in perpetual motion, and her rollicking tale
                            about
                            her personal ad attractive lady sailor seeks SWM for cruising future and beyond and marriage
                            and
                            four-and-a-half-year circumnavigation aboard the Tartan 37 TIGGER with said SWM (a great guy
                            named Dave) is written in her brilliantly impulsive style of life.</p>
                        <a href="https://www.amazon.com/s?k=The+oceans+are+waiting&i=stripbooks"
                           className="btn btn-primary">Buy on Amazon</a>
                    </div>
                </div>
                <br/>
                <div className="card">
                    <img src={superiorRun} className="card-img-top book-img"/>
                    <div className="card-body">
                        <h5 className="card-title">Superior Run</h5>
                        <p className="card-text">Paul Findlay is living his dream, sailing the Great Lakes aboard his
                            beloved sailboat and writing about his voyages to pay the bills. When Paul receives a
                            cryptic
                            call for help from his old college roommate Rich Perry, the dream quickly turns into a
                            nightmare. A sudden turn of events has left Rich targeted for death by a powerful, ruthless
                            adversary, and only Paul is left to help him survive. They plan to cross Lake Superior and
                            find
                            safety in Canada, but Rich's enemies are closing in. A deadly game of cat-and-mouse across
                            the
                            greatest of the Great Lakes begins.</p>
                        <a href="https://www.amazon.com/s?k=Superior+run&i=stripbooks" className="btn btn-primary">Buy
                            on
                            Amazon</a>
                    </div>
                </div>
                <br/>
            </div>
        </div>
    );
}

export default Home;