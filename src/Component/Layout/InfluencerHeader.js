import { Link , useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function InfluencerHeader(){
  const nav=useNavigate()
  const logout=()=>{
    if(window.confirm("Do you really want to logout?")){
      toast.success("Logout successfully")
      sessionStorage.clear()
      nav("/login")
    }
  }
  return(
        <>
          <header id="header" className="header d-flex align-items-center sticky-top">
            <div className="container-fluid container-xl position-relative d-flex align-items-center">
              <Link to="/influencer" className="logo d-flex align-items-center me-auto">
                <h1 className="sitename">LimeLite</h1>
              </Link>
              <nav id="navmenu" className="navmenu">
                <ul>
                  <li>
                    <Link to="/influencer" className="active">
                      Home
                    </Link>
                  </li>
                  <li className="dropdown">
                    <Link to="#">
                      <span>Costs</span>{" "}
                      <i className="bi bi-chevron-down toggle-dropdown" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="/influencer/addCost">Add</Link>
                      </li>
                      <li>
                        <Link to="/influencer/manageCost">Manage</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/influencer/requests">Requests</Link>
                  </li>
                  <li>
                    <Link to="/influencer/profile">Profile</Link>
                  </li>
                  <li>
                    <button className="btn btn-primary rounded-pill" onClick={logout}>Logout</button>
                  </li>
                </ul>
                <i className="mobile-nav-toggle d-xl-none bi bi-list" />
              </nav>
            </div>
          </header>
        </>
    )
}