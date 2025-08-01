'use client'
import { ConversationType } from "@/app/inbox/page"
import CustomButton from "../form/CustomButton"
import useWebSocket from "react-use-websocket"
import { useEffect, useRef, useState } from "react"
import { MessageType } from "@/app/inbox/[id]/page"
import { UserType } from "@/app/inbox/page"

interface ConversationDetailProps{
    conversation: ConversationType 
    userId: string
    token: string
    messages: MessageType[]
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({conversation, userId, token, messages}) => {
    const messageDiv = useRef(null)
    const [newMessage, setNewMessage] = useState("")
    const otherUser = conversation.users?.find((user) => user.id != userId)
    const myUser = conversation.users?.find((user) => user.id == userId)
    const [realTimeMessages, setRealTimeMessages] = useState<MessageType[]>([])

    const { sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(`ws://127.0.0.1:8000/ws/${conversation.id}/?token=${token}`, {
        share: false,
        shouldReconnect: () => true,
    })

    useEffect(() => {
        if (lastJsonMessage && typeof lastJsonMessage === 'object' && 'name' in lastJsonMessage && 'body' in lastJsonMessage) {
            const message: MessageType = {
                id: '',
                name: lastJsonMessage.name as string,
                body: lastJsonMessage.body as string,
                sent_to: otherUser as UserType,
                created_by: myUser as UserType,
                conversation_id: conversation.id
            }

            setRealTimeMessages((realTimeMessages) => [...realTimeMessages, message])
        }
        scrollToBottom()
    }, [lastJsonMessage])

    const sendMessage = async () => {
        sendJsonMessage({
            event: 'chat_message',
            data: {
                body: newMessage,
                name: myUser?.name,
                sent_to_id: otherUser?.id,
                conversation_id: conversation.id
            }
        })

        setNewMessage("")

        setTimeout(() => {
            scrollToBottom()
        }, 50)
    }

    const scrollToBottom = () => {
        if (messageDiv.current){
            messageDiv.current.scrollTop = messageDiv.current.scrollHeight
        }
    }

    useEffect(() => {
        console.log("Connection state Changed", readyState)
    }, [readyState])
    return (
        <>
            <div ref={messageDiv} className="max-h-[400px] overflow-auto flex flex-col space-y-4">
                {messages?.map((message, index) => (
                    <div
                        key={index}
                        className={`w-[80%] py-4 px-6 rounded-xl ${message.created_by.name === myUser?.name ? 'ml-[20%] bg-blue-200' : 'bg-gray-200'}`} 
                    >
                        <p className="font-bold text-gray-500">{message.created_by.name}</p>

                        <p>{message.body}</p>
                    </div>
                ))}

                {realTimeMessages.map((message, index) => (
                    <div
                        key={index}
                        className={`w-[80%] py-4 px-6 rounded-xl ${message.name === myUser?.name ? 'ml-[20%] bg-blue-200' : 'bg-gray-200'}`} 
                    >
                        <p className="font-bold text-gray-500">{message.name}</p>

                        <p>{message.body}</p>
                    </div>
                ))}
            </div>

            <div className="mt-4 py-4 px-6 flex border border-gary-300 space-x-4 rounded-xl">
                <input type="text" placeholder="Type your message.." className="w-full bg-gray-200 rounded-xl p-2" value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                />
                <CustomButton label="send" className="w-[100px]" onClick={sendMessage} />
            </div>
        </>
    )
}

export default ConversationDetail