import { Link } from "react-router-dom";
export default function Footer(){
    return(
        <>
        <footer id="footer" className="footer position-relative">
  <div className="footer-newsletter">
    {/* <div className="container">
      <div className="row justify-content-center text-center">
        <div className="col-lg-6">
          <h4>Join Our Newsletter</h4>
          <p>
            Subscribe to our newsletter and receive the latest news about our
            products and services!
          </p>
          <form
            action="forms/newsletter.php"
            method="post"
            className="php-email-form"
          >
            <div className="newsletter-form">
              <input type="email" name="email" />
              <input type="submit" defaultValue="Subscribe" />
            </div>
            <div className="loading">Loading</div>
            <div className="error-message" />
            <div className="sent-message">
              Your subscription request has been sent. Thank you!
            </div>
          </form>
        </div>
      </div>
    </div> */}
 
  <div className="container footer-top">
    <div className="row gy-4">
      <div className="col-lg-4 col-md-6 footer-about">
        <Link to="/" className="d-flex align-items-center">
          <span className="sitename"><strong>LimeLite</strong></span>
        </Link>
        <div className="footer-contact pt-3">
          <p>GN 34/3, Eagle Complex, Salt Lake</p>
          <p>City Sector 5, Kolkata-700091</p>
          <p className="mt-3">
            <strong>Phone:</strong> <span>+91 7418529630</span>
          </p>
          <p>
            <strong>Email:</strong> <span>info@Limelite.in</span>
          </p>
        </div>
      </div>
      <div className="col-lg-2 col-md-3 footer-links">
        <h4>Useful Links</h4>
        <ul>
          <li>
            <i className="bi bi-chevron-right" /> <Link to="#">Home</Link>
          </li>
          <li>
            <i className="bi bi-chevron-right" /> <Link to="#">About us</Link>
          </li>
          <li>
            <i className="bi bi-chevron-right" /> <Link to="#">Services</Link>
          </li>
          <li>
            <i className="bi bi-chevron-right" />{" "}
            <Link to="#">Terms of service</Link>
          </li>
        </ul>
      </div>
      <div className="col-lg-2 col-md-3 footer-links">
        <h4>Our Services</h4>
        <ul>
          <li>
            <i className="bi bi-chevron-right" /> <Link to="#">Instagram Shorts</Link>
          </li>
          <li>
            <i className="bi bi-chevron-right" />{" "}
            <Link to="#">Facebook Shorts</Link>
          </li>
          <li>
            <i className="bi bi-chevron-right" />{" "}
            <Link to="#">Youtube Shorts</Link>
          </li>
          <li>
            <i className="bi bi-chevron-right" /> <Link to="#">Threads</Link>
          </li>
        </ul>
      </div>
      <div className="col-lg-4 col-md-12">
        <h4>Follow Us</h4>
        <p>
        {/* Connect with us on social media to stay tuned to our latest showcases and launches. */}
        Join us on a journey where creativity meets strategy, and where your brand's potential shines
        brightest with LimeLite.
        </p>
        <div className="social-links d-flex">
          <Link to="">
            <i className="bi bi-twitter-x" />
          </Link>
          <Link to="">
            <i className="bi bi-facebook" />
          </Link>
          <Link to="">
            <i className="bi bi-instagram" />
          </Link>
          <Link to="">
            <i className="bi bi-linkedin" />
          </Link>
        </div>
      </div>
    </div>
  </div>
  <div className="container copyright text-center mt-4">
    <p>
      © <span>Copyright</span>{" "}
      <strong className="px-1 sitename">Limelite</strong>{" "}
      <span>All Rights Reserved</span>
    </p>
    <div className="credits">
      {/* All the links in the footer should remain intact. */}
      {/* You can delete the links only if you've purchased the pro version. */}
      {/* Licensing information: https://bootstrapmade.com/license/ */}
      {/* Purchase the pro version with working PHP/AJAX contact form: [buy-url] */}
      Designed by <Link to="https://bootstrapmade.com/">Rishav Kumar</Link>
    </div>
  </div>
  </div>
</footer>


        </>
    )
}