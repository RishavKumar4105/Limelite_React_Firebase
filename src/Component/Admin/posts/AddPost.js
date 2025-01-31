import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { BeatLoader} from "react-spinners"
import { toast } from "react-toastify"
import { addDoc, collection, doc, getDoc, Timestamp } from "firebase/firestore";
import { db, storage} from "../../../Firebase";
import { ref,uploadBytesResumable, getDownloadURL } from "firebase/storage";
export default function AddPost(){
const [title,setTitle]=useState("")
const [file,setFile]=useState({})
const [fileName,setFileName]=useState("")
const [url,setUrl]=useState("")
const [load,setLoad]=useState(false)
    const handleForm = async (e) => {
      e.preventDefault();
      if(!fileName){
         toast.error("Please upload image")
         return ;
     }
     setLoad(true)
     const storageRef = ref(storage, 'post_images/' + file.name);
     const uploadTask = uploadBytesResumable(storageRef, file);
     uploadTask.on('state_changed',
     (snapshot) => {
         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         console.log('Upload is ' + progress + '% done');
         switch (snapshot.state) {
         case 'paused':
             console.log('Upload is paused');
             break;
         case 'running':
             console.log('Upload is running');
             break;
         }
     }, 
     (error) => {
         toast.error("something went wrong", error.code)
         
     }, 
     () => {
         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
         console.log('File available at', downloadURL);
         setUrl(downloadURL)
         });
     }
   
 );
    };
    useEffect(()=>{
        if(!!url){
            saveData()
        }
    },[url])
    const saveData= async ()=>{
        try{
            let data={
                title:title,
                image:url,
                status:true,
                createdAt:Timestamp.now()
            }
            await addDoc(collection(db,"posts"),data)
            toast.success("Data added")
            setTitle("")
            setFile({})
            setFileName("")
            setUrl("")
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
          <h1 className="mb-2 mb-lg-0">Add Post Type</h1>
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

       <div className="container  p-5  my-5" style={{ width:"500PX", borderRadius:"5px",boxShadow:"0px 0px 10px gray"}}>
       <form onSubmit={handleForm} >
          <div className="row my-2">
          <input
            type="text"
            className="form-control bg-outline-dark"
            placeholder="Enter Post Title"
            required=""
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
          </div>
        <div className="row my-2">
        <input
            type="file"
            className="form-control "
            name="Enter Image"
            placeholder="Enter Image"
            required=""
            value={fileName}
            onChange={(e)=>{setFileName(e.target.value); setFile(e.target.files[0])}}
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