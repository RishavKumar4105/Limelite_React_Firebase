import { collection, onSnapshot, where, query, orderBy, updateDoc, doc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../../Firebase"
import { BeatLoader, ClipLoader } from "react-spinners"
import moment from "moment"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
export default function ManageCosts(){
    const [data,setData]=useState([])
    const [load,setLoad]=useState(true)
    let userId=sessionStorage.getItem("userId")
    useEffect(()=>{
        const que=query(collection(db,"costs")
        , where("influencerId","==",userId)
        ,orderBy("createdAt","desc")
    )
        onSnapshot(que, doc=>{
            setData(
                doc.docs.map((el,index)=>{
                    return {id:el.id, data:el.data()} 
                })
            )
        })
       setTimeout(()=>{setLoad(false)},1000)
    },[])
    const getDate=(date)=>{
        let date1=date?.toDate()?.toString()
        let newDate=moment(date1)?.format("Do MMM, YYYY")
        return newDate
      }
      const changeStatus=async (id, status)=>{
        if(window.confirm(`You are about to ${!status?"In-Active":"Active"} cost Catalogue?`)){
          setLoad(true)
        const taskDocRef = doc(db, 'costs', id)
        try {
            let data = {
                status:status
            }
            await updateDoc(taskDocRef, data)
            toast.success("Updated Successfully!!")
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
          <h1 className="mb-2 mb-lg-0">Manage Cost Catalogue</h1>
          <nav className="breadcrumbs">
            <ol>
              <li>
                <Link to={"/influencer"}>Home</Link>
              </li>
              <li className="current">Cost Catalogue</li>
            </ol>
          </nav>
        </div>
      </div>
    <BeatLoader cssOverride={{display:"block",margin:"10vh auto"}} color="var(--accent-color)" size={20} loading={load}/>
       
       <div className={load==true?"d-none":"container my-5 table-responsive text-capitalize"}>
            <table className="table table-bordered table-hover">
                <thead className="text-dark">
                    
                    <tr>
                        <td>Sno</td>
                        <td>Post Type</td>
                        <td>Cost</td>
                        <td>Duration</td>
                        <td>Description</td>
                        <td>Reference Video Link</td>
                        <td>Status</td>
                        <td>CreatedAt</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        // ? null check- 
                       data?.map((el,index)=>(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{el?.data?.postType}</td>
                            <td>&#8377;{el?.data?.cost}</td>
                            <td>{el?.data?.duration}</td>
                            <td>{el?.data?.description}</td>
                            <td>
                                <Link to={el?.data?.referenceVideo}>View</Link>
                            </td>
                            <td>{el?.data?.status?"Active":"In-active"}</td>
                            <td>
                                {getDate(el?.data?.createdAt)}
                            </td>
                            <td style={{width:"220px"}}>
                                <Link to={"/influencer/editCost/"+el.id} className="btn-hover-bg btn btn-success text-light   px-2"><i className="bi bi-pencil-square"></i></Link>
                                {
                                    el.data.status?
                                    <button className="btn mx-2 btn-danger" onClick={()=>{changeStatus(el.id,false)}}>In-Active</button>
                                    :
                                    <button className="mx-2 btn btn-success" onClick={()=>{changeStatus(el.id,true)}}>Active</button>
                                }
                            </td>
                            
                        </tr>
                       )) 
                    }
                </tbody>
            </table>
        </div>
        </>
    )
}