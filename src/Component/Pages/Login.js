import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BeatLoader} from "react-spinners"
import { toast } from "react-toastify"
import { auth, db } from "../../Firebase";
import { doc, getDoc } from "firebase/firestore";
export default function Login(){
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
  const nav=useNavigate()
  const navigate = useNavigate();
    const [load,setLoad]=useState(false)

  
    const handleForm = async (e) => {
      e.preventDefault();
      setLoad(true)
      try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const userId = userCredentials.user.uid;
        const docRef = doc(db, "users", userId);
        const docData = await getDoc(docRef);
  
        if (docData.exists()) {
          const userData = docData.data();
          if(userData.status==true){
            toast.success("Login successfully!!")
          sessionStorage.setItem("userId", userId)
          sessionStorage.setItem("email",userData.email)
          sessionStorage.setItem("userType",userData.userType)
          sessionStorage.setItem("name", userData.name)
          if (userData.userType == 1) {
            navigate("/admin");
          } 
          else if(userData.userType==2){
            navigate("/influencer")
          }
          else {
            navigate("/");
          }
        }else{
          toast.error("Account Blocked. Contact admin!!")
        }
        } else {
          toast.error("No data found");
        }
      } catch (err) {
        console.error(err);
        toast.error(err.message);
      }
      setTimeout(()=>{setLoad(false)},500)
    };

    return(
        <>
      <div className="page-title" >
        <div className="container d-lg-flex justify-content-between align-items-center">
          <h1 className="mb-2 mb-lg-0">Login</h1>
          <nav className="breadcrumbs">
            <ol>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li className="current">Login</li>
            </ol>
          </nav>
        </div>
      </div>

       <div className="container  p-5  my-5" style={{ width:"500PX", borderRadius:"5px",boxShadow:"0px 0px 10px gray"}}>
       <form onSubmit={handleForm} >
          <div className="row my-2">
          <input
            type="email"
            className="form-control bg-outline-dark"
            name="email"
            placeholder="Email"
            required=""
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
        <div className="row my-2">
        <input
            type="password"
            className="form-control "
            name="password"
            placeholder="Password"
            required=""
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
           />
        </div>
        <button type="submit"className="btn btn-outline-dark d-block mx-auto btn-style w-25 my-3">Login</button>
        <p>Don't have an account? <Link to="/clientRegister">Sign Up</Link></p>
       </form>
       <div className="child d-flex justify-content-center mt-2">
        {load==true}
         {/* <HashLoader color="var(--accent-color)" size={20} cssOverride={obj} loading={Load}/> */}
         <BeatLoader color="var(--accent-color)" size={20} loading={load}/>
       </div>
       </div>
        </>
    )
}