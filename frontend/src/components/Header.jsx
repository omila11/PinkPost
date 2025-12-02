import React from 'react';

export default function Header() {
  return (
    <header style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'1rem',borderBottom:'1px solid #eee'}}>
      <div style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
        <div style={{width:40,height:40,background:'#ff7aa2',borderRadius:8}} />
        <h1 style={{margin:0,fontSize:'1.1rem'}}>Pink Post</h1>
      </div>
      <nav>
        <a href="/" style={{marginRight:12}}>Home</a>
        <a href="/cart">Cart</a>
      </nav>
    </header>
  );
}
