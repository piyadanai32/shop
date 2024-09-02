"use client";

import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';


function WelcomePage() {
    
  const {data: session} = useSession();
  console.log(session);
  
  if (!session) redirect("/login");
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar session ={session}/>
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-lg mx-auto text-center p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Shop</h1>
          <p className="text-lg text-gray-600 mb-6">
            We are glad to have you here. Explore our features and make the most of your experience with us.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/dashboard">
              
            </Link>
            <Link href="/profile">
            </Link>
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default WelcomePage;
