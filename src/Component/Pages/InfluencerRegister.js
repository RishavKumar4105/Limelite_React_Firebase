import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { auth, db, storage} from "../../Firebase"
import { useState, useEffect} from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { ref,uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { Timestamp, setDoc, doc } from "firebase/firestore"
import { toast } from "react-toastify"
import { BeatLoader } from "react-spinners"
export default function InfluencerRegister(){
    const[name,setName]=useState("")
    const[contact,setContact]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const [city,setCity]=useState("")
    const [facebook,setFaceBook]=useState("")
    const [instagram,setInstagram]=useState("")
    const [twitter,setTwitter]=useState("")
    const [website,setWebsite]=useState("")
    const [youtube,setYoutube]=useState("")
    const [noOfFollowers,setNoOfFollowers]=useState("")
    const [load,setLoad]=useState(false)
    const [file,setFile]=useState({})
    const [fileName,setFileName]=useState("")
    const [url,setUrl]=useState("")
    const [about,setAbout]=useState("")
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
            registered()
        }
    },[url])
    const nav=useNavigate()
    const registered=(e)=>{
        createUserWithEmailAndPassword(auth,email,password)
        .then(
            (userCredential)=>{
                let userId = userCredential.user.uid;
                saveData(userId)
            }
        )
        .catch(
            (error)=>{
                toast.error(error.message)
            }
        )
    }
    const saveData=async (userId)=>{
        // console.log(userId);
        try{
        let data={
            name:name,
            contact:contact,
            email:email,
            city:city,
            facebook:facebook,
            instagram:instagram,
            website:website,
            twitter:twitter,
            youtube:youtube,
            noOfFollowers:noOfFollowers,
            image:url,
            about:about,
            userType:2,
            userId:userId,
            status:true,
            createdAt:Timestamp.now()
        }
        await setDoc(doc(db,"users",userId),data)
        toast.success("User Register")
        sessionStorage.setItem("userId", userId)
        sessionStorage.setItem("email",data.email)
        sessionStorage.setItem("userType",data.userType)
        sessionStorage.setItem("name", data.name)
        setTimeout(()=>{nav("/influencer")},500)
    }
    catch(err){
        toast.success("something went wronf")
    }
    }
    return(
        <>
        <div className="page-title" >
            <div className="container d-lg-flex justify-content-between align-items-center">
            <h1 className="mb-2 mb-lg-0">Influencer Register</h1>
            <nav className="breadcrumbs">
                <ol>
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
                <li className="current">Register</li>
                </ol>
            </nav>
            </div>
        </div>
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card p-3" style={{boxShadow:"0px 0px 10px gray"}}>
                        <h5 className="text-center my-3">Registration Form</h5>
                       <form onSubmit={handleForm}>
                       <div className="row  my-2">
                            <div className="col-md-2">
                                <label>Name</label>
                            </div>
                            <div className="col-md">
                                <input className="form-control" value={name} onChange={(e)=>setName(e.target.value)} required/>
                            </div>
                            <div className="col-md-2">
                                <label>Email</label>
                            </div>
                            <div className="col-md">
                                <input className="form-control" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-md-2">
                                <label>Password</label>
                            </div>
                            <div className="col-md">
                                <input className="form-control" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                            </div>
                            <div className="col-md-2">
                                <label>Contact</label>
                            </div>
                            <div className="col-md">
                                <input className="form-control" pattern="[0-9]{10}" title="Please enter valid contact" value={contact} onChange={(e)=>setContact(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="row  my-2">
                            <div className="col-md-2">
                                <label>City</label>
                            </div>
                            <div className="col-md">
                                <input className="form-control" value={city} onChange={(e)=>setCity(e.target.value)} required/>
                            </div>
                            <div className="col-md-2">
                                <label>Facebook Link</label>
                            </div>
                            <div className="col-md">
                                <input className="form-control" value={facebook} onChange={(e)=>setFaceBook(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="row  my-2">
                            <div className="col-md-2">
                                <label>Youtube Link</label>
                            </div>
                            <div className="col-md">
                                <input className="form-control" value={youtube} onChange={(e)=>setYoutube(e.target.value)} required/>
                            </div>
                            <div className="col-md-2">
                                <label>Instagram Link</label>
                            </div>
                            <div className="col-md">
                                <input className="form-control" value={instagram} onChange={(e)=>setInstagram(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="row  my-2">
                            <div className="col-md-2">
                                <label>Twitter Link</label>
                            </div>
                            <div className="col-md">
                                <input className="form-control" value={twitter} onChange={(e)=>setTwitter(e.target.value)} required/>
                            </div>
                            <div className="col-md-2">
                                <label>Website Link</label>
                            </div>
                            <div className="col-md">
                                <input className="form-control" value={website} onChange={(e)=>setWebsite(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="row  my-2">
                            <div className="col-md-2">
                                <label>Total No. of Followers</label>
                            </div>
                            <div className="col-md">
                                <input className="form-control" value={noOfFollowers} onChange={(e)=>{setNoOfFollowers(e.target.value)}} type="text" required/>
                            </div>
                            <div className="col-md-2">
                                <label>Your Image</label>
                            </div>
                            <div className="col-md">
                                <input className="form-control" value={fileName} onChange={(e)=>{setFile(e.target.files[0]); setFileName(e.target.value)}} type="file" required/>
                            </div>
                           
                        </div>
                        <div className="row my-2">
                            <div className="col-md-2">
                                <label>About You</label>
                            </div>
                            <div className="col-md">
                                <textarea className="form-control" type="text" value={about} onChange={(e)=>setAbout(e.target.value)} required/>
                            </div>
                        </div>
                        <button className="btn btn-outline-dark d-block mx-auto btn-style w-25 my-2">Submit</button>
                       </form>
                       <div className="child d-flex justify-content-center mt-2">
                            {load==true &&
                                <BeatLoader color="var(--accent-color)" size={20} loading={load} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}