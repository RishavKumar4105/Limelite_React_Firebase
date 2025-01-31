import { collection, onSnapshot, where, query, orderBy, updateDoc, doc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../Firebase"
import { BeatLoader } from "react-spinners"
import moment from "moment"
import { toast } from "react-toastify"
import { Link, useParams } from "react-router-dom"
export default function ViewPostType(){
    const [data,setData]=useState([])
    const [load,setLoad]=useState(true)
    useEffect(()=>{
        const que=query(collection(db,"posts")
        ,where("status","==",true)
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
 
    return(
        <>
      <div className="page-title" >
        <div className="container d-lg-flex justify-content-between align-items-center">
          <h1 className="mb-2 mb-lg-0">Post Type</h1>
          <nav className="breadcrumbs">
            <ol>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li className="current">Post Type</li>
            </ol>
          </nav>
        </div>
      </div>
    <BeatLoader cssOverride={{display:"block",margin:"10vh auto"}} color="var(--accent-color)" size={20} loading={load}/>
        <div className={load?"d-none my-5":"container my-4"}>
            <div className="row">
                {data?.length>0?
                    data?.map((el,index)=>(
                        <div className="col-md-3 p-4" key={index}>
                            <Link to={`/viewInfluencers/${el?.data?.title}`}>
                                <div className="card">
                                    <img src={el?.data?.image} className="card-img-top w-100" style={{height:"200px"}}/>
                                    <div className="card-body">
                                        <h3>{el?.data?.title}</h3>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                    :
                    <h1>No data found!!</h1>
                }
                
            </div>
        </div>
    </>
    )
}