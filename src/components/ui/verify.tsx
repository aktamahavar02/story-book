import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { verify } from '../../../store/slices/loginSlice.js';
import { cookie } from "../../utils/cookies.js";
const Verify: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            cookie.set("token", token);
            console.log("Token saved in cookie:", token);
        } else {
            console.log("No token found in URL");
        }
    }, []);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const token = searchParams.get('token');
        if (token) {
            dispatch(
                verify({
                    token,
                    onSuccess: () => {
                        navigate('/');
                    },
                })
            );
        } else {
            alert("Token not found in URL");
        }
    };

    return (
        <div className='lg:mt-14'>
            <div className=' h-full items-center'>
                <h2 className="text-3xl font-marcellus mb-2 text-left">Verifying your email...</h2>
                <p className="text-gray-500 mb-6 text-sm text-left font-figTree">Enter your credentials to access your account.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 ">

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-purple-600 text-white py-2 rounded-md font-normal"
                >
                    Verify your email
                </button>
            </form>
        </div>
    );
};

export default Verify;
