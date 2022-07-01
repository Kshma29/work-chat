
import React from "react";
import './Footer.css'
import { SocialIcon } from 'react-social-icons';
function Footer(){
    const currentYear = (new Date().getFullYear())
    const yearTxt = currentYear === 2022 ? "2022" : "2022 - "+currentYear
    
    return (
      <footer class="footer">
      <SocialIcon class="social1" url="https://www.linkedin.com/in/kshma-singh-a5a4331bb/" />
      © { yearTxt } Kshma Singh
      <SocialIcon class="social2" url="https://github.com/Kshma29" />
      </footer>
       
    )

}
export default Footer;