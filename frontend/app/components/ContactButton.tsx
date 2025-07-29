'use client'

import useLoginModal from "../hooks/useLoginModal"
import {useRouter} from "next/navigation"
import apiService from "../services/apiService"

interface ContactButtonProps{
    userId: string | null
    landlordId: string
}

const ContactButton: React.FC<ContactButtonProps> = ({
        userId,
        landlordId
    }) => {
        const loginModal = useLoginModal()
        const router = useRouter()

        const startConversation = async () => {
            if(!userId){
                loginModal.open()
            } else{
                const conversation = await apiService.get(`/api/chat/start/${landlordId}/`)
                console.log(conversation)
                if (conversation.conversation_id) {
                    router.push(`/inbox/${conversation.conversation_id}`)
                }
            }
            
        }

        return (
            <div 
                onClick={() => {
                    startConversation()
                }}
                className="py-4 px-6 bg-airbnb mt-6 text-white rounded-xl cursor-pointer transition hover:bg-airbnb-dark"
            >
                    Contact
            </div>
        )
}

export default ContactButton