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
            <span className="font-serif text-2xl text-navy font-normal"> 
                TIMEORA 
            </span>
        </Link>
    )
}
export default Logo;