import { Navigate, Outlet } from "react-router-dom";
import Footer from "./Footer";
import AdminHeader from "./AdminHeader";
import { toast } from "react-toastify";

export default function AdminMaster(){
    let userId=sessionStorage.getItem("userId")
    let userType=sessionStorage.getItem("userType")
    if(!userId || userType!=1){
      toast.error("Please login")
      return <Navigate to={"/login"}/>
    }
    return(
        <>
        <AdminHeader/>
        <main class="main">
            <Outlet/>
        </main>
        <Footer/>
        </>
    )
}