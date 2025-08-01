import ConversationDetail from "@/app/components/inbox/ConversationDetail"
import { getAccessToken, getUserId } from "@/app/lib/action"
import { useState, useEffect } from "react"
import { UserType } from "../page";
import apiService from "@/app/services/apiService";

export type MessageType = {
    id: string;
    name: string;
    body: string;
    conversation_id: string;
    sent_to: UserType;
    created_by: UserType
}

const ConversationPage = async ({params}: {params: {id: string}}) => {
    const userId = await getUserId()
    const token = await getAccessToken()
    if (!userId || !token){
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>You need to be authenticated...</p>
            </main>
        )
    }

    const conversation = await apiService.get(`/api/chat/${params.id}/`)

    return (
        <div className="max-w-[1500px] mx-auto px-6 pb-6">
            <ConversationDetail 
                conversation={conversation.conversation}
                userId = {userId}
                token = {token}
                messages={conversation.messages}
            />
        </div>
    )
}

export default ConversationPage