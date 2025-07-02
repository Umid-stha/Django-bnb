'use client'

import Modal from "./Modal"
import { useState } from "react"
import useSignupModal from "@/app/hooks/useSignupModal"
import CustomButton from "../form/CustomButton"

const SignupModal = () => {
    const signupModal= useSignupModal()
    
    const content= (
        <>
            <h2 className="mb-6 text-2xl">Welcome to djangobnb, please login.</h2>
            <form className="space-y-4">
                <input placeholder="Your email address.." className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" type="email" />
                <input placeholder="Your password.." className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" type="password" />
                <input placeholder="Confirm password.." className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" type="password" />
                
                <div className="p-5 bg-airbnb text-white rounded-xl opacity-80">Error message</div>
                <CustomButton label="Submit" onClick={() => {
                    console.log("Login clicked")
                }} />
            </form>
        </>
        
    )
    return (
        <Modal content={content} isOpen={signupModal.isOpen} close={signupModal.close} label="Log in"/>
    )
}

export default SignupModal