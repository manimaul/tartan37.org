import tartan37 from "../assets/images/tartan-37.jpg";
import React from "react";

export default Hero;

function Hero() {
    return(
        <div>
            <div className="hero">
                <img src={tartan37} className="img-fluid" alt="Tartan 37"/>
                <div className="hero-text">
                    <h4>Welcome to the Tartan 37 Sailing Association Web Site</h4>
                    <h6>The Tartan 37 was designed by Sparkman & Stephens. Tartan Yachts produced 486 of these classic
                        boats from 1976 through 1988, and most are still sailing today.
                    </h6>
                </div>
            </div>
        </div>
    )
}