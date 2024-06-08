import "./Party.css"
import aam from "./aamaadmi.png"
import modi from "./modi.png"
import congress from "./congress.png"
import { useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
function Party(){
  const [party , setParty] = useState("")
  let token = localStorage.getItem("authorization")
  let navigate = useNavigate()
  const AddVote = async()=>{
    if(!token){
        toast.error("Login/Register for voting")
        setTimeout(()=>navigate("/login") , 2000)
        return
      }
    await axios.post("http://localhost:4000/vote/addVote" , {
      MyvoteTo: party,
  } , {
    headers:{
      Authorization : token ? token :" "
    }
    })
    .then(()=>{
      toast.success("Vote Added Successfully")
      return 
    })
    .catch(()=>{
      toast.error("You already voted so you can't vote again")
    })
  }

  const AddingTheVote = (selectedParty)=>{
    setParty(selectedParty)
    AddVote()
  }

    return(
        <>
        <div className="main-box">
          <div className="first">
           <img src={aam} className="h-36 w-36 aamaadmi"></img>
           <h1 className="aamHead font-extrabold mt-8">AAM AADMI PARTY</h1>
           <p className="p-6">If you think that AAM AADMI PARTY is the well deserving party which can work for the wellfare of the society then 
            please upload your vote for AAM AADMI PARTY
           </p>
           <button onClick={()=>AddingTheVote("AAP")} className="btn">Vote</button>
          </div>

          <div className="second">
           <img src={modi} className="h-36 w-36 aamaadmi"></img>
           <h1 className="aamHead font-extrabold mt-8">Bhartiya janta party</h1>
           <p className="p-6">If you think that Bhartiya janta party is the well deserving party which can work for the wellfare of the society then 
            please upload your vote for Bhartiya janta party
           </p>
           <button onClick={()=>AddingTheVote("BJP")} className="btn">Vote</button>
          </div>

          <div className="third">
          <img src={congress} className="h-36 w-36 aamaadmi"></img>
           <h1 className="aamHead font-extrabold mt-8">Congress Party</h1>
           <p className="p-6">If you think that Congress Party is the well deserving party which can work for the wellfare of the society then 
            please upload your vote for Congress Party
           </p>
           <button onClick={()=>AddingTheVote("INC")} className="btn">Vote</button>
          </div>
        </div>
         <ToastContainer></ToastContainer>
        </>
    )
}

export default Party