import { useState,useEffect } from 'react'
import "../Style/SearchBar.css"
import { useNavigate} from "react-router-dom";
import OpenChat from './OpenChat';
import ProfilePage from './ProfilePage';
import searchicon from "../assets/magnifying-glass.svg";
import viewprofileicon from "../assets/profile.svg";
import messageprofileicon from "../assets/dialogue.svg";



const SearchBar = ({user, loggedIn}) => {

    // use state variable to set found users and display thsat user
    const [userFound, setUserFound] = useState(false);
    const [searchedUser, setSearchedUser] = useState(null); //all user info
    const [openChat, setOpenChat] = useState(false);
    const [openProfile,setOpenProfile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [displayNoUser,setDisplayNoUser ] = useState(false);
    const [selectedChat, setSelectedChat] = useState([]); // not used properly
    const [chatUser, setChatUser] = useState(null); //used to store userid

    async function  handleSearch(event){
        event.preventDefault();
        setLoading(true);
        setOpenChat(false);

        const data1 = new FormData(event.target);
        try {
            const response = await fetch(`http://localhost:3000/api/users/username/${data1.get("searchuser")}`);
            const product = await response.json();
            if(product != null){
                // setUserFound(true);
                setDisplayNoUser(false);
                setSearchedUser(product);
                setChatUser(product._id);
            } 
            else{
                setDisplayNoUser(true);
                setUserFound(false);
                setSearchedUser(null);
                setChatUser(null);
                setOpenProfile(false);
                setOpenChat(false);   
            }
        }
        catch (err) {
            console.error('Error fetching user :', err);
            
        } finally {
            setUserFound(true);
            setLoading(false);
        }
        
        //   setEditWindow(false);
    }

    function toggleChat(){
        if(openChat == false){
          setOpenProfile(false)  
          setOpenChat(true);
          
        }
        else{
          setOpenChat(false);
        }
    }
    function toggleProfile(){
        if(openProfile == false){
          
          setOpenChat(false);
          setOpenProfile(true);  
        }
        else{
          setOpenProfile(false);
        }
    }
    const navigate = useNavigate();
    useEffect(()=>{
      const controller = new AbortController();
      // const signal = controller.signal;
      
      if(user == null){
        console.log("makes it into not logged in")
        navigate('/');
      }
  
      return() =>{
          // clearInterval(key)
          controller.abort();
      };
  
    },[]);


    return (
        <div id="searchbar">
            <div id="searchcont">

            
                <div id="searchheader">
                    {/* form get users with searched user if found */}
                    <h1>Search</h1>
                    <p>Enter a username to search </p>
                    <form  id="searchinputs" action="" onSubmit={event => handleSearch(event)}>
                        <input id="userinputbar" type="text" name="searchuser"/>
                        <button id="searchsubmit" type='submit'> <img width="20px" src={searchicon} alt="" /></button>
                    </form>
                    

                </div>
                <div id="results">
                    {/* have another compponent that gets result of search */}
                    {loading && <p className="">Loading...</p>}
                    {userFound &&searchedUser ? <>
                    
                        
                        <div id="searchfound">
                            <p id="searchedusername">{searchedUser.username}</p>
                            {/* <Link id="viewprofile" to={`/profile/${searchedUser._id}`}><img width="30px"src={viewprofileicon} alt="" /></Link> */}
                            <div id="viewprofile" onClick ={toggleProfile}> <img width="30px"src={viewprofileicon} alt="" /></div>

                            <div id="messageprofile" onClick ={toggleChat}> <img width="30px" src={messageprofileicon} alt="" /></div>
                        </div>
                    
                        </>: 
                        <>
                            
                            <div id="searchnotfound">
                                    {displayNoUser ? <> No user Found</>:<></>}
                            </div>

                        </>
                    }

                </div>
            </div>
            <div id="openwindow">
                {openChat? <> 
                    <div id="openchat">
                        {openChat == true && openProfile ==false? <> 
                                
                                <div>
                                    <OpenChat user = {user} setSelectedChat = {setSelectedChat} selectedChat={selectedChat} setChatUser={setChatUser} chatUser={chatUser} chatUserInfo = {searchedUser}/>
                                </div>

                                </> :  
                                <> 

                            </>}
                    </div>
                    </>:
                    <>
                        </>}

                {openProfile ? <>
                    {openProfile ==true && openChat==false? <>
                        <div id="openprofile">
                            <ProfilePage user= {user} loggedIn = {loggedIn} profileid={searchedUser._id}/>
                        </div>
                    </>:
                    <>
                    </>}
                </>:<></>
                }
                
                {openChat ==false && openProfile==false ? 
                                <>
                                    <div id="closedchat">
                                        <p>Search for Users</p>
                                    </div>
                                </> :
                                <>
                                
                                </>
                }
            </div>
        </div>
    );
  };
  
  export default SearchBar;