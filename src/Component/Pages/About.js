import { Link } from "react-router-dom";
export default function About(){
    return(
       
        <>
  <section className="w3l-about-breadcrumb text-center">
    <div className="breadcrumb-bg breadcrumb-bg-about py-5">
      <div className="container py-lg-5 py-md-4">
        <h2 className="title pt-md-5 pt-4">About Us</h2>
        <p className="inner-page-para mt-2">
          Experience you can trust, service you can count on.
        </p>
      </div>
      <div className="hero-overlay" />
    </div>
  </section>
  {/* //about breadcrumb */}
  <section className="w3l-aboutblock1" id="about">
    <div className="midd-w3 py-5">
      <div className="container py-lg-5 py-md-4 py-2">
        <div className="row">
          <div className="col-lg-6 left-wthree-img">
            <div className="position-relative">
              <img
                src="assets/images/about2.jpg"
                alt=""
                className="img-fluid radius-image-full"
              />
              
            </div>
          </div>
          <div className="col-lg-6 mt-lg-0 mt-5 about-right-faq align-self">
            <h5 className="title-small mb-1">About our company</h5>
            <h3 className="title-big">
              We are the next generation of the business world, creative
              solutions
            </h3>
            {/* <h4 className="mt-4">
              Over 25 years, We complete every project with extra care as
              customer needs.
            </h4> */}
            <p className="mt-4">
            LimeLite is your premier platform for video promotion through influencers and content creators. We specialize in crafting engaging video content for YouTube Shorts, Instagram Reels, Facebook Videos, and more, helping brands capture attention and drive results. With our expertise, we connect you with top creators to amplify your message and make your brand shine in the digital spotlight.
            </p>
            
            <Link
              to="#small-dialog1"
              className="popup-with-zoom-anim play-view text-center position-absolute mt-md-4 mt-3 pt-md-3"
            >
              <span className="video-play-icon">
                <span className="fa fa-play" />
              </span>
            </Link>
            {/* dialog itself, mfp-hide class is required to make dialog hidden */}
            <div id="small-dialog1" className="zoom-anim-dialog mfp-hide">
              <iframe
                src="https://www.youtube.com/embed/e-ihHSzcBN0?si=DPXY1o7SytEailzV" 
                allow="autoplay; fullscreen"
                allowFullScreen=""
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-5 pt-lg-5">
          <div className="col-lg-4 col-md-6 grids-feature">
            <div className="area-box">
              <i className="fa fa-xing" aria-hidden="true" />
              <div className="area-box-info">
                <h4>
                  <Link to="#feature" className="title-head">
                    Perfect Design
                  </Link>
                </h4>
                <p>
                A perfect design balances clarity, consistency, and visual appeal, ensuring an intuitive and responsive user experience. Prioritize accessibility and performance, and be prepared to refine based on user feedback.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 grids-feature mt-md-0 mt-4">
            <div className="area-box">
              <i className="fa fa-thumbs-o-up" aria-hidden="true" />
              <div className="area-box-info">
                <h4>
                  <Link to="#feature" className="title-head">
                    Carefully Planned
                  </Link>
                </h4>
                <p>
                A carefully planned design meticulously aligns every element with user needs and strategic goals. This thoughtful approach enhances functionality and ensures a cohesive, impactful experience.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 grids-feature mt-lg-0 mt-4">
            <div className="area-box">
              <i className="fa fa-angellist" aria-hidden="true" />
              <div className="area-box-info">
                <h4>
                  <Link to="#feature" className="title-head">
                    Smartly Execute
                  </Link>
                </h4>
                <p>
                  
Smartly executing a design means translating thoughtful planning into an effective, functional solution. It involves precise attention to detail and seamless integration of elements to ensure a polished, user-friendly experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="w3l-about2 py-5">
    <div className="container py-lg-5 py-md-4 py-2">
      <div className="row cwp23-content align-items-center">
        <div className="col-lg-6">
          <h5 className="title-small mb-3">
            {" "}
            Video designing and Promoting{" "}
          </h5>
          <h3 className="title-big">
            {" "}
            We think strategy, editing, and uploading {" "}
          </h3>
          <div className="cwp23-text-cols mt-lg-5 mt-4">
            <div className="column">
              <span>120+</span>
              <h4>Happy Clients</h4>
              <p>
                We help our clients increase profits by increasing their
                visibility online.
              </p>
            </div>
            <div className="column">
              <span>150+</span>
              <h4>Completed projects </h4>
              <p>
                We help our clients increase profits by increasing their
                visibility online.{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-6 cwp23-text align-self mt-lg-0 mt-md-5 mt-4 pr-md-3 pr-2">
          <img
            src="assets/images/ab.jpg"
            alt=""
            className="radius-image img-fluid"
          />
        </div>
        <div className="col-lg-3 col-6  cwp23-text align-self mt-lg-0 mt-md-5 mt-4 pl-md-3 pl-2">
          <img
            src="assets/images/ab2.jpg"
            alt=""
            className="radius-image img-fluid"
          />
        </div>
      </div>
    </div>
  </section>
  <section className="w3l-about4 py-5" id="cover">
    <div className="container px-0 py-lg-5 py-md-4 py-2">
      <div className="history-info position-relative">
        <div className="heading mx-auto text-center">
          <h3 className="title-big">
            We are the next generation of the business world, creative solutions
          </h3>
         
          <Link
            to="#small-dialog"
            className="popup-with-zoom-anim play-view text-center mt-4"
          >
            <span className="video-play-icon">
              <span className="fa fa-play" />
            </span>
          </Link>
        </div>
        <div className="position-relative">
          {/* dialog itself, mfp-hide class is required to make dialog hidden */}
          <div id="small-dialog" className="zoom-anim-dialog mfp-hide">
            <iframe
              src="https://www.youtube.com/embed/tUjIwYeVlQc?si=iME2b0kTvWQN0dnD" 
              frameBorder={0}
              allow="autoplay; fullscreen"
              allowFullScreen=""
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <section className="w3l-content-4 py-5" id="features">
    <div className="content-4-main py-lg-5 py-md-4">
      <div className="container">
        <div className="title-content text-center">
          <h3 className="title-small"> Why choose us</h3>
          <h3 className="title-big mx-lg-5">
            People choose us because we serve the best for everyone
          </h3>
        </div>
        <div className="content-info-in row mt-5 pt-lg-5">
          <div className="content-left col-lg-6">
            <div className="row content4-right-grids mb-sm-5 mb-4">
              <div className="col-2 content4-right-icon">
                <div className="content4-icon icon-clr1">
                  <span className="fa fa-briefcase" />
                </div>
              </div>
              <div className="col-10 content4-right-info pl-md-5 pl-4">
                <h6>
                  <Link to="#url">Proven Expertise</Link>
                </h6>
                <p>
                We bring years of experience and a proven track record of success in editing. Our skilled team has qualified editor.
                </p>
              </div>
            </div>  
            <div className="row content4-right-grids mb-sm-5 mb-4">
              <div className="col-2 content4-right-icon">
                <div className="content4-icon icon-clr2">
                  <span className="fa fa-search-plus" />
                </div>
              </div>
              <div className="col-10 content4-right-info pl-md-5 pl-4">
                <h6>
                  <Link to="#url">Customized Solutions</Link>
                </h6>
                <p>
                
                We understand that no two clients are the same. That’s why we tailor our services to meet your unique needs, ensuring the best results every time.
                </p>
              </div>
            </div>
          </div>
          <div className="content-right col-lg-6 pl-lg-4 mt-lg-0 mt-2">
            <div className="row content4-right-grids mb-sm-5 mb-4">
              <div className="col-2 content4-right-icon">
                <div className="content4-icon icon-clr3">
                  <span className="fa fa-cogs" />
                </div>
              </div>
              <div className="col-10 content4-right-info pl-md-5 pl-4">
                <h6>
                  <Link to="#url">Dedicated Support</Link>
                </h6>
                <p>
                Our team is committed to your success. We provide responsive, ongoing support and clear communication throughout every step of the process.
                </p>
              </div>
            </div>
            <div className="row content4-right-grids">
              <div className="col-2 content4-right-icon">
                <div className="content4-icon icon-clr4">
                  <span className="fa fa-area-chart" />
                </div>
              </div>
              <div className="col-10 content4-right-info pl-md-5 pl-4">
                <h6>
                  <Link to="#url">Competitive Pricing
                  </Link>
                </h6>
                <p>
                We offer the perfect balance between cost and quality, ensuring you get the most value for your investment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* <section className="w3l-project-contact py-5">
    <div className="container py-md-5 py-sm-4 py-2">
      <div className="row">
        <div className="col-lg-8">
          <div className="bottom-info">
            <div className="header-section">
              <h3 className="title-big">
                Let's talk about your project and see how we can work together
              </h3>
              <p className="mt-3 pr-lg-5">
                Lorem ipsum dolor sit amet elit. Velit beatae rem ullam dolore
                nisi esse quasi, sit amet. Lorem ipsum dolor sit amet elit.
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 align-self text-lg-right">
          <Link
            to="#get"
            className="btn btn-style btn-primary mt-lg-0 mt-md-5 mt-4"
          >
            Get started on a project
            <span className="fa fa-arrow-right ml-2" />
          </Link>
        </div>
      </div>
    </div>
  </section> */}
</>
    )
}