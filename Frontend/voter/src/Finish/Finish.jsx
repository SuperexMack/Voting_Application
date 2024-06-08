import { useEffect, useState } from "react"
import "./Finish.css"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Finish(){
    let token = localStorage.getItem("authorization")
    const [votingData , setVotingData] = useState([])
   
    const getData = async()=>{
      try{
        let response  = await axios.get("http://localhost:4000/vote/getVotesData" , {
            headers:{
             Authorization : token ? token : ""
            }
        })
        setVotingData(response.data.votes);
        toast.success("Voting data is available now")
      }
      catch{
        toast.error("You are not allowed to get the data")
      }
    }    
  
    return(
        <>
        <div onClick={getData} className="btnS">Finish Election</div>
        <div>
       
         {votingData.length>0 && (
            <div className="results">
            <h1 className="text-6xl font-extrabold">Voting Results</h1>
            {votingData.map((vote,index)=>(
            <div className="datavotes" key={index}>
             <p>BJP: {vote.BJP}</p>
             <p>INC: {vote.INC}</p>
             <p>AAP: {vote.AAP}</p>
            </div>
         ))}
         </div>
         )}
         
        </div>
        <ToastContainer></ToastContainer>
        </>
    )
}

export default Finish