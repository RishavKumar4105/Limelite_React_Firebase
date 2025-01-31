import { collection, onSnapshot, where, query, orderBy, updateDoc, doc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../Firebase"
import { BeatLoader } from "react-spinners"
import moment from "moment"
import { toast } from "react-toastify"
import { Link, useParams } from "react-router-dom"
export default function ViewInfluencersUser(){
    const [data,setData]=useState([])
    const [load,setLoad]=useState(true)
    useEffect(()=>{
        var que=query(collection(db,"users")
            ,where("status","==",true)
            ,where("userType","==",2)
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
                        <div className="col-md-4 p-4" key={index}>
                            <div className="card text-capitalize">
                                <img src={el?.data?.image} className="card-img-top w-100" style={{height:"250px"}}/>
                                <div className="card-body">
                                    <h3>{el?.data?.name}</h3>
                                    <div><i className="bi bi-geo-alt"></i>{el?.data?.city}</div>
                                    <h5>Total No. of Followers: {el?.data?.noOfFollowers}</h5>
                                    <p>
                                        Social Media Link:
                                        <div>
                                            <Link to={el?.data?.facebook}><i className="bi bi-facebook"></i> FaceBook</Link>
                                        </div>
                                        <div>
                                            <Link to={el?.data?.youtube}><i className="bi bi-youtube"></i> YouTube</Link>
                                        </div>
                                        <div>
                                            <Link to={el?.data?.twitter}><i className="bi bi-twitter"></i> Twitter</Link>
                                        </div>
                                        <div>
                                            <Link to={el?.data?.instagram}><i className="bi bi-instagram"></i> Instagram</Link>
                                        </div>
                                        <div>
                                            <Link to={el?.data?.website}><i className="bi bi-globe"></i> Website</Link>
                                        </div>
                                    </p>
                                    <Link to={"/priceCatalogue/"+el?.id} className="btn btn-primary">View Cataloge</Link>
                                </div>
                            </div>
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