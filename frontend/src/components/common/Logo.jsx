import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function Logo() {

    return(
        <Link to='/'>
            <img
                src={logo}
                alt="Timeora"
                className="h-auto w-32" 
            /> 
        </Link>
    )
}
export default Logo;