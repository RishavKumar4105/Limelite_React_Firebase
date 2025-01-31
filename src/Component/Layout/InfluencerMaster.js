import { Navigate, Outlet } from "react-router-dom";
import Footer from "./Footer";
import InfluencerHeader from "./InfluencerHeader";
import { toast } from "react-toastify";

export default function InfluencerMaster(){
    let userId=sessionStorage.getItem("userId")
    let userType=sessionStorage.getItem("userType")
    if(!userId || userType!=2){
      toast.error("Please login")
      return <Navigate to={"/login"}/>
    }
    return(
        <>
        <InfluencerHeader/>
        <main class="main">
            <Outlet/>
        </main>
        <Footer/>
        </>
    )
}