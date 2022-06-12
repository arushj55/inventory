import { ControlledCarousel } from "../component/common/slider"
import "./map.css"


export function HomePage() {
    return (<>
        <div className="container-fluid " padding="5px">
            <ControlledCarousel />
        </div>

        <div className="container-fluid row mt-5 ">
            <div className="col-6">
                <ControlledCarousel />
            </div>
            <div className="col-6">
                <h1 align="center" className="col-12">About us</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
        </div>

        <div className="container-fluid row mt-5">
            <div className="col-sm-6">
                <div className="mapouter">
                    <div className="gmap_canvas">
                        <iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=blue%20star%20complex&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                    </div>
                </div>

            </div>

            <div className="color col-sm-6" style={{ backgroundImage: `url("https://traineeships.ec.europa.eu/sites/default/files/styles/eac_ratio_16_9_large/public/2021-06/contact-03.png?h=a955cd85&itok=Jp1BE4h6")` }}>
                <h1 align="center" className="row-12" >Contact Us</h1>
                <div>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-floating mb-3">
                            <textarea className="form-control" placeholder="Message" id="floatingTextarea"></textarea>
                            <label for="floatingTextarea">Message</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>

        </>)
}