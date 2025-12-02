import React from 'react';

export default function GiftBoxCard({item, onAdd}){
  return (
    <div style={{border:'1px solid #eee',padding:12,borderRadius:8,width:220}}>
      <div style={{height:120,background:'#fafafa',borderRadius:6,marginBottom:8,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <img src={item.image || '/public/placeholder.png'} alt={item.title} style={{maxHeight:110,maxWidth:'100%'}} />
      </div>
      <h3 style={{margin:'6px 0'}}>{item.title}</h3>
      <p style={{margin:'6px 0',color:'#666'}}>{item.description}</p>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
        <strong>${item.price?.toFixed(2) || '0.00'}</strong>
        <button onClick={() => onAdd && onAdd(item)}>Add</button>
      </div>
    </div>
  );
}
