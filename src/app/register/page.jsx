"use client";

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';

function Registerpage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSccess] = useState("");

  console.log(name, email, password, confirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน!');
      return;
    }

    if (!name || !email || !password || !confirmPassword) {
      setError('กรุณาใส่ข้อมูลให้ครบ!');
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        const form = e.target;
        setError("");
        setSccess("ลงทะเบียนสำเร็จ");
        form.reset();
      } else {
        setError("ผู้ใช้ไม่สามารถสมัครใช้งานได้");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='container mx-auto py-5'>
        <h3>Register Page</h3>
        <hr className='my-3' />
        <form onSubmit={handleSubmit}>

          {error && (
            <div className='bg-red-500 w-fit text-white py-1 px-3 rounded-md mt-2'>
              {error}
            </div>
          )}
          {success && (
            <div className='bg-green-500 w-fit text-white py-1 px-3 rounded-md mt-2'>
              {success}
            </div>
          )}
          <input 
            onChange={(e) => setName(e.target.value)} 
            className='block bg-gray-300 py-2 mx-2 rounded-md' 
            type="name" 
            placeholder='Enter your name'
          />
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            className='block bg-gray-300 py-2 mx-2 rounded-md' 
            type="email" 
            placeholder='Enter your email'
          />
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            className='block bg-gray-300 py-2 mx-2 rounded-md' 
            type="password" 
            placeholder='Enter your password'
          />
          <input 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            className='block bg-gray-300 py-2 mx-2 rounded-md' 
            type="password" 
            placeholder='Confirm your password'
          />
          <button type='submit' className='bg-green-400 p-2 rounded-md text-white'>Sign Up</button> 
        </form>
        <hr className='my-3' />
        <p>
          หากมีบัญชีแล้ว? ไปที่
          <Link className='text-blue-500 hover:underline' href="/login">Login</Link>
          Page
        </p>
      </div>
    </div>
  );
}

export default Registerpage;
