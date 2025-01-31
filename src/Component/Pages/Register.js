import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { auth, db} from "../../Firebase"
import { useState } from "react"
import { createUserWithEmailAndPassword,getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { Timestamp, setDoc, doc } from "firebase/firestore"
import { toast } from "react-toastify"
import { BeatLoader } from "react-spinners"
export default function Register(){
    const[name,setName]=useState("")
    const[contact,setContact]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const [city,setCity]=useState("")
    const [companyName,setCompanyName]=useState("")
    const [companyEmail,setCompanyEmail]=useState("")
    const [companyAddress,setCompanyAddress]=useState("")
    const [aboutCompany,setAboutCompany]=useState("")
    const [load,setLoad]=useState(false)
    const nav=useNavigate()
    const registered=(e)=>{
        e.preventDefault()
        setLoad(true)
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
            companyName:companyName,
            companyEmail:companyEmail,
            companyAddress:companyAddress,
            aboutCompany:aboutCompany,
            userType:3,
            userId:userId,
            status:true,
            createdAt:Timestamp.now()
        }
        await setDoc(doc(db,"users",userId),data)
        toast.success("User Registered")
        sessionStorage.setItem("userId", userId)
        sessionStorage.setItem("email",data.email)
        sessionStorage.setItem("userType",data.userType)
        sessionStorage.setItem("name", data.name)
        setTimeout(()=>{nav("/")},500)
    }
    catch(err){
        toast.success("something went wronf")
    }
    }
      
    return(
        <>
        <div className="page-title" >
            <div className="container d-lg-flex justify-content-between align-items-center">
            <h1 className="mb-2 mb-lg-0">Client Register</h1>
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
                <div className="col-md-12 p-5">
                    <div className="card p-3" style={{boxShadow:"0px 0px 10px gray"}}>
                        <h5 className="text-center my-3">Registration Form</h5>
                       <form onSubmit={registered}>
                       <div className="row  my-2">
                            <div className="col-md-2">
                                <label>Name</label>
                            </div>
                            <div className="col-md">
                                <input className="form-control" required value={name} onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <div className="col-md-2">
                                <label>Contact</label>
                            </div>
                            <div className="col-md">
                                <input className="form-control" required value={contact} onChange={(e)=>setContact(e.target.value)} pattern="[0-9]{10}"/>
                            </div>
                        </div>
                        <div className="row  my-2">
                            <div className="col-md-2">
                                <label>Email</label>
                            </div>
                            <div className="col-md">
                                <input type="email" className="form-control" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                            <div className="col-md-2">
                                <label>Password</label>
                            </div>
                            <div className="col-md">
                                <input className="form-control" required  type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            </div>
                        </div>
                     
                        <div className="row my-2">
                            <div className="col-md-2">
                                <label>Business/Company Name</label>
                            </div>
                            <div className="col-md">
                                <input className="form-control" type="text"  required value={companyName} onChange={(e)=>setCompanyName(e.target.value)}/>
                            </div>
                            <div className="col-md-2">
                                <label>Business/Company Email</label>
                            </div>
                            <div className="col-md">
                                <input className="form-control" type="email" required value={companyEmail} onChange={(e)=>setCompanyEmail(e.target.value)}/>
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-md-2">
                                <label>Business/Company Address</label>
                            </div>
                            <div className="col-md">
                                <input className="form-control" type="text" required value={companyAddress} onChange={(e)=>setCompanyAddress(e.target.value)}/>
                            </div>
                            <div className="col-md-2">
                                <label>City</label>
                            </div>
                            <div className="col-md">
                                <input className="form-control" type="text" required value={city} onChange={(e)=>setCity(e.target.value)}/>
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-md-2">
                                <label>About Company/Business</label>
                            </div>
                            <div className="col-md">
                                <textarea className="form-control" type="text" value={aboutCompany} onChange={(e)=>setAboutCompany(e.target.value)} required/>
                            </div>
                        </div>
                        <button className="btn btn-outline-dark d-block mx-auto btn-style w-25 my-2">Submit</button>
                        <div className="child d-flex justify-content-center mt-2">
                            {load==true &&
                                <BeatLoader color="var(--accent-color)" size={20} loading={load} />
                            }
                        </div>
                       </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}