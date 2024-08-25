import { useState ,useEffect} from 'react'

import { Route, Routes} from 'react-router-dom'

import Cookies from 'universal-cookie';
// import cookies from 'js-cookie'
import {jwtDecode} from 'jwt-decode';

import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import HomePage from './Components/HomePage';
import TopBar from './Components/TopBar';
import MenuPage from './Components/MenuPage';

import ProfilePage from './Components/ProfilePage';
import SearchBar from './Components/SearchBar';
import ErrorPage from './Components/ErrorPage';

import './App.css'


function App() {

  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);


  const cookies = new Cookies();
  // const navigate = useNavigate();
  // console.log("these are cookies outside ",cookies.get("_vercel_jwt")); //test this might work
  // if(cookies.get("jwt_token") && user == null){
  //   console.log("there is a jwt token");
  //   const decoded = jwtDecode(cookies.get("jwt_token"));
  //   setUser(decoded);
  //   setLoggedIn(true);
  // }
  useEffect(()=>{
    const controller = new AbortController();
    // const signal = controller.signal;
    
  // console.log("these are cookies inside use effect",cookies.get("jwt_token"));
  if(cookies.get("jwt_token") && user == null){
    // console.log("there is a jwt token");
    const decoded = jwtDecode(cookies.get("jwt_token"));
    setUser(decoded);
    setLoggedIn(true);
  }
    

    return() =>{
        // clearInterval(key)
        controller.abort();
    };

  },[user]);

  return (
    <>
      <div id="webcontainer">
        {loggedIn ? <TopBar setUser={setUser} user = {user} cookies ={cookies} loggedIn = {loggedIn} setLoggedIn = {setLoggedIn}/> : <></>}

        <Routes > 

            <Route path ='/' element ={
                <LoginPage setUser = {setUser} user = {user} cookies = {cookies} loggedIn = {loggedIn} setLoggedIn = {setLoggedIn}/>
            }/>
            <Route path ='/menu' element ={<MenuPage  user={user}/>}/>
            <Route path ='/profile/:userid' element ={<ProfilePage user= {user} loggedIn = {loggedIn}/>}/> 
            <Route path ='/search' element ={<SearchBar user ={user} loggedIn= {loggedIn}/>}/> 
            {/* makes route path use id */}
            <Route path ='/signup' element ={<SignupPage />}/>
            <Route path ='/home' element ={<HomePage user= {user} loggedIn = {loggedIn} setLoggedIn ={setLoggedIn} cookies= {cookies}/>}/>
            <Route path='*' element = {<ErrorPage/>}></Route>
            
            
          </Routes>
      </div>
    </>
  )
}

export default App
