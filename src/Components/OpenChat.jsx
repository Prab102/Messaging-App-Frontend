import { Link} from "react-router-dom";

import { useState, useEffect } from 'react';
import TimeFormat from "./TimeFormat";
import sendicon from "../assets/send.svg";

const OpenChat = ({showBack, user, setSelectedChat, selectedChat,setChatUser,chatUser,chatUserInfo}) => {

    const[refresh,setRefresh] = useState(false);
    const[msg,setMsg] = useState('');

    const messagestring = `https://messaging-api.prabsingh.io/api/messages`;
    // const messagestring = `http://localhost:3000/api/messages`;



        //function that handles message post
        async function  sendMessage  (event) {
          event.preventDefault();

          const data1 = new FormData(event.target);
          const data = {
            incoming_user: data1.get("incoming_user"),
            messagecontent: data1.get("messagecontent"),
          }
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: "include",
          };
          const response = await fetch(messagestring, requestOptions);
          // navigate("/");
          setRefresh(true);
          setMsg('');

        }


        const refreshData = async (userId) => {
            try {
              // console.log("this is selected user",userId);
              setRefresh(false);
              console.log("")
              const response = await fetch(`https://messaging-api.prabsingh.io/api/users/${userId}/messages`,{credentials:"include"});
              // const response = await fetch(`http://localhost:3000/api/users/${userId}/messages`,{credentials: "include",});

              const data = await response.json();
              setSelectedChat(data.messages.reverse());
              if(data.messages.length > 0 ){
                  if(data.messages[0].incoming_user == userId){
                    setChatUser(data.messages[0].incoming_user);
                  }
                  else{
                    setChatUser(data.messages[0].outgoing_user);
                  }
              }
              else{
                console.log("new chat");
                setChatUser(userId);
              }
             
              
            } catch (err) {
              console.error('Error fetching user details:', err);
              // setError(err);
            } 
          };

        useEffect(()=>{
            const controller = new AbortController();
            // const signal = controller.signal;
            
            const key = refreshData(chatUser);
        
            return() =>{
                clearInterval(key)
                controller.abort();
            };
        
          },[refresh]);

          function handleChange(event){
            setMsg(event.target.value);                
          } 

          const handleBackClick = async () => {
              setSelectedChat(null); //change to use a seperate state variable to handle this 
          }


    return (
      <div id="openchatcont">
        <div id="linkcont">
          {showBack ? <div id="backbutton" onClick = {() => handleBackClick()}> &lt;</div> : <></>}
          <Link id="profilelink"to={`/profile/${chatUser}`}> 
            <div id="lettercircle">{chatUserInfo.first_name.charAt(0).toUpperCase()}</div>
            <div id="linkname">
              <p>{chatUserInfo.first_name} {chatUserInfo.last_name}</p>
              <div id="linkusername">{chatUserInfo.username}</div>
            </div>
          </Link> 
        </div>

        <div className={showBack ? "messagescont" :"messagescontprofile"}>
            {/* <div>{selectedChat.}</div> */}
            <div id="formcont">
                        <form id="messageform" onSubmit = {event => sendMessage(event)}>
                        
                          <input id="entermessage" name="messagecontent" onChange={handleChange} value={msg}type="text" />

                          <input type="hidden" name="incoming_user" value={chatUser} />

                          <button id="messagesubmit" type="submit"> <img width="25px"src={sendicon} alt="" /> </button>

                        </form>
            </div>

            <div id="allmessages">
            
                {selectedChat.map((chat,index) => (
                    
                    <div id="chatitem"  key={index}>

                        { chat.incoming_user == user.user._id ? 
                        
                            <div className="receivedmessage"> 
                              <div id="messageinfo"> 
                                  <div id="messagetimeleft">
                                    <p> {chatUserInfo.username}</p> 
                                    <TimeFormat time = {chat.timecreated} />
                                  </div>
                                  <div className="message">{chat.messagecontent} </div>
                              </div> 
                            </div>
                            : 
                            <div className="sentmessage"> 
                              <div id="messageinfo"> 
                                  <div id="messagetime">
                                    <p>You</p> 
                                    <TimeFormat time = {chat.timecreated} />
                                  </div>
                                  <div className="message">{chat.messagecontent} </div>
                              </div> 
                            </div>  
                        }

                        
                    </div>
                ))}
             </div>

           
        </div>
      </div>

    );
};
export default OpenChat;