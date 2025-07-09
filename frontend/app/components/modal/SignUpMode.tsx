'use client'

import Modal from "./Modal"
import { useState } from "react"
import { useRouter } from "next/navigation"
import useSignupModal from "@/app/hooks/useSignupModal"
import CustomButton from "../form/CustomButton"
import apiService from "@/app/services/apiService"
import { handleLogin } from "@/app/lib/action"

const SignupModal = () => {
    const router = useRouter();
    const signupModal= useSignupModal()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState<string[]>([])
    
    const submitSignup = async () => {
        const formData = {
            email: email,
            password1: password,
            password2: confirmPassword
        }

        const response = await apiService.post('/api/auth/register/', JSON.stringify(formData))
        if (response.access) {
            handleLogin(response.user.pk, response.access, response.refresh)

            signupModal.close()

            router.refresh()
        }else{
            const tmpErrors: string[] = Object.values(response).map((error:any) => {
                return error
            })
            setErrors(tmpErrors)
        }
    }   
    const content= (
        <>
            <h2 className="mb-6 text-2xl">Welcome to djangobnb, please login.</h2>
            <form action={submitSignup} className="space-y-4">
                <input onChange={(e) => setEmail(e.target.value)} placeholder="Your email address.." className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" type="email" />
                <input onChange={(e) => setPassword(e.target.value)} placeholder="Your password.." className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" type="password" />
                <input onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password.." className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" type="password" />
                
                {errors.map((err, index) => (
                    <div key={index} className="p-5 bg-airbnb text-white rounded-xl opacity-80">{err}</div>
                ))}
                <CustomButton label="Submit" onClick={submitSignup} />
            </form>
        </>
        
    )
    return (
        <Modal content={content} isOpen={signupModal.isOpen} close={signupModal.close} label="Sign Up"/>
    )
}

export default SignupModal