import React from 'react';

function Button ({
    children,
    type = "button",
    onClick, 
    disabled = false
}) {

    return (
        <>
        <button 
        type = {type}
        onClick={onClick}
        disabled={disabled}
        className='
         w-full rounded-xl bg-navy px-6 py-3 font-serif font-bold
         text-white transition duration-200 hover:bg-gold 
         hover:text-navy disabled:cursor-not-allowed disabled:opacity-50'
         >
            {children}

        </button>
        </>
    );
}
export default Button;