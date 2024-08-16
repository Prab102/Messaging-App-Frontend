import {  useNavigate} from "react-router-dom";

import "../Style/ProfilePage.css"  
import { useState,useEffect } from 'react'
import { useParams } from "react-router-dom";
import editicon from "../assets/pencil.svg";

const ProfilePage = ({user,loggedIn, profileid}) => {

        //STUFF NEEEDED FOR PROFILE 
        const [userInfo, setUserInfo] = useState(null);
        const [signedUser, setSignedUser] = useState(false);
        const [editwindow, setEditWindow] = useState(false); 
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
        
        let id = useParams(); 
        const navigate = useNavigate();

        if(profileid != null){

          id.userid = profileid;
        }
        
        //THIS NEEDS TO CHANGE THIS ONLY GETS SIGNED IN USER DATA
        async function getProfileData(){
            if(user != null){
              const response = await fetch(`https://messaging-api.prabsingh.io/api/users/${id.userid}`);
              // const response = await fetch(`http://localhost:3000/api/users/${id.userid}`);

              const product = await response.json();
              setUserInfo(product);
              if (product._id == user.user._id){
                setSignedUser(true);
              }
              else{
                setSignedUser(false);
              }
              
            }
            else{
              console.log("no user");
            }
        }
        function toggleEdit(){
          if(editwindow == false){
            setEditWindow(true);
            
          }
          else{
            setEditWindow(false);
          }
        }
       

        async function handleProfileEdit(event){
          // console.log()
          
          event.preventDefault();
          const data1 = new FormData(event.target);
          const data = {
          profilecolor: data1.get("color"),
          statusmessage: data1.get("statusmessage"), 
          //   postid: id.postid
          }
          const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: "include",
          };
          const response = await fetch(`https://messaging-api.prabsingh.io/api/users/${id.userid}`, requestOptions);
          // const response = await fetch(`http://localhost:3000/api/users/${id.userid}`, requestOptions);

          setEditWindow(false);

        }

        useEffect(()=>{
            const controller = new AbortController();
            // const signal = controller.signal;
            // if(user == null){
            //   navigate('/');
            // }
            
            const key = getProfileData();
        
            return() =>{
                clearInterval(key)
                controller.abort();
            };
        
          },[id,editwindow]);

          //Date Formatting
          let mmddyy ="";
          if(userInfo != null){
            // console.log("")
            let datejoined = new Date(userInfo.timejoined)
            let datemonth = month[datejoined.getMonth()];
            let dateday = datejoined.getDate();
            let dateyear = datejoined.getFullYear();
             mmddyy =  datemonth+" "+dateday+", "+dateyear;
            // console.log("this is modified dates", mmddyy);
          }

        return (
          <div id="profilecont">
             {userInfo ? 
            <div> 
              
                {signedUser ? 
                <div id="signedinprofile"> 

                  {/* Profile Current Signed in */}
                  {editwindow? <>
                    
                    <div id="editwindow">
                      
                      <form id="editform" onSubmit={event => handleProfileEdit(event)}>
                        <div id="editcolorcont">
                          <h4>Edit Profile Color</h4>
                          <input type="color" name="color" defaultValue={userInfo.profilecolor} required={true}/>
                        </div>
                        <div id="editstatuscont">
                          <h4>Edit Status</h4>
                          <textarea name="statusmessage" maxLength="250"placeholder="status message"  defaultValue={userInfo.statusmessage} />
                        </div>
                        <div id="buttoncont">
                          <button id="changesubmit" type="submit"> Submit</button>
                          <button id="changecancel" onClick={toggleEdit}>Cancel</button>
                        </div>

                      </form>
                    </div>
                  
                    </>: 
                    <>
                      <div id="profileheader" style={{backgroundColor: userInfo.profilecolor}}>

                        <div id="maincontent">
                          <div id="userletter">
                                {userInfo.first_name.charAt(0).toUpperCase()}
                          </div>
                          {userInfo.isactive? <div id="activecircle"> </div>:<div id="inactivecircle"> </div>}
                          <p id="profilename">{userInfo.first_name} {userInfo.last_name}</p>

                        </div>

                        {/* <div id="editbutton" onClick={toggleEdit}> edit </div>                      */}
                      </div>
                      <div id="aboutme">

                        <div id="editbutton" onClick={toggleEdit}> <img width="40px"src={editicon} alt="" /> </div>                     

                        <h3>About Me</h3>
                        <div>Member since {mmddyy}</div>

                        <h4>Note</h4>
                        <div id="statusnote">
                          <p>{userInfo.statusmessage}</p>
                        </div>
                        
                        {/* <input type="text" /> */}
                      </div>
                    </>
                  }

                </div>  :
                
                <div id="visitorprofile"> 
                  
                  <div id="profileheader" style={{backgroundColor: userInfo.profilecolor}}>

                        <div id="maincontent">
                          <div id="userletter">
                                {userInfo.first_name.charAt(0).toUpperCase()}
                          </div>
                          {userInfo.isactive ? <div id="activecircle"> </div>:<div id="inactivecircle"> </div>}
                          <p id="profilename">{userInfo.first_name} {userInfo.last_name}</p>

                        </div>

                        {/* <div id="editbutton" onClick={toggleEdit}> edit </div>                      */}
                      </div>
                      <div id="aboutme">
                        <h3>About Me</h3>
                        <div>Member since {mmddyy}</div>

                        <h4>Note</h4>
                        <p>{userInfo.statusmessage}</p>
                        {/* <input type="text" /> */}
                      </div>
                  

                </div>}


            </div> :
            
            <div id="load"> 
             <div className="loaderprofile"></div>
            </div>}
            
          </div>
        );
      };
      
      export default ProfilePage;