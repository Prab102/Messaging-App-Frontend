import { useNavigate, Link} from "react-router-dom";
import "../Style/LoginPage.css" ;
import { useState, useEffect } from 'react';
import PaperPlane from "./PaperPlane";
// import Cookies from 'universal-cookie';
import {jwtDecode} from 'jwt-decode'
// import { useParams } from "react-router-dom";
// import { Outlet } from "react-router-dom";


const LoginPage = ({setUser, cookies, loggedIn, setLoggedIn}) => {

    const loginstring = `https://insightful-rejoicing-production.up.railway.app/login` ;
    // const loginstring = `http://localhost:3000/login` ;
    

    const [foundMessage, setFoundMessage] = useState(true);

    const navigate = useNavigate();


    async function  loginFunction  (event) {
        event.preventDefault();
       
        const data1 = new FormData(event.target);
        const data = {
          username: data1.get("username"),
          password: data1.get("password"),
        }
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
          credentials: 'include'
        };
        try {
          const response = await fetch(loginstring, requestOptions, );
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const resdata = await response.json();
          const decoded = jwtDecode(resdata.token)

          // console.log("this is data",resdata); //dont forget to change for demo too

            setUser(decoded);
            // cookies.set("jwt-authorization", resdata.token,{
            //     expires: new Date(decoded.exp * 1000),
            // });
            setLoggedIn(true);

        } 
        catch (error) {
          if (error.name === 'AbortError') {
            console.log('Fetch aborted');
          } else {
            // setError(error);
            console.log(error)
          }
        } 
      }

      async function  loginDemo  (event) {
        event.preventDefault();
       
        const data = {
          username: "DemoAccount",
          password: "!DemoAccount987",
        }
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: "include", //important
          body: JSON.stringify(data),
        };
          const response = await fetch(loginstring, requestOptions, );
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const resdata = await response.json();
          const decoded = jwtDecode(resdata.token)
          // console.log("this is data",response); //dont forget to change for demo too

            setUser(decoded);
            // setLoggedIn(true);

            // cookies.set("jwt-authorization", resdata.token,{
            //     expires: new Date(decoded.exp * 1000),
            // });
            setLoggedIn(true);

      }

      async function handleLoggedIn(){
          if(loggedIn == true ){
            navigate("/menu");
          }
      }
      
      useEffect(()=>{
        const controller = new AbortController();
        const key = handleLoggedIn(); 
        return() =>{
            clearInterval(key)
            controller.abort();
        };
    
      },[loggedIn, navigate]);


        return (
            <div id="loginpagecont">

                <div id="loginsection">
                  <div id="loginformcont">
                    <h2>WhensApp Messaging App </h2>
                      <h1>Welcome Back</h1>
                      <p>Dont Have an Account?<Link to="/signup"> Create an account </Link></p>
                      {foundMessage ? (<div></div>):(<p>User not found try again</p>)}
                      <form onSubmit={event => loginFunction(event)}  id="loginForm">

                          <label htmlFor="username"> Username</label>
                          <input id="usernameinput" type="text" name="username" placeholder="Username" required={true} />
                          <label htmlFor="password"> Password</label>
                          <input id="passwordinput"type="password" name="password" placeholder="" required={true} />

                          <button className="loginbutton" type="submit" id="loginSubmit">Submit</button>

                      </form>
                      <button id="demobutton"onClick={(event)=>loginDemo(event)} className="loginbutton"> Try Application Demo</button>

                  </div>

                </div>
                <div id="homesection">
                  
                  <PaperPlane></PaperPlane>
                </div>
          </div>
        );
      };
      
      export default LoginPage;