import { Link } from "react-router-dom"
import {BeatLoader} from "react-spinners"
import { useEffect, useState } from "react";
import { collection, getCountFromServer, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../../Firebase";
export default function AdminHome(){
  const [load,setLoad]=useState(true)   
  const [influencer,setInfluencer]=useState(0)
  const [bookingCompleted,setbookingCompleted]=useState(0)
  const [bookingPending,setBookingPending]=useState(0)
  const [user,setUser]=useState(0)
  useEffect(()=>{
      getCount1()
      getCount2()
      getCount3()
      getCount4()
  },[])
const getCount1=async ()=>{
  const coll = collection(db, "users");
  const q = query(coll, where("userType", "==", 2))
  const snapshot = await getCountFromServer(q);
  setInfluencer(snapshot.data().count);
  setTimeout(()=>{
      setLoad(false)
  },700)
}
const getCount2=async ()=>{
  const coll1 = collection(db, "users");
  const q = query(coll1, where("userType", "==", 3))
  const snapshot1 = await getCountFromServer(q);
  setUser(snapshot1.data().count);
}
  const getCount3=async ()=>{
    const col2 = collection(db, "booking");
    const q = query(col2, where("status", "==", 3))
    const snapshot2 = await getCountFromServer(q);
    setbookingCompleted(snapshot2.data().count);
  }
  const getCount4=async ()=>{
    const coll3 = collection(db, "booking");
    const q = query(coll3, where("status", "==", 1))
    const snapshot3 = await getCountFromServer(q);
    setBookingPending(snapshot3.data().count);
}
    return(
        <>
         {/* <h1>This is Home page</h1> */}
         <section id="hero" className="section hero light-background">
        <div className="container">
        <div className="row gy-4">
        <div
        className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center"
        // data-aos="fade-up"
        >
        <div className="row gy-4">

          <div className=" me-2 col-md d-flex card pt-3 rounded-circle" >
            <div className="service-item position-relative">
              <i className="bi bi-activity"></i>
              <h4><a href="" className="stretched-link">Influencers Added</a></h4>
              <p>{influencer}</p>
            </div>
          </div>

          <div className=" col-md d-flex  card pt-3 rounded-circle" >
            <div className="service-item position-relative">
              <i className="bi bi-bounding-box-circles"></i>
              <h4><a href="" className="stretched-link">Happy Users</a></h4>
              <p>{user}</p>
            </div>
          </div>
      </div>
      <div className="row my-2 gy-4">
          <div className=" me-2 col-md d-flex  card pt-3 rounded-circle">
            <div className="service-item position-relative">
              <i className="bi bi-calendar4-week"></i>
              <h4><a href="" className="stretched-link">Pending Request</a></h4>
              <p>{bookingPending}</p>
            </div>
          </div>

          <div className=" col-md d-flex  card pt-3 rounded-circle" >
            <div className="service-item position-relative">
              <i className="bi bi-broadcast"></i>
              <h4><a href="" className="stretched-link">Completed Booking</a></h4>
              <p>{bookingCompleted}</p>
            </div>
          </div>

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