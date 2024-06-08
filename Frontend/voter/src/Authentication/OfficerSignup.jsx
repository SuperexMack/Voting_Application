import { Link } from "react-router-dom"
import "./Login.css"
import { useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
// import { response } from "express"
function Officersignup(){
    let [username , setUsername] = useState("")
    let [ElectionNumber ,setElectionNumber] = useState("")
    let [password , setPassword] = useState("")
    let Navigate = useNavigate()
    const officerSign = async()=>{
        await axios.post("http://localhost:4000/vote/postOwner" , {
           username,
           ElectionNumber,
           password
        })
        .then(response=>{
            localStorage.setItem("authorization" , "Bearer " + response.data.token)
            toast.success("Welcome to the Portal")
            setTimeout(()=>Navigate("/") , 3000)
            console.log("welcome master")
        })
        .catch((err)=>{
            toast.error("Unable to signup")
            console.log(err)
        })
    }

    return(
        <>
        <div className="officerlogin w-80 bg-black flex flex-col">
        <h1 className="flex justify-center align-middle font-extrabold text-3xl text-white">Signup</h1>
        <input onChange={(e)=>setUsername(e.target.value)} placeholder="Enter your Name"></input>
        <input onChange={(e)=>setElectionNumber(e.target.value)} placeholder="Enter Your Aadhar Number"></input>
        <input onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Your Password"></input>
        <button onClick={officerSign} className="loginbtn">Register</button>
        <Link to={"/officerlogin"}><span className="headingf text-white">Already have a account? Login</span></Link>
        </div>
        <ToastContainer></ToastContainer>
        </>
    )
}

export default Officersignup