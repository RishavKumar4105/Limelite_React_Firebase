import { Link } from "react-router-dom"
export default function InfluencerHome(){
    return(
        <> 
        <section id="hero" className="section hero light-background">
        <div className="container">
        <div className="row gy-4">
        <div
        className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center"
        // data-aos="fade-up"
        >
        <h1>Better digital experience with Limelite</h1>
        <p>We have team of talented influencer to illuminate the path to your success.</p>
        <div className="d-flex">
          <Link to="/getstarted" className="btn-get-started">
            Get Started
          </Link>
          <Link
            to="https://www.youtube.com/watch?v=LXb3EKWsInQ"
            className="glightbox btn-watch-video d-flex align-items-center"
          >
            <i className="bi bi-play-circle" />
            <span>Watch Video</span>
          </Link>
        </div>
      </div>
      <div
        className="col-lg-6 order-1 order-lg-2 hero-img"
     
      >
        <img
          src="assets/img/hero-img.svg"
          className="img-fluid animated"
          alt=""
        />
      </div>
    </div>
  </div>
</section>
        </>
    )
}