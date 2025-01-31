import { collection, getDoc, onSnapshot, where, query, orderBy, updateDoc, doc, Timestamp, getDocs, addDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../Firebase"
import { BeatLoader } from "react-spinners"
import moment from "moment"
import { toast } from "react-toastify"
import { Link, useNavigate, useParams } from "react-router-dom"
export default function ViewPriceCatalogue(){
    const [data,setData]=useState([])
    const [load,setLoad]=useState(true)
    const [influencerData,setInfluencerData]=useState({})
    const {id}=useParams()
    const nav=useNavigate()
    const userId=sessionStorage.getItem("userId")
    useEffect(()=>{
      if(!userId){
        toast.error("Please login")
        nav("/login")
    }
    },[userId])
    useEffect(()=>{
        const que=query(collection(db,"costs")
        ,where("influencerId","==",id)
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
 
    
    useEffect(()=>{
      getData()
    },[id])
    const getData=async ()=>{
        if(!!id){
          const docRef=doc(db,"users",id)
          const docData=await getDoc(docRef)
          if(docData.exists()){
           setInfluencerData(docData.data())
          }else{
            toast.error("No Data found!!")
          }
          setTimeout(()=>{setLoad(false)},500)
        }
      }
      const book=async (pid, cost, postType)=>{
        let userId=sessionStorage.getItem("userId")
        if(window.confirm("You are about to book?")){
            setLoad(true)
            let data={
                costId:pid,
                cost:cost,
                postType:postType,
                influencerId:id,
                influencerName:influencerData.name,
                influencerEmail:influencerData.email,
                userId:userId,
                userName:sessionStorage.getItem("name"),
                userEmail:sessionStorage.getItem("email"),
                status:1, //1- booked, 2- approved, 3- completed, 4- declined
                createdAt:Timestamp.now()
            }
            const que=query(collection(db,"booking"), where("postType","==",postType), where("influencerId","==",id), where("userId","==",userId),where("status","==",1))
            const dataRef=await getDocs(que)
            if(!dataRef.empty){
                toast.error("You have already booked this influencer! Kindly wait for them to response")
            }else{
                saveData(data)
            }
            setTimeout(()=>{setLoad(false)},500)
            
        }
      }
      const saveData=async (data)=>{
        try{
            await addDoc(collection(db,"booking"),data)
            toast.success("Booked successfully, Wait while they response")
            setTimeout(()=>{
                nav("/request")
            },1000)
        }catch(err){
            console.log(err);
            toast.error("Something went wrong!!")
        }
        setTimeout(()=>{setLoad(false)},500)
      }
    return(
        <>
      <div className="page-title" >
        <div className="container d-lg-flex justify-content-between align-items-center">
          <h1 className="mb-2 mb-lg-0">Price Catalogue</h1>
          <nav className="breadcrumbs">
            <ol>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li className="current">Influencers</li>
            </ol>
          </nav>
        </div>
      </div>
    <BeatLoader cssOverride={{display:"block",margin:"10vh auto"}} color="var(--accent-color)" size={20} loading={load}/>
        <div className={load?"d-none my-5":"container my-4"}>
        <section id="portfolio-details" className="portfolio-details section">
              <div className="container" >
                <div className="row gy-4">
                  <div className="col-lg-4 offset-lg-2">
                    <img src={influencerData.image} alt="" className="h-100 img-fluid w-100"  />
                  </div>
                  <div className="col-lg-4">
                    <div
                      className="portfolio-info py-4"
                    >
                      <h3>About:</h3>
                      <ul>
                        <li>
                          <strong>Name</strong>: {influencerData.name}
                        </li>
                        <li>
                          <strong>Email</strong>: {influencerData.email}
                        </li>
                        <li>
                          <strong>Contact</strong>: {influencerData.contact}
                        </li>
                        <li>
                          <strong>City</strong>: {influencerData.city}
                        </li>
                       
                       
                        <li>
                          Social Media Link:   
                          <div>
                            <Link to={influencerData?.facebook} className="text-primary">Facebook</Link>
                          </div>
                          <div>
                            <Link to={influencerData?.instagram} className="text-primary">Instagram</Link>
                          </div>
                          <div>
                            <Link to={influencerData?.youtube} className="text-primary">Youtube</Link>
                          </div>
                          <div>
                            <Link to={influencerData?.twitter} className="text-primary">Twitter</Link>
                          </div>
                          <div>
                            <Link to={influencerData?.website} className="text-primary">Website</Link>
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
                      data-aos="fade-up"
                      data-aos-delay={300}
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
            <div className="row justify-content-center">
                {data?.length>0?
                    data?.map((el,index)=>(
                        <div className="col-md-10 text-capitalize p-4" key={index}>
                        
                                <div className="card px-3">
                                    <div className="card-body">
                                        <div className=" d-flex justify-content-between">
                                            <div>
                                                <h3 className="text-start">{el?.data?.postType}</h3>
                                                <p>{el?.data?.description}</p>
                                            </div>
                                            <div>
                                                <h5>Cost : &#8377; {el?.data?.cost}</h5>
                                                <div>{el?.data?.duration}</div>
                                            </div>
                                        </div>
                                        <Link className="mb-3 btn btn-primary " to={el?.data?.referenceVideo}>View Reference</Link>
                                        <button onClick={()=>{book(el.id, el?.data?.cost,el?.data?.postType)}} className="mb-3 btn btn-outline-primary mx-2 " to={el?.data?.referenceVideo}>Book Me</button>
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