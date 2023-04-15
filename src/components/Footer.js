import React from 'react'
import "./Footer.css"
import image from"../assets/github-mark/github-mark-white.png"

function Footer(){
  const year = new Date().getFullYear();
  return (
    <footer>
      <h2 className='roboto-font'>
        Project Zephyrus | WildHacks {year}
      </h2>
      <a href="https://github.com/tarmacjupiter/zephyrus">
        <h4>
          <img src={image} alt="GitHub Logo" className='footer-image'></img>
          <em className = 'footer-text'>GitHub Link</em>
        </h4>
      </a>
    </footer>
  );
}

export default Footer;
