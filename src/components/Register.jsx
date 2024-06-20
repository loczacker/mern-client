import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { AiOutlineLock, AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import GoogleLogin from './Social/GoogleLogin';
import { AuthContext } from '../ultilities/providers/AuthProvider';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();
  const { signUp, updateUser, setError } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setError("");
    signUp(data.email, data.password).then((result) => {
      const user = result.user;
      if (user) {
        return updateUser(data.name).then(() => {
          const userImp = {
            _id: user.uid,
            name: user?.displayName,
            email: user?.email,
            photoURL: "",
            role: 'user',
            address: "",
            phone: "",
            about: ""
          };
          if (user.email && user.displayName) {
            return axios.post('http://localhost:5001/new-user', userImp)
              .then(() => {
                navigate('/');
                return "Registration Successful!";
              }).catch((err) => {
                throw new Error(err);
              });
          }
        }).catch((err) => {
          setError(err.code);
          throw new Error(err);
        });
      }
    });
  };

  const password = watch('password', '');

  // Use useEffect to show toast notifications for errors
  React.useEffect(() => {
    if (errors.name) {
      toast.error(errors.name.message || "Name is required");
    }
    if (errors.email) {
      toast.error(errors.email.message || "Email is required");
    }
    if (errors.password) {
      toast.error(errors.password.message || "Password is required");
    }
    if (errors.confirmpassword) {
      toast.error(errors.confirmpassword.message || "Passwords do not match");
    }
  }, [errors]);

  return (
    <div className='flex justify-center items-center pt-14 bg-gray-100'>
      <ToastContainer />
      <div className='bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-3xl font-bold text-center mb-6'>Please Register</h2>

        {/* form data */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex items-center gap-5'>
            <div className='mb-4'>
              <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
                <AiOutlineUser className='inline-block mr-2 mb-1 text-lg' />
                Name
              </label>
              <input type='text' placeholder='Enter your name' {...register("name", { required: "Name is required" })}
                className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='email' className='block text-gray-700 font-bold mb-2'>
                <AiOutlineMail className='inline-block mr-2 mb-1 text-lg' />
                Email
              </label>
              <input type='email' placeholder='Enter your email' {...register("email", { 
                required: "Email is required", 
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address"
                } })}
                className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'
              />
            </div>
          </div>

          <div className='flex items-center gap-5'>
            <div className='mb-4'>
              <label htmlFor='password' className='block text-gray-700 font-bold mb-2'>
                <AiOutlineLock className='inline-block mr-2 mb-1 text-lg' />
                Password
              </label>
              <input type='password' placeholder='Enter password' {...register("password", { 
                required: "Password is required", 
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long"
                } })}
                className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='confirmpassword' className='block text-gray-700 font-bold mb-2'>
                <AiOutlineLock className='inline-block mr-2 mb-1 text-lg' />
                Confirm Password
              </label>
              <input type='password' placeholder='Confirm Password' {...register("confirmpassword", 
              { required: "Confirm Password is required", validate: (value) => value === password || "Passwords do not match" })}
                className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'
              />
            </div>
          </div>

          <div className='text-center'>
            <button type='submit' className='bg-secondary hover:bg-red-500 text-white py-2 px-4 rounded-md'>
              Register
            </button>
            {
              errors.password && (<div className='text-red-500 text-sm w-full mt-1'>
                <p>Password doesn't match!</p>
              </div>)
            }
          </div>
        </form>
        <p className='text-center mt-4'>
          Already have an account? <Link to='/login' className='underline text-secondary ml-1'>Login</Link>
        </p>
        <GoogleLogin />
      </div>
    </div>
  );
}

export default Register;
