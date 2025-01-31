import { collection, onSnapshot, query, doc,updateDoc, orderBy, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../../Firebase"
import moment from "moment"
import { BeatLoader } from "react-spinners"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
export default function ViewInfluencers(){
    const [data,setData]=useState([])
    const [load,setLoad]=useState(true)
    useEffect(()=>{
        const que=query(collection(db,"users")
        , where("userType","==",2)
        ,orderBy("createdAt","desc")
    )
        onSnapshot(que, doc=>{
            setData(
                doc.docs.map((el,index)=>{
                    return {id:el.id, data:el.data()} 
                })
            )
        })
        setTimeout(()=>{setLoad(false)},500)
    },[])
   
    const getDate=(date)=>{
        let date1=date?.toDate()?.toString()
        let newDate=moment(date1)?.format("Do MMM, YYYY")
        return newDate
      }
      const blockUser=async (id, status)=>{
        if(window.confirm(`You are about to ${status==true?"Unblock":"Block"} User?`)){
          setLoad(true)
          try{
            await updateDoc(doc(db,"users",id),{status:status})
            toast.success(`User ${status==true?"Unblocked":"Blocked"}  successfully`)
            setTimeout(()=>{
              setLoad(false)
            },1000)
          }
          catch(err){
            toast.error("Something went wrong")
            setTimeout(()=>{
              setLoad(false)
            },1000)
          }
        }
      }
    return(
        <>
    <div className="page-title" >
        <div className="container d-lg-flex justify-content-between align-items-center">
          <h1 className="mb-2 mb-lg-0">View Influencers</h1>
          <nav className="breadcrumbs">
            <ol>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li className="current">Users</li>
            </ol>
          </nav>
        </div>
      </div>
    <BeatLoader cssOverride={{display:"block",margin:"10vh auto"}} color="var(--accent-color)" size={20} loading={load}/>
       
       <div className={load==true?"d-none":"container my-5 table-responsive text-capitalize"}>
       <table className="table table-bordered table-hover table-striped">
                <thead className="table-dark">
                    <tr>
                        <td>Sno</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Contact</td>
                        <td>City</td>
                        <td>Social Media Link</td>
                        <td>Status</td>
                        <td>Joined At</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {
                    data?.length>0 ?
                    data?.map(
                        (el,index)=>(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{el?.data?.name}</td>
                                <td>{el?.data?.email}</td>
                                <td>{el?.data?.contact}</td>
                                <td>{el?.data?.city}</td>
                                <td>
                                    <Link to={el?.data?.youtube}>Youtube</Link><br/>
                                    <Link to={el?.data?.instagram}>Instagram</Link><br/>
                                    <Link to={el?.data?.facebook}>Facebook</Link><br/>
                                    <Link to={el?.data?.twitter}>twitter</Link><br/>
                                    <Link to={el?.data?.website}>Website</Link><br/>
                                </td>
                                <td>{el?.data?.status?"Active":"In-Active"}</td>
                                <td>{getDate(el?.data?.createdAt)}</td>
                                <td>
                                {el?.data?.status?
                                <button className="btn btn-outline-danger" onClick={
                                  ()=>{
                                    blockUser(el.id, false)
                                  }
                                }>
                                  Block
                                </button>
                                :
                                <button className="btn btn-outline-success" onClick={
                                    ()=>{
                                      blockUser(el.id, true)
                                    }
                                  }>
                                    Unblock
                                  </button>
                                }
                                </td> 
                            </tr>
                        )
                    )
                    :
                    <tr>
                        <td colSpan={9}>No Data found!!</td>
                    </tr>
                
                }
                </tbody>
            </table>
        </div>
        </>
    )
}