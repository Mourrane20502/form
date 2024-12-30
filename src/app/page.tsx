"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import { type SignUpForm, signUpSchema } from "../../lib/types";






export default function Home() {

  const notify = () => toast.success("Form submitted successfully!");


  const { register, handleSubmit , formState:{errors,isSubmitting}  , reset  } = useForm<SignUpForm>({
     resolver :zodResolver(signUpSchema)
  });

  
    const handleForm = async (data: SignUpForm) => {
     console.log(data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      reset();
    }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(handleForm)} className="flex flex-col items-center justify-center gap-6 p-8 bg-white shadow-lg rounded-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign Up</h2>
        
        <input  {...register("email" ,{required:"Email is required"})}
          type="email"
          className="w-full px-6 py-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
        />
         {errors.email &&(
          <span className="text-red-500 text-sm"> {`${errors.email.message}`}</span>
         )}
        
        <input
          type="password" {...register("password" ,{required:"Password is required" , minLength  :{
            value: 8,
            message: "Password must have at least 8 characters"
          } }  )}
            
          placeholder="Password"
          className="w-full px-6 py-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
         {errors.password &&(
          <span className="text-red-500 text-sm"> {`${errors.password.message}`}</span>
         )}
        
        <input
          type="password" {...register("confirmPassword" ,{required:"Confirm Password is required"} )}
           
          placeholder="Confirm password"
          className="w-full px-6 py-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
          {errors.confirmPassword &&(
          <span className="text-red-500 text-sm"> {`${errors.confirmPassword.message}`}</span>
         )}
        
        <button onClick={notify}
          type="submit"  disabled={isSubmitting}
          className="w-full py-3 flex items-center justify-center disabled:bg-red-600 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
        >
         {isSubmitting ? <LoaderCircle /> : "Sign Up"}
        </button>
        <ToastContainer />

      </form>
    </div>
  );
}
