import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register: registerUser, userInfo } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (data) => {
    try {
      if (isLogin) {
        await login(data.email, data.password);
      } else {
        await registerUser(data.name, data.email, data.password);
      }
      toast.success(isLogin ? "Welcome back!" : "Account created successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4 py-24 object-cover">
      <div className="bg-white p-10 rounded-xl shadow-2xl max-w-md w-full relative overflow-hidden">
        {/* Decorative accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
        
        <div className="mb-10 text-center">
            <h1 className="text-3xl font-black tracking-tighter mb-2">
               {isLogin ? "Sign In" : "Join the Movement"}
            </h1>
            <p className="text-gray-500 font-medium">{isLogin ? "Welcome back to SoleStream." : "Create your account"}</p>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Name</label>
              <input {...register('name', { required: !isLogin })} className="w-full bg-gray-50 border border-gray-200 rounded py-3 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" />
              {errors.name && <span className="text-red-500 text-xs mt-1 block tracking-wider uppercase font-bold">Required</span>}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
            <input type="email" {...register('email', { required: true })} className="w-full bg-gray-50 border border-gray-200 rounded py-3 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" />
            {errors.email && <span className="text-red-500 text-xs mt-1 block tracking-wider uppercase font-bold">Required</span>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Password</label>
            <input type="password" {...register('password', { required: true, minLength: 6 })} className="w-full bg-gray-50 border border-gray-200 rounded py-3 px-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" />
            {errors.password && <span className="text-red-500 text-xs mt-1 block tracking-wider uppercase font-bold">Must be at least 6 characters</span>}
          </div>

          <button type="submit" className="w-full bg-primary text-white font-bold uppercase tracking-widest text-sm py-4 rounded-sm hover:-translate-y-1 transition shadow-xl hover:shadow-primary/30 mt-8">
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-sm font-medium text-gray-600">
            {isLogin ? "New to SoleStream?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="ml-2 text-primary hover:underline font-bold"
            >
              {isLogin ? "Register" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
