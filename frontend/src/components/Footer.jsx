import React from 'react';

export default function Footer(){
  return (
    <footer style={{padding:'1.25rem',textAlign:'center',borderTop:'1px solid #eee',marginTop:40}}>
      <small>© {new Date().getFullYear()} Pink Post — Made with care</small>
    </footer>
  );
}
