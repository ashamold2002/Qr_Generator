import React, { useState } from 'react'
import "./App.css"

export const App = () => {
  const[img,setImage]=useState("")
  const[loading,setLoading]=useState(false)
  const [qrdata,setQrdata]=useState("")
  const[qrsize,setQrsize]=useState("150")
  const generate=()=>{
    setLoading(true)
    try {
      const url= `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`;
      setImage(url);
    } catch (error) {
      console.error("Error generating QR code",error);
    }
    finally{
      setLoading(false)
    }

  }
  const download=()=>{
    fetch(img)
    .then((response)=>response.blob())
    .then((blob)=>{
      const link=document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download="qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch((error)=>{
          console.error("Error in downloading QRcode : ",error);
    });
  }
  return (
    <div className='app-container'>
      <h1>QR code generator</h1>
      {loading && <p>Please Wait....</p>}
      {img &&<img src={img} className='qrimg'/>}
      <div>
      <label htmlFor='dataInput' className='input-label'>Data for Qr code</label>
      <input type='text' id="dataInput" value={qrdata} onChange={(e)=>setQrdata(e.target.value)} placeholder='Enter data for qr code'/>
      <label htmlFor='sizeInput' className='input-label'>Image size (e.g..150)</label>
      <input type='text' id="sizeInput" value={qrsize} onChange={(e)=>setQrsize(e.target.value)} placeholder='Enter image size'/>
      <button className='btngenerate' disabled={loading} onClick={generate}>Generate QR code</button>
      <button className='btndwld'onClick={download}>Download QR code</button>
      </div>
      <p>Designed by Asha mol D</p>
    </div>
  )
}



