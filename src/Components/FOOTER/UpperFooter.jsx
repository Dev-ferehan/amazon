import React, { useEffect, useState } from 'react';
import classes from './upperfooter.module.css';
import {logo,footerSections} from "../../assets/assets";

const  UpperFooter = () => {
const [section,setSection]=useState([]);
const fetchData=async()=>{
setSection(footerSections)
}
useEffect(()=>{
   const fetchedData= async()=>await fetchData();
   fetchedData()
},[])

  return (
    <footer className={classes.footerContainer}>
      <div className={classes.backToTop}>
        <a href="#top">Back to top</a>
      </div>

      <div className={classes.footerContent}>
        <div className={classes.linkGrid}>
          {section.map((section, index) => (
            <div key={index} className={classes.sectionColumn}>
              <h3>{section.title}</h3>
              <ul>
                {section.links.map((link, idx) => (
                  <li key={idx}><a href={`#${link.replace(/\s+/g, '-').toLowerCase()}`}>{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className={classes.footerBottom}>
        <div className={classes.bottomBranding}>
          <img 
            src={logo}
            alt="Amazon Logo" 
            className={classes.logo} 
          />
          <div className={classes.selectors}>
            <div className={classes.selector}>🌐 English</div>
            <div className={classes.selector}>$ USD - U.S. Dollar</div>
            <div className={classes.selector}>🇺🇸 United States</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UpperFooter;