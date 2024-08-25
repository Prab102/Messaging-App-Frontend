import { Link , useNavigate} from "react-router-dom";

import "../Style/MenuPage.css"  
import { useEffect } from 'react'

const MenuPage = ({user}) => {

    const navigate = useNavigate();
    useEffect(()=>{
      const controller = new AbortController();
      // const signal = controller.signal;
      if(user == null){
        // console.log("makes it into not logged in")
        navigate('/');
      }
      return() =>{
          // clearInterval(key)
          controller.abort();
      };
  
    },[user,navigate]);
    
        return (
          <div id="menucont">
            <div>
             <h1>Welcome</h1> 
              {user ? <>
                <div id="menuoptions">
                  <div className="menulink" ><Link id="profilemenu" to={`/profile/${user.user._id}`} ><div className="menuitem">Profile</div></Link> </div>
                  <Link id="chatsmenu"className="menulink" to="/home" ><div className="menuitem">Chats</div> </Link>
                  <Link id="searchmenu"className="menulink" to="/search" ><div className="menuitem">Search</div></Link>
                </div>
               

              </>: <>
                No User Signed In
              </>}

            </div>
          </div>
        );
      };
      
      export default MenuPage;