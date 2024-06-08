import { Link} from "react-router-dom"
import { useState } from "react"
import "./Login.css"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
function Register(){
    const [username , setName] = useState("")
    const [aadharNumber , setaadharNumber] = useState("")
    const Navigate = useNavigate()
    const Register = async()=>{
      await axios.post("http://localhost:4000/vote/postVote" , {
        username,
        aadharNumber
      })
      .then(response=>{
        localStorage.setItem("authorization" , "Bearer " + response.data.token)
        toast.success("Welcome to the Portal")
        setTimeout(()=>Navigate("/") , 3000)
        console.log("succesfull")
      })
      .catch((err)=>{
        toast.error("Something went wrong")
        console.log(err)
      })
    }

    return(
        <>
        <div className="login h-96 w-80 bg-black flex flex-col">
        <h1 className="flex justify-center align-middle font-extrabold text-3xl text-white">Signup</h1>
        <input onChange={(e)=>setName(e.target.value)} placeholder="Enter your Name"></input>
        <input onChange={(e)=>setaadharNumber(e.target.value)} placeholder="Enter Your Aadhar Number"></input>
        <button onClick={Register} className="loginbtn">Register</button>
        <Link to={"/login"}><span className="headingf text-white">Already have a account? Login</span></Link>
        </div>
        <ToastContainer />
        </>
    )
}

export default Register