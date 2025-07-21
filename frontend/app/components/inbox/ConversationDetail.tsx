'use client'
import { ConversationType } from "@/app/inbox/page"
import CustomButton from "../form/CustomButton"
import useWebSocket from "react-use-websocket"
import { useEffect } from "react"

interface ConversationDetailProps{
    conversation: ConversationType 
    userId: string
    token: string
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({conversation, userId, token}) => {
    const otherUser = conversation.users?.find((user) => user.id != userId)
    const myUser = conversation.users?.find((user) => user.id == userId)

    const { sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(`ws://127.0.0.1:8000/ws/${conversation.id}/?token=${token}`, {
        share: false,
        shouldReconnect: () => true,
    })

    useEffect(() => {
        console.log("Connection state Changed", readyState)
    }, [readyState])
    return (
        <>
            <div className="max-h-[400px] overflow-auto flex flex-col space-y-4">
                <div className="w-[80%] py-4 px-6 rounded-xl bg-gray-200">
                    <p className="font-bold text-gray-500">John Doe</p>

                    <p>kjasof ksdanfl ldornnd m sd</p>
                </div>
                <div className="w-[80%] ml-[20%] py-4 px-6 rounded-xl bg-blue-200">
                    <p className="font-bold text-gray-500">Umid Doe</p>

                    <p>kjasof ksdanfl ldornnd m sd</p>
                </div>

            </div>

            <div className="mt-4 py-4 px-6 flex border border-gary-300 space-x-4 rounded-xl">
                <input type="text" placeholder="Type your message.." className="w-full bg-gray-200 rounded-xl p-2" />
                <CustomButton label="send" className="w-[100px]" onClick={() => console.log("clicked")}/>
            </div>
        </>
    )
}

export default ConversationDetail