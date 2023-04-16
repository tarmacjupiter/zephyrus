import React from 'react'
import logo from "../assets/zephyrus-logo.png"
import "./Header.css"

function Header(){
    return (
        <div className='Title'>
            <img className="logo-img" src={logo} alt="Logo"/>
        </div>
    )
}

export default Header
