"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const { data: session } = useSession();
  
  // หากผู้ใช้ล็อกอินอยู่แล้ว ให้นำไปยังหน้าโปรไฟล์
  if (session) {
    router.replace("/profile");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("เกิดข้อผิดพลาด: " + res.error);
      } else {
        // ล็อกอินสำเร็จ ให้นำไปยังหน้าโปรไฟล์
        router.replace("/profile");
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
  };

  return (
    <div>
      <Navbar />
      <div className='container mx-auto py-5'>
        <h3>Login Page</h3>
        <hr className='my-3' />
        <form onSubmit={handleSubmit}>
          <input
            className='block bg-gray-300 py-2 mx-2 rounded-md'
            type="email"
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='block bg-gray-300 py-2 mx-2 rounded-md'
            type="password"
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type='submit'
            className='bg-green-400 p-2 rounded-md text-white'
          >
            Login
          </button>
        </form>
        <hr className='my-3' />
        <p>
          หากยังไม่มีบัญชี? ไปที่{" "}
          <Link className='text-blue-500 hover:underline' href="/register">Register</Link>{" "}
          Page
        </p>
        {error && <p className="text-red-500 mt-3">{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
