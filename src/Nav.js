import React from 'react';
import {Link} from "react-router-dom";
function Nav() {


    return (

        <div>

            <p>Welome to ZeroGiven, a virtual journal where you can vent your everything!</p>
            <img src={"https://cdn.pixabay.com/photo/2020/03/08/13/37/cartoon-4912526_960_720.jpg"}
                alt={"fox image"}/>
            <button>
                <Link to="/login">
                    Login</Link>
            </button>
            <button>
                <Link to="/sign_up">
                    Sign Up</Link>
            </button>

            <button>
                <Link to="/">
                    ZeroGiven</Link>
            </button>
        </div>


    )
}

export default Nav;
