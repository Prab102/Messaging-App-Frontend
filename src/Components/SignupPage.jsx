import { useNavigate, Link} from "react-router-dom";
import "../Style/SignupPage.css" ;
import PaperPlane from "./PaperPlane";
import { useState } from 'react';



const SignupPage = () => {

    const signupstring = `http://localhost:3000/api/users` ;

    const [displayError, setDisplayError] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function  signupFunction  (event) {
        event.preventDefault();

        const data1 = new FormData(event.target);
        const data = {
          first_name: data1.get("first_name"),
          last_name: data1.get("last_name"),
          username: data1.get("username"),
          password: data1.get("password"),
        //   postid: id.postid
        }
      
        
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        };
        const response = await fetch(signupstring, requestOptions);

        if(response.statusText != 'OK'){
            setDisplayError(true);
            setError(response.statusText);

        }
        else{
            setDisplayError(false);
            setError("");
            navigate("/");
        }

      }
      
        return (
            <div id="signuppagecont">
              <div id="signupsection">
                <div id="signupformcont">
                    <h1>WhensApp Messaging App </h1>

                    <h2>Create an Account</h2>
                    <p>Already have an account? <Link to="/"> Log In </Link></p>
                    {/* {foundMessage ? (<div></div>):(<p>User not found try again</p>)} */}
                    <form onSubmit={event => signupFunction(event)}  id="signupForm">
                        <label htmlFor="first_name"> First Name</label>
                        <input id="firstname" type="text" name="first_name" placeholder="Enter First Name" required={true} />
                        <label htmlFor="first_name"> Last Name</label>
                        <input id="lastname" type="text" name="last_name" placeholder="Enter Last Name" required={true} />
                        <label htmlFor="first_name">  Username</label>
                        <input id="usernameinput" type="text" name="username" placeholder="Enter a Username" required={true} />
                        <label htmlFor="first_name"> Password</label>
                        <input id="passwordinput"type="password" name="password" placeholder="" required={true} />

                        <button type="submit" id="signupSubmit">Submit</button>

                    </form>
                    {displayError ? <>

                        <div>{error}</div>
                        
                    </>:<>
                    
                    </>}
                    {/* <Link to="/signup">Sign Up</Link> */}
                </div>

              </div>
              <div id="homesection">
                  
                  <PaperPlane></PaperPlane>
              </div>
                
          </div>
        );
      };
      
      export default SignupPage;