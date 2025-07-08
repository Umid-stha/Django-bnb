'use client'

import Modal from "./Modal"
import { useState } from "react"
import useLoginModal from "@/app/hooks/useLoginModal"
import { useRouter} from 'next/navigation'
import CustomButton from "../form/CustomButton"
import apiService from "@/app/services/apiService"
import { handleLogin } from "@/app/lib/action"

const LoginModal = () => {
    const router = useRouter()
    const loginModal = useLoginModal()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState<string[]>([])
    const submitLogin = async () => {
        const formData = {
            email: email,
            password: password
        }
        
        const response = await apiService.post('/api/auth/login/', JSON.stringify(formData))
        if(response.access){
            handleLogin(response.user.pk, response.access, response.refresh)
            loginModal.close()
            router.push('/')
        }else{
            setErrors(response.non_field_errors)
        }
    }
    
    const content= (
        <>
            <h2 className="mb-6 text-2xl">Welcome to djangobnb, please login.</h2>
            <form className="space-y-4">
                <input onChange={(e) => setEmail(e.target.value)} placeholder="Your email address.." className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" type="email" />
                <input onChange={(e) => setPassword(e.target.value)} placeholder="Your password.." className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" type="password" />
                
                {errors.map((err, index) => (
                    <div key={index} className="p-5 bg-airbnb text-white rounded-xl opacity-80">{err}</div>
                ))}
                <CustomButton label="Submit" onClick={submitLogin} />
            </form>
        </>
        
    )
    return (
        <Modal content={content} isOpen={loginModal.isOpen} close={loginModal.close} label="Log in"/>
    )
}

export default LoginModal