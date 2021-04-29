import React from 'react';

import '../styles/header.scss';

export function Header (){
  return(
    <header className="header">
      <div>
        <img src="/logo.svg" alt="to.do"/>
      </div>
    </header>
  );
}