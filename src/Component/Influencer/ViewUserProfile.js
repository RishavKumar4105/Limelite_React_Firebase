import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { BeatLoader } from "react-spinners"
import { toast } from "react-toastify"
import { db } from "../../Firebase"
import moment from "moment"

export default function ViewUserProfile(){
    const [data,setData]=useState({})
    const [load,setLoad]=useState(true)
    const nav=useNavigate()
    const {id}=useParams()
    useEffect(()=>{
      getData()
    },[])
    const getData=async ()=>{
    
        const docRef=doc(db,"users",id)
        const docData=await getDoc(docRef)
        if(docData.exists()){
         setData(docData.data())
        }else{
          toast.error("No Data found!!")
        }
        setTimeout(()=>{setLoad(false)},500)
      
      
    }
    const getDate=(date)=>{
        let date1=date?.toDate()?.toString()
        let newDate=moment(date1)?.format("Do MMM, YYYY")
        return newDate
      }
    return(
        <> 
          <div className="page-title" >
        <div className="container d-lg-flex justify-content-between align-items-center">
          <h1 className="mb-2 mb-lg-0">Profile</h1>
          <nav className="breadcrumbs">
            <ol>
              <li>
                <Link to={"/influencer"}>Home</Link>
              </li>
              <li className="current">Profile</li>
            </ol>
          </nav>
        </div>
      </div>
         <BeatLoader cssOverride={{display:"block",margin:"10vh auto"}} loading={load} color="var(--accent-color)" size={20}/>
          
          <div className={load==true?"d-none":"container bg-light text-capitalize"}>
            <section id="portfolio-details" className="portfolio-details section">
              <div className="container" >
                <div className="row justify-content-center gy-4">
                 
                  <div className="col-lg-4">
                    <div
                      className="portfolio-info py-4"
                    >
                      <h3>About:</h3>
                      <ul>
                        <li>
                          <strong>Name</strong>: {data.name}
                        </li>
                        <li>
                          <strong>Email</strong>: {data.email}
                        </li>
                        <li>
                          <strong>Contact</strong>: {data.contact}
                        </li>
                        <li>
                          <strong>City</strong>: {data.city}
                        </li>
                        <li>
                          <strong>Join date</strong>: {getDate(data.createdAt)}
                        </li>
                      </ul>
                    </div>
                    
                  </div>
                  <div className="col-lg-4 ">
                    <div
                      className="portfolio-info py-4"
                    >
                      <h3>Business/Company:</h3>
                      <ul className="pt-4  pb-4">
                        <li>
                          <strong>Name</strong>: {data.companyName}
                        </li>
                        <li>
                          <strong>Email</strong>: {data.companyEmail}
                        </li>
                     
                        <li className="pb-3">
                          <strong>City</strong>: {data.companyAddress}
                        </li>
                      </ul>
                    </div>
                    
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8 offset-md-2">
                  <div
                      className="portfolio-description"
                    >
                      <h2>About Company/Business:</h2>
                      <p>
                        {data?.aboutCompany}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
    )
}