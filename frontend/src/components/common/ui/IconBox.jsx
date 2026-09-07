import React from "react";

function IconBox({children, className= ""}) {

    return(
        <div 
        className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-beige
            text-navy
        ">
                {children}
        </div>
    )
}
export default IconBox;