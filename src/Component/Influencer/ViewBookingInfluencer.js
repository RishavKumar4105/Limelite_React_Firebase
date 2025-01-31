import { collection, onSnapshot, query, orderBy, where, doc, updateDoc } from "firebase/firestore"
import { useState, useEffect } from "react"
import { db } from "../../Firebase"
import { BeatLoader } from "react-spinners"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import moment from "moment"
export default function ViewBookingInfluencer() {
    const [data,setData]=useState([])
    const [load,setLoad]=useState(true)
    const [selectedStatus,setselectedStatus]=useState("all")
    const [orderByDate,setOrderBy]=useState("desc")
    const [finalPost,setFinalPost]=useState("")
    const nav=useNavigate()
  
    const userId=sessionStorage.getItem("userId")
  
    useEffect(()=>{
      if(selectedStatus=="all"){
        var que=query(collection(db,"booking")
        , where("influencerId","==",userId)
        ,orderBy("createdAt",orderByDate)
        )
        }else{
          var que=query(collection(db,"booking")
          , where("status","==",parseInt(selectedStatus)),
            where("influencerId","==",userId)
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
              user: userData?.find(ev => ev.id === el.data.userId)
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
    const changeStatus=async (id, status)=>{
        if(window.confirm(`You are about to ${status==2?"Approve":status==3 ? "Complete":"Decline"} Booking?`)){
          setLoad(true)
        const taskDocRef = doc(db, 'booking', id)
        try {
            let data = {
                status:status
            }
            if(status==3){
                data.finalPost=finalPost
            }
            await updateDoc(taskDocRef, data)
            toast.success("Updated Successfully!!")
            setFinalPost("")
            setTimeout(()=>{
                setLoad(false)
            },700)
        } catch (err) {
            setTimeout(()=>{
                setLoad(false)
            },700)
            toast.error("Something went wrong!")
        }
      }
    }
    return(
        <>
  <div className="page-title" >
        <div className="container d-lg-flex justify-content-between align-items-center">
          <h1 className="mb-2 mb-lg-0">Bookings</h1>
          <nav className="breadcrumbs">
            <ol>
              <li>
                <Link to={"/influencer"}>Home</Link>
              </li>
              <li className="current">Booking</li>
            </ol>
          </nav>
        </div>
      </div>
    <BeatLoader cssOverride={{display:"block",margin:"10vh auto"}} color="var(--accent-color)" size={20} loading={load}/>
       
      <div className={load==true?"d-none":"container   text-capitalize"}>
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
        <div className="row gy-4 " >
          {data?.length>0 ?
          data?.map((el,index)=>(
          <div className="col-lg-12 text-capitalize col-md-12" key={index}>
            <div className="card p-4 text-start ">
                <div className="d-flex justify-content-between">
                    <div>
                        Booked For: <h4>{el?.data?.postType}</h4>
                        Booked By:
                        <div>{el?.user?.data?.name}</div>
                        <div>{el?.user?.data?.email}</div>
                        <div>{el?.user?.data?.contact}</div>
                        Business Name : {el?.user?.data?.companyName}
                        <Link className="ps-2 text-decoration-underline" to={"/influencer/viewUserProfile/"+el?.user?.id}>Know More</Link>
                    </div>
                    <div>
                    <div className="text-info">Date Of Booking: {getDate(el?.data?.createdAt)}</div>
                    </div>
                </div>
              <div className="d-flex justify-content-between ">
                
               
              </div>
              
              <hr/>
              <div className="d-flex justify-content-between">
              <h5>Status is {el?.data?.status==1?"Pending Yet!!":el?.data?.status==2?"Approved!!":el?.data?.status==3?"Completed.":"Oops!! Due to some reason Your booking is rejected. "}</h5>
                {
                    el?.data?.status==1 ? 
                    <div>
                        <button className="btn mx-1 btn-outline-success" onClick={()=>{changeStatus(el.id, 2)}}>Approve</button>
                        <button className="btn btn-outline-danger" onClick={()=>{changeStatus(el.id,4)}}>Decline</button>
                    </div>
                    : el?.data?.status==2 ?
                    <>
                    <form className="d-flex" onSubmit={(e)=>{e.preventDefault(); changeStatus(el.id,3)}}>
                    <input type="text" placeholder="Enter Final Post link" className="form-control me-2" onChange={(e)=>{setFinalPost(e.target.value)}} value={finalPost} style={{height:"98%"}} required/>
                    <button className=" btn btn-outline-info" >Complete</button>
                    </form>
                    </>
                    :
                    el?.data?.status==3 &&
                    <Link to={el?.data?.finalPost} className="btn btn-primary">View Post</Link>
                }
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