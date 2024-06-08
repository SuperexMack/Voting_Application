import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css"
function OfficerLogin(){
    let [username , setUsername] = useState("")
    let [ElectionNumber ,setElectionNumber] = useState("")
    let [password , setPassword] = useState("")
    let Navigate = useNavigate()
    const officerL = async()=>{
        await axios.post("http://localhost:4000/vote/OwnerEntry" , {
           username,
           ElectionNumber,
           password
        })
        .then(response=>{
            localStorage.setItem("authorization" , "Bearer " + response.data.token)
            toast.success("signin successful")
            setTimeout(()=>Navigate("/"),3000)
            console.log("welcome master")
        })
        .catch((err)=>{
            toast.error("Unable to Login")
            console.log("something went wrong :" + err)
        })
    }
    return(
        <>
        <div className="officerlogin w-80 bg-black flex flex-col">
        <h1 className="flex justify-center align-middle font-extrabold text-3xl text-white">Login</h1>
        <input onChange={(e)=>setUsername(e.target.value)} placeholder="Enter your Name"></input>
        <input onChange={(e)=>setElectionNumber(e.target.value)} placeholder="Enter Your Aadhar Number"></input>
        <input onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Your Password"></input>
        <button onClick={officerL} className="loginbtn">Login</button>
        <Link to={"/officersignup"}><span className="headingf text-white">Don't have a account? Register</span></Link>
        </div>
        <ToastContainer />
        </>
    )
}

export default OfficerLogin