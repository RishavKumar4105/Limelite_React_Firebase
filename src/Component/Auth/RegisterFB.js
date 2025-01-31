import { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../Firebase";
import { toast } from "react-toastify";

export default function RegisterFB(){
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const handleForm=(e)=>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then(
            (userCredentials)=>{
                console.log(userCredentials);
                toast.success("User registered successfully!!")
                setEmail("")
                setPassword("")
            }
        ).catch(
            (error)=>{
                console.log(error);
                toast.error(error.message)
            }
        )
        //error handling-then(success), catch-error 
    }
    const googleSignup=()=>{
      
        let googleProvider=new GoogleAuthProvider()
        signInWithPopup(auth, googleProvider)
        .then((userCredentials)=>{
            console.log(userCredentials);
            toast.success("User registered")
        })
        .catch((error)=>{
            toast.error(error.message)
        })
    }
    return(
        <>
          <section className="w3l-breadcrumb">
          <div className="breadcrumb-bg breadcrumb-bg-about py-5">
            <div className="container pt-lg-5 pt-3 p-lg-4 pb-3">
              <h2 className="title mt-5 pt-lg-5 pt-sm-3">Sign Up</h2>
              <ul className="breadcrumbs-custom-path pb-sm-5 pb-4 mt-2 text-center mb-md-5">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li className="active"> / Sign Up</li>
              </ul>
            </div>
          </div>
          <div className="waveWrapper waveAnimation">
            <svg viewBox="0 0 500 150" preserveAspectRatio="none">
              <path
                d="M-5.07,73.52 C149.99,150.00 299.66,-102.13 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                style={{ stroke: "none" }}
              />
            </svg>
          </div>
        </section>
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-3" style={{boxShadow:"0px 0px 10px gray"}}>
                        <h5 className="text-center my-3">Registration Form</h5>
                        <form onSubmit={handleForm}>
                        <div className="row">
                            <div className="col-md-2">
                                <label>Email</label>
                            </div>
                            <div className="col-md">
                                <input className="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                            </div>
                            {email}
                        </div>
                        <div className="row my-2">
                            <div className="col-md-2">
                                <label>Password</label>
                            </div>
                            <div className="col-md">
                                <input className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                            </div>
                        </div>
                        <button className="btn btn-primary w-25 my-2 d-block mx-auto">Submit</button>
                        </form>
                    </div>
                    <hr/>
                    <button className="btn btn-danger d-block mx-auto" onClick={googleSignup}>Sign Up with Google</button>
                </div>
            </div>
        </div>
        </>
    )
}