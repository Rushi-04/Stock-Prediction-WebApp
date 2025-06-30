import React from 'react'

const Button = ({text, styler}) => {
    return (
        <>
            <a
                href="#"
                className={styler}
                // className="inline-flex items-center justify-center w-full px-5 py-3 text-base text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
                // onClick={toggleMenu}
            >
                {text}
            </a>
        </> 
    )
}

export default Button