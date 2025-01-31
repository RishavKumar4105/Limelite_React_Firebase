import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function AdminHeader(){
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
            <Link to="/admin" className="logo d-flex align-items-center me-auto">
              <h1 className="sitename">LimeLite</h1>
            </Link>
            <nav id="navmenu" className="navmenu">
              <ul>
                <li>
                  <Link to="/admin" className="active">
                    Home
                  </Link>
                </li>
                <li className="dropdown">
                  <Link to="#">
                    <span>Users</span>{" "}
                    <i className="bi bi-chevron-down toggle-dropdown" />
                  </Link>
                  <ul>
                    <li>
                      <Link to="/admin/viewInfluencer">Influencers</Link>
                    </li>
                    <li>
                      <Link to="/admin/viewClient">Clients</Link>
                    </li>
                  </ul>
                </li>
                <li className="dropdown">
                  <Link to="#">
                    <span>Post Type</span>{" "}
                    <i className="bi bi-chevron-down toggle-dropdown" />
                  </Link>
                  <ul>
                    <li>
                      <Link to="/admin/addPost">Add</Link>
                    </li>
                    <li>
                      <Link to="/admin/managePost">manage</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/admin/requests">Requests</Link>
                </li>
                <li>
                  {/* <Link to="/alogout">Logout</Link> */}
                  <button className="btn btn-primary rounded-pill" onClick={logout}>Logout</button>
                </li>
              </ul>
              <i className="mobile-nav-toggle d-xl-none bi bi-list" />
            </nav>
            {/* <Link className="btn-getstarted" to="index.html#about">
              Get Started
            </Link> */}
          </div>
        </header>

        </>
    )
}