import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { BeatLoader} from "react-spinners"
import { toast } from "react-toastify"
import { getDoc, doc, collection, query, Timestamp, orderBy, onSnapshot, updateDoc } from "firebase/firestore";
import { db} from "../../../Firebase";
export default function EditCost(){
const [cost,setCost]=useState("")
const [duration,setDuration]=useState("")
const [description,setDescription]=useState("")
const [referenceVideo,setReferenceVideo]=useState("")
const [oldRef,setOldRef]=useState("")
const [load,setLoad]=useState(true)
const [allPostType,setAllPostType]=useState([])
const [post,setPost]=useState("")
const {id}=useParams()
const nav=useNavigate()
useEffect(()=>{
    getData()
},[])
const getData=async ()=>{
    let docRef=doc(db,"costs",id)
    let data=await getDoc(docRef)
    if(data.exists()){
        let finalData=data.data() 
        setPost(finalData.postType)
        setDescription(finalData.description)
        setCost(finalData.cost)
        setDuration(finalData.duration)
        setReferenceVideo(finalData.referenceVideo)
        setOldRef(finalData.referenceVideo)
      setTimeout(()=>{
        setLoad(false)
      },500)
    }else{
        toast.error("No data found")
        setTimeout(()=>{
            setLoad(false)
          },500)
    }
   }
useEffect(()=>{
 const que=query(collection(db,"posts"),orderBy("title","asc"))
 onSnapshot(que, doc=>{
     setAllPostType(doc.docs.map((el,index)=>{
         return {id:el.id, data:el.data()}
     }))
     setTimeout(()=>{
         setLoad(false)
     },500)
 })
},[])
    const handleForm = async (e) => {
        e.preventDefault();
        setLoad(true)
        try{
            let data={
                postType:post,
                cost:cost,
                duration:duration,
                referenceVideo:referenceVideo,
                description:description,
            }
            await updateDoc(doc(db,"costs",id),data)
            toast.success("Data updated")
            setTimeout(()=>{nav("/influencer/manageCost")},1000)
        }
        catch(err){
            toast.error("Server error")
            console.log(err);
        }
      setTimeout(()=>{setLoad(false)},500)
    }

    return(
        <>
      <div className="page-title" >
        <div className="container d-lg-flex justify-content-between align-items-center">
          <h1 className="mb-2 mb-lg-0">Edit Cost Catalogue</h1>
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

       <div className="container  p-5  my-5" style={{ width:"500PX", borderRadius:"5px",boxShadow:"0px 0px 10px gray"}}>
       <form onSubmit={handleForm} >
          <div className="row my-2">
            <select className="form-control bg-outline-dark" value={post} onChange={(e)=>{setPost(e.target.value)}}>
                <option value={""} selected disabled>Choose Post Types</option>
                {allPostType?.map((el,index)=>(
                    <option key={index}>{el?.data?.title}</option>
                ))}
            </select>
          </div>
          <div className="row my-2">
            <input
            type="number"
            className="form-control bg-outline-dark"
            placeholder="Enter Post Cost"
            required=""
            min={0}
            value={cost}
            onChange={(e)=>setCost(e.target.value)}
            />
          </div>
          <div className="row my-2">
            <input
            type="text"
            className="form-control bg-outline-dark"
            placeholder="Enter duration"
            required=""
            value={duration}
            onChange={(e)=>setDuration(e.target.value)}
            />
          </div>
          <div className="row my-2">
            <input
            type="text"
            className="form-control bg-outline-dark"
            placeholder="Enter Reference video"
            required=""
            value={referenceVideo}
            onChange={(e)=>setReferenceVideo(e.target.value)}
            />
            <br/>
            <Link to={oldRef}>Watch here</Link>
          </div>
          <div className="row my-2">
            <textarea
            className="form-control bg-outline-dark"
            placeholder="Enter Description"
            required=""
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            />
          </div>
       
        <button type="submit"className="btn btn-outline-dark d-block mx-auto btn-style w-25 my-3">Submit</button>
       </form>
       <div className="child d-flex justify-content-center mt-2">
        {load==true}
         <BeatLoader color="var(--accent-color)" size={20} loading={load}/>
       </div>
       </div>
        </>
    )
}