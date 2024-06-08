import { Link} from "react-router-dom"
import axios from "axios"
import "./Login.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login(){
    const [username , setName] = useState("")
    const [aadharNumber , setaadharNumber] = useState("")
    const navigate = useNavigate()
    const Login = async()=>{
            await axios.post("http://localhost:4000/vote/userEntered" , {
               username,
               aadharNumber
            })    

            .then((response)=>{
                localStorage.setItem("authorization" , "Bearer " + response.data.token)
                toast.success("signin successful")
                setTimeout(()=>navigate("/"),3000)
            })
            .catch((err)=>{
                toast.error("Something went wrong")
                console.log("something went wrong while login of the account " + err)
            })
    }

    return(
        <>
        <div className="login h-96 w-80 bg-black flex flex-col">
        <h1 className="flex justify-center align-middle font-extrabold text-3xl text-white">Login</h1>
        <input onChange={(e)=>setName(e.target.value)} placeholder="Enter your Name"></input>
        <input onChange={(e)=>setaadharNumber(e.target.value)} placeholder="Enter Your Aadhar Number"></input>
        <button onClick={Login} className="loginbtn">Login</button>
        <Link to={"/signup"}><span className="headingf text-white">Don't have a account? Register</span></Link>
        </div>
        <ToastContainer />
        </>
    )
}

export default Login