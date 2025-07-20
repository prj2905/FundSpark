'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login to your account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">or</span>
          </div>
        </div>

        <button
          onClick={() => signIn('google')}
          className="flex items-center justify-center gap-3 w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-2xl" />
          <span className="text-sm font-medium">Sign in with Google</span>
        </button>

        <p className="text-sm text-center mt-6 text-gray-600">
          Not registered yet?{' '}
          <Link href="/signup" className="text-blue-600 hover:underline font-medium">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
