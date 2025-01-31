import { collection, onSnapshot, query, orderBy, where, getDoc } from "firebase/firestore"
import { useState, useEffect } from "react"
import { db } from "../../Firebase"
import { BeatLoader } from "react-spinners"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import moment from "moment"
export default function AdminRequest() {
    const [data,setData]=useState([])
    const [load,setLoad]=useState(true)
    const [selectedStatus,setselectedStatus]=useState("all")
    const [orderByDate,setOrderBy]=useState("desc")
   const nav=useNavigate()
  
  
    useEffect(()=>{
      if(selectedStatus=="all"){
        var que=query(collection(db,"booking")
        ,orderBy("createdAt",orderByDate)
        )
        }else{
          var que=query(collection(db,"booking")
          , where("status","==",parseInt(selectedStatus))
            ,orderBy("createdAt",orderByDate)
          )
        }
       
        onSnapshot(que, doc=>{
          const bookingData= doc.docs.map((el,index)=>{return {id:el.id, data:el.data()} })
          let userQuery=query(collection(db,"users"))
          onSnapshot(userQuery,doc=>{
            let userData=doc.docs.map((el,index)=>{
              return {id:el.id,data:el.data()}
            })
            setData(bookingData?.map(el => ({
              ...el,
              user: userData?.find(ev => ev.id === el.data.influencerId)
            })))
          })
        })
        setTimeout(()=>{setLoad(false)},500)
    },[selectedStatus, orderByDate])
    const getDate=(date)=>{
      let date1=date?.toDate()?.toString()
      let newDate=moment(date1)?.format("Do MMM, YYYY")
      return newDate
    }
    return(
        <>
  {/* ======= Our Services Section ======= */}
  <div className="page-title" >
        <div className="container d-lg-flex justify-content-between align-items-center">
          <h1 className="mb-2 mb-lg-0">Requests/Bookings</h1>
          <nav className="breadcrumbs">
            <ol>
              <li>
                <Link to={"/admin"}>Home</Link>
              </li>
              <li className="current">Booking</li>
            </ol>
          </nav>
        </div>
      </div>
    <BeatLoader cssOverride={{display:"block",margin:"10vh auto"}} color="var(--accent-color)" size={20} loading={load}/>
       
      <div className={load==true?"d-none":"container my-4  text-capitalize"}>
        <div className="row py-3 justify-content-between gy-4"  >
          <div className="col-md-3">
            <label>Change Status</label>
            <select value={selectedStatus} onChange={(e)=>{setselectedStatus(e.target.value)}} className="form-control">
              <option value={"all"} selected>All</option>
              <option value={1}>Pending</option>
              <option value={2}>Approved</option>
              <option value={3}>Completed</option>
              <option value={4}>Declined</option>
            </select>
          </div>
          <div className="col-md-3">
            <label>Order By</label>
            <select value={orderByDate} onChange={(e)=>{setOrderBy(e.target.value)}} className="form-control">
              <option value={"desc"} selected>Newest First</option>
              <option value={"asc"} selected>Oldest First</option>
            </select>
          </div>
        </div>
        <div className="row gy-4 ">
          {data?.length>0 ?
          data?.map((el,index)=>(
          <div className="col-lg-12 text-capitalize col-md-12" key={index}>
            <div className="card p-4  position-relative">
                <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center ">

                        <img src={el?.user?.data?.image} style={{height:"100px",width:"100px"}} className="rounded-circle mx-2 img-fluid"/>
                        <div>
                            <h4>{el?.user?.data?.name}</h4>
                            <div>{el?.user?.data?.email}</div>
                        </div>
                    </div>
                    <div>
                        <div>Booked By:</div>
                        <h4>{el?.data?.userName}</h4>
                        <div>{el?.data?.userEmail}</div>
                    </div>
                </div>
             
              <div className="d-flex  px-4 justify-content-between ">
                <div className="text-info">Date Of Booking: {getDate(el?.data?.createdAt)}</div>
                <div className="text-info">Cost: &#8377;{el?.data?.cost} </div>
              </div>
              
              <hr/>
              <div className="d-flex justify-content-between">
              <h5>Status is {el?.data?.status==1?"Pending Yet!!":el?.data?.status==2?"Approved!!":el?.data?.status==3?"Completed.":"Oops!! Due to some reason Your booking is rejected. "}</h5>
               
              </div>
            </div>
          </div>
          )) :
          <h1>No Data Found!!</h1>  
          }
        </div>
      </div>



        </>
    )
}