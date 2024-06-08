import banner from "./banner.jpg"
import "./Navbar.css"
import Party from "../Party/Party"
import Finish from "../Finish/Finish"
import { useNavigate } from "react-router-dom"
function Navbar(){
  let token = localStorage.getItem("authorization")
  let isLoggedin = token;
  let navigate = useNavigate()
  const logout = ()=>{
    localStorage.removeItem("authorization")
    navigate("/login")
  }
    return(
        <>
        <div className="flex flex-row justify-between main-nav h-24 bg-blue-700 text-white">
          <div>
            <img src={banner} className="w-24 h-20 main-img relative left-5"></img>
          </div>

          <div className="flex justify-between flex-row">
           <ul className="flex flex-row relative right-6 gap-9 text-4xl font-extrabold hover:cursor-pointer">
           
            {!isLoggedin &&(
              <div className="flex flex-row relative right-6 gap-9 text-4xl font-extrabold hover:cursor-pointer">
              <li onClick={()=>navigate("/login")}>login</li>
              <li onClick={()=>navigate("/signup")}>Register</li>
              </div>
            )}

            {isLoggedin &&(
              <div className="flex flex-row relative right-6 gap-9 text-4xl font-extrabold hover:cursor-pointer">
            <li onClick={logout}>Logout</li>
            <li onClick={()=>navigate("/officerlogin")}>Officer Register</li>
            <li>Home</li>
            <li>Contact</li>
            <li>About</li>
            </div>
            )}
            
           </ul>
          </div>
        </div>
        <h1 className='text-6xl relative top-20 portal-heading'>Election Portal</h1>
        <Party></Party>
        <Finish></Finish>
        </>
    )
}

export default Navbar