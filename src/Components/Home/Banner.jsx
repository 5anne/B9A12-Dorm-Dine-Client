import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
    return (
        <div className="">
            <Carousel>
                <div>
                    <img src="https://i.postimg.cc/hvM1DL0X/e834888f03983379a37f1be7f70caf40.jpg" />
                    <p className="legend"></p>
                </div>
                <div>
                    <img src="https://i.postimg.cc/PJ4xzcPt/R-1.jpg" />
                    <p className="legend"></p>
                </div>
                <div>
                    <img src="https://i.postimg.cc/FssxP693/R.jpg" />
                    <p className="legend"></p>
                </div>
                <div>
                    <img src="https://i.postimg.cc/Pr5rnSCw/3-dining.jpg" />
                    <p className="legend"></p>
                </div>
                <div>
                    <img src="https://i.postimg.cc/B6CsdFsp/PRIN-MADI-N31-web.jpg" />
                    <p className="legend"></p>
                </div>
                <div>
                    <img src="https://i.postimg.cc/5y7JtMXF/6efb6170d1e3c9e3be41dfe9be01ce77.jpg" />
                    <p className="legend"></p>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;