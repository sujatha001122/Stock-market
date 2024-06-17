import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [greeting, setGreeting] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const userName = 'Jhon'; 

  useEffect(() => {
    const date = new Date();
    const hour = date.getHours();

    let greetingMsg = 'Hello';


    setGreeting(greetingMsg);
    setCurrentDate(date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div className="header">
      <div className="greeting">
        <h2>{greeting}, {userName}!</h2>
        <p>{currentDate}</p>
      </div>
      <div className="navigation">
        <span><FontAwesomeIcon icon={faHome} /> Home</span>
        <span><FontAwesomeIcon icon={faSearch} /> Search</span>
        <span><FontAwesomeIcon icon={faUser} /> Profile</span>
      </div>
    </div>
  );
};

export default Header;
