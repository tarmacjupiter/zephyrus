import React from 'react'
import "./Footer.css"
import image from"../assets/github-mark/github-mark-white.png"

function Footer(){
  const year = new Date().getFullYear();
  return (
    <div className='footer-container'>
      <footer>
        <h2 className='roboto-font'>
        WildHacks {year}
        </h2>
        <p className='roboto-font'>Anthony B | Antanas R | Upanshu P | Max Z</p>
        <a rel="noreferrer" target="_blank" href="https://github.com/tarmacjupiter/zephyrus">
          <h4>
            <img src={image} alt="GitHub Logo" className='footer-image'></img>
            {/* <em className = 'footer-text'>GitHub</em> */}
          </h4>
        </a>
      </footer>
    </div>
  );
}

export default Footer;
