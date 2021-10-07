import React from 'react';
import {Link} from "react-router-dom";
import './index.css';

function Nav() {


    return (

        <div style={{backgroundColor: "orange"}} >
            {/* backgroundColor: "DodgerBlue", */}

            <h1 className="hometext" >Welome to ZeroGiven, a virtual journal where you can vent your everything!</h1>
            <img className='fox'src={"https://cdn.pixabay.com/photo/2020/03/08/13/37/cartoon-4912526_960_720.jpg"}
                alt={"fox image"}/>
                <br/>
            <button  className="login"  >
                <Link to="/login">
                    Login</Link>
            </button>
            {/* <br/> */}
            <button className="signup" >
                <Link to="/sign_up">
                    Sign Up</Link>
            </button>

            <button className="home" >
                <Link to="/">
                    ZeroGiven</Link>
            </button>
        </div>


    )
}

export default Nav;