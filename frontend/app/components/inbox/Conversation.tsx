'use client'
import { ConversationType } from "@/app/inbox/page"
import { useRouter } from "next/navigation"

interface ConversationProps{
    userId: string
    conversation: ConversationType
}

const Conversation: React.FC<ConversationProps> = ({userId, conversation}) => {
    const router = useRouter()
    const otherUser = conversation.users.find((user) => user.id != userId)
    return (
        <div className="px-6 py-4 cursor-pointer space-y-4s border border-gray-300 rounded-xl">
            <p className="mb-6 text-xl">
                {
                    otherUser?.name
                }
            </p>

            <p onClick={() => {
                router.push(`/inbox/${conversation.id}`)
            }}
            className="text-airbnb-dark cursor-pointer">Go to conversations</p>
        </div>
    )
}

export default Conversation