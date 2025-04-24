import React from "react";
import "../style/OurTeam.css";

const OurTeam = () => {
    return (
      <div>
        <div className="ImageBlockWrap">
            <div className="ImageBlock">
            <img src="src/assets/images/ImageSample1.png" alt="img" />
                <div  className="overlay">
                    <div className="social-icons">
                        <a href="#" className="social-icon facebook"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social-icon twitter"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="social-icon pinterest"><i className="fab fa-pinterest-p"></i></a>
                        <a href="#" className="social-icon instagram"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div className="BlockText">
                    <div className="HeadText">Jenny Wilson</div>
                    <div className="SmallText">Ceo & Founder</div>
                </div>
            </div>
            
            <div className="ImageBlock">
                <img src="src/assets/images/ImageSample2.png" alt="img" />
                <div  className="overlay">
                    <div className="social-icons">
                        <a href="#" className="social-icon facebook"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social-icon twitter"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="social-icon pinterest"><i className="fab fa-pinterest-p"></i></a>
                        <a href="#" className="social-icon instagram"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div className="BlockText">
                    <div className="HeadText">Jane Cooper</div>
                    <div className="SmallText">Worker</div>
                </div>
            </div>

            <div className="ImageBlock">
                <img src="src/assets/images/ImageSample3.png" alt="img" />
                <div  className="overlay">
                    <div className="social-icons">
                        <a href="#" className="social-icon facebook"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social-icon twitter"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="social-icon pinterest"><i className="fab fa-pinterest-p"></i></a>
                        <a href="#" className="social-icon instagram"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div className="BlockText">
                    <div className="HeadText">Cody Fisher</div>
                    <div className="SmallText">Security Guard</div>
                </div>
            </div>

            <div className="ImageBlock">
            <img src="src/assets/images/ImageSample4.png" alt="img" />
                <div  className="overlay">
                    <div className="social-icons">
                        <a href="#" className="social-icon facebook"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social-icon twitter"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="social-icon pinterest"><i className="fab fa-pinterest-p"></i></a>
                        <a href="#" className="social-icon instagram"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div className="BlockText">
                    <div className="HeadText">Robert Fox</div>
                    <div className="SmallText">Senior Farmer Manager</div>
                </div>
            </div>
        </div>
      </div>
    );
  };
  
  export default OurTeam;