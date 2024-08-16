import { Link , useNavigate} from "react-router-dom";
import chaticon from "../assets/messages.svg"
import searchicon from "../assets/search.svg"
import usericon from "../assets/user.svg"
import logouticon from "../assets/sign.svg"

import "../Style/TopBar.css"  
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';


const TopBar = ({user,setUser,cookies,setLoggedIn}) => {

    const navigate = useNavigate();
    const params = useLocation(); 
    const [selected, setSelected] = useState(null);


    async function  logoutFunction (event) {
       
        event.preventDefault();
        const data = {
          userid: user.user._id,

        }
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
          credentials: 'include'
        };
        const response = await fetch(`https://messaging-api.prabsingh.io/logout`, requestOptions);
        // const response = await fetch(`http://localhost:3000/logout`, requestOptions);


        cookies.remove("jwt_token");
        
        if(cookies.get("jwt_token")){
          console.log("cookie exists");
        }
        setUser(null);
        
        setLoggedIn(false);
        navigate("/");
        // setSelected(null);
        // cookies.remove("jwt-authorization");
        
      }
      useEffect(()=>{
        const controller = new AbortController();
        // const signal = controller.signal;
        if(user == null){
          navigate('/');
        }
        
    
        return() =>{
            // clearInterval(key)
            controller.abort();
        };
    
      },[user]);
      
      const toggleSelected = async (nav) => {
        setSelected(nav);
      }
      useEffect(()=>{
        const controller = new AbortController();

        if(params.pathname.includes("/home")){
          setSelected("chats")
        }
        else if(params.pathname.includes("/search")){
          setSelected("search")
        }
        else if(params.pathname.includes("/profile")){
          setSelected("profile")
        }
        
        return() =>{
            // clearInterval(key)
            controller.abort();
        };
    
      },[params]);

        return (
          <div id="topbarcont">
            <nav id="navbar">
                {user ? (<><ul id="navlist">
                            <div id="chatnav" className={selected == "chats" ? "navcont-selected":"navcont"} onClick={() => toggleSelected("chats")}>
                              <Link className="navlink" to={`/home`} ><img id="chaticon"src={chaticon} alt="chats"/></Link> 
                            </div>
                            <div id="searchnav"className={selected == "search" ? "navcont-selected":"navcont"} onClick={() => toggleSelected("search")}>
                              <Link className="navlink" to={`/search`} ><img id="chaticon"src={searchicon} /></Link> 
                            </div>
                            <div id="profilenav"className={selected == "profile" ? "navcont-selected":"navcont"} onClick={() => toggleSelected("profile")}>
                              <Link className="navlink" to={`/profile/${user.user._id}`} ><img id="chaticon"src={usericon} /></Link>
                            </div>
                    
                            <div id="logout" onClick={event => logoutFunction(event)}>  <img id="chaticon"src={logouticon} />  </div>
                          </ul>
                
                        </>):(<>

                            </>)}
               
            </nav>
          </div>
        );
      };
      
      export default TopBar;