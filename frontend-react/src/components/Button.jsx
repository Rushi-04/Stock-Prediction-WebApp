import React from 'react'
import { Link } from "react-router-dom";

const Button = ({text, styler, url}) => {
    return (
        <>
            <Link
                to={url}
                className={styler}
                // className="inline-flex items-center justify-center w-full px-5 py-3 text-base text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
                // onClick={toggleMenu}
            >
                {text}
            </Link>
        </> 
    )
}

export default Button