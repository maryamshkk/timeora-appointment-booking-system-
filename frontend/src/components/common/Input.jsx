import React from 'react';

function Input ({
    label, 
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    required = false,

 }) {

    return (
        <div>
            <label htmlFor={name}
                    className="mb-2 block font-serif text-sm font-bold text-navy">
                        {label}
            </label>

            <input 
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange} 
                placeholder={placeholder}
                required={required}
                className="w-full rounded-xl border border-gray bg-white
                px-4 py-3 font-serif text-navy placeholder:text-slate
                outline-none transition duration-200 focus:border-navy
                focus:ring-2 focus:ring-gold"
            />
        </div>
        
    );
}
export default Input;