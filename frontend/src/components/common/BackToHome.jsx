import React from "react";
import {Link} from "react-router-dom";

function BackToHome() {

    return(
        <Link
        to="/"
        className="
            inline-flex
            items-center
            gap-2
            font-serif
            text-sm
            text-navy
            transition
            duration-200
            hover:text-brown transition
            " 
        >
           ← Back to Home
        </Link> 
    )
}
export default BackToHome;