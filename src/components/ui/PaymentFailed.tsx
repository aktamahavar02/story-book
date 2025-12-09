 import React from 'react'
import { useNavigate } from 'react-router-dom';
 
 export const PaymentFailed = () => {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get("personalizedBook");
    const navigate = useNavigate();
    const handleClick = () => {
   navigate(`/preview-paywall/${bookId}`)
      };
   return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="rounded-2xl shadow-lg p-8 bg-white text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        ❌ Payment Failed
      </h1>
      <p className="text-gray-600 mb-6">
        Something went wrong with your payment. Please try again.
      </p>
      <button
        onClick={handleClick}
        className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
      >
        Retry Payment
      </button>
    </div>
  </div>
   )
 }
 