import { useNavigate} from "react-router-dom";
import "../Style/HomePage.css" ;
import { useState, useEffect } from 'react';
import OpenChat from "./OpenChat";


// setUser cookies, loggedIn, setLoggedIn
const HomePage = ({user, cookies}) => {
  // "messaging-app-backend-production-b1f1.up.railway.app"
  // insightful-rejoicing-production.up.railway.app
    const [chats, setChats] = useState([]);
    const [chatIndex, setChatIndex] = useState(null);
    const [selectedChat, setSelectedChat] = useState([]);
    
    const [chatUserInfo,setChatUserInfo] = useState(null);
    //this is chat user id
    const [chatUser, setChatUser] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    // console.log(cookies.get("jwt-authorization"));
    async function getMessageData(){
        if(user != null){
          const response = await fetch(`https://insightful-rejoicing-production.up.railway.app/api/users/${user.user._id}/chats`,{credentials:"include"});
          // const response = await fetch(`http://localhost:3000/api/users/${user.user._id}/chats`,{credentials:"include"});
          const product = await response.json();
          setChats(product.reverse());
          setLoaded(true);
        }
        else{
          console.log("no user");
        }
      }

    useEffect(()=>{
        const controller = new AbortController();
        // const signal = controller.signal;
        let key = null;
        if(!user){
          navigate("/");
        }
        else{
          key = getMessageData();

        }
    
        return() =>{
            clearInterval(key)
            controller.abort();
        };
      },[]);

      //this is used to select the specific chat
      const handleUserClick = async (userId,userinfo,index) => {
          setLoading(true);
          setSelectedChat(null); // Clear the previous user details
          setChatUser(null);
          setChatIndex(null);
          //userId is the other chatter
          try {
            const response = await fetch(`https://insightful-rejoicing-production.up.railway.app/api/users/${userId}/messages`,{credentials:"include"});
            // console.log("fetches");
            // const response = await fetch(`http://localhost:3000/api/users/${userId}/messages`,{credentials:"include"});

            const data = await response.json();
            setSelectedChat(data.messages.reverse());
            setChatIndex(index);
            setChatUserInfo(userinfo);

            if(data.messages[0].incoming_user == userId){
              setChatUser(data.messages[0].incoming_user);
            }
            else{
              setChatUser(data.messages[0].outgoing_user);
            }
          } catch (err) {
            console.error('Error fetching user details:', err);
          } finally {
            setLoading(false);
          }
        };

        return (
            <div id="homepagecont">
                <div id="chatscont">
                    <h1 id="chatsheader">Chats</h1>
                    {loaded ? 
                          <div id="chatlist">
                            {chats.length ? <>
                            {chats.map((chat,index) => (
                                    // chatIndex == index ?
                                    <div className = {chatIndex == index ? "chatitem-selected":"chatitem"}  key={chat.user._id} onClick={() => handleUserClick(chat.user._id,chat.user,index)}>                     
                                          <div id="linkstuff">
                                            <div id="lettercircle">{chat.user.first_name.charAt(0).toUpperCase()}</div>
                                            <p id="username">{chat.user.first_name} {chat.user.last_name}</p>
                                          </div>
                                    </div>
                            
                                  ))} </> :
                                  <> <div id="nochats">No Chats</div></>
                            }
                          </div> :<>
                          <div id="loadcont"> <div className="loaderchats"> </div> </div>
                          </>
                    }               
                </div>

                <div id="messagesection">
                 {loading && <div id="loadcont"><p className="loadermessages"></p></div>} 
                 
                  {selectedChat && chatUser ?
                    <>
                      <OpenChat user = {user} setSelectedChat = {setSelectedChat} selectedChat={selectedChat} setChatUser={setChatUser} chatUser={chatUser} chatUserInfo={chatUserInfo}/>
                    </> :
                    <> <div id="nochatopen">Open a Chat</div></>
                  } 
                </div>
                  
          </div>
        );
      };
      
      export default HomePage;