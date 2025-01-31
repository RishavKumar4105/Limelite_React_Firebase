import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BeatLoader } from "react-spinners"
import { toast } from "react-toastify"
import { db } from "../../Firebase"
import moment from "moment"

export default function InfluencerProfile(){
    const [data,setData]=useState({})
    const [load,setLoad]=useState(true)
    const nav=useNavigate()
    const userId=sessionStorage.getItem("userId")
    useEffect(()=>{
      getData()
    },[])
    const getData=async ()=>{
      if(!!userId){
        const docRef=doc(db,"users",userId)
        const docData=await getDoc(docRef)
        if(docData.exists()){
         setData(docData.data())
        }else{
          toast.error("No Data found!!")
        }
        setTimeout(()=>{setLoad(false)},500)
      }else{
        toast.error("Please Login")
        nav("/login")
      }
      
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
                <div className="row gy-4">
                  <div className="col-lg-4 offset-lg-2">
                    <img src={data.image} alt="" className="h-100 img-fluid w-100"  />
                  </div>
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
                       
                        <li>
                          Social Media Link:   
                          <div>
                            <Link to={data?.facebook} className="text-primary">Facebook</Link>
                          </div>
                          <div>
                            <Link to={data?.instagram} className="text-primary">Instagram</Link>
                          </div>
                          <div>
                            <Link to={data?.youtube} className="text-primary">Youtube</Link>
                          </div>
                          <div>
                            <Link to={data?.twitter} className="text-primary">Twitter</Link>
                          </div>
                          <div>
                            <Link to={data?.website} className="text-primary">Website</Link>
                          </div>
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
                      <h2>About Me</h2>
                      <p>
                        {data?.about}
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