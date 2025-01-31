import { Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
export default function Header(){
  const nav=useNavigate()
  const userId=sessionStorage.getItem("userId")
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
              <Link to="/" className="logo d-flex align-items-center me-auto">
                <h1 className="sitename">LimeLite</h1>
              </Link>
              <nav id="navmenu" className="navmenu">
                <ul>
                  <li>
                    <Link to="/" className="active">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/viewInfluencers">Influencers</Link>
                  </li>
                 
                  {!userId?
                  <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li className="dropdown">
                    <Link to="#">
                      <span>Register</span>{" "}
                      <i className="bi bi-chevron-down toggle-dropdown" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="/clientRegister">Client</Link>
                      </li>
                      <li>
                        <Link to="/influencerRegister">Influencer</Link>
                      </li>
                    </ul>
                  </li>
                  </>
                  :
                  <>
                     <li className="dropdown">
                    <Link to="#">
                      <span>Pages</span>{" "}
                      <i className="bi bi-chevron-down toggle-dropdown" />
                    </Link>
                    <ul>
                      <li>
                        <Link to="/request">Requests</Link>
                      </li>
                      <li>
                        <Link to="/profile">Profile</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <button className="btn btn-primary rounded-pill" onClick={logout}>Logout</button>
                  </li>
                  </>
                  }
                </ul>
                <i className="mobile-nav-toggle d-xl-none bi bi-list" />
              </nav>
            </div>
          </header>
        </>
    )
}