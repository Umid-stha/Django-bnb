import Conversation from "../components/inbox/Conversation"
import apiService from "../services/apiService"
import {useState, useEffect} from 'react';
import { getUserId } from "../lib/action"
import { MessageType } from "./[id]/page";

export type UserType = {
    id: string
    name: string
    avatar_url: string
}

export type ConversationType = {
    id: string
    users: UserType[]
}

const InboxPage = async () => {
    const userId = await getUserId()
    if (!userId){
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>You need to be authenticated...</p>
            </main>
        )
    }
    const conversations = await apiService.get('/api/chat/')
    return (
        <div className="max-w-[1500px] pb-6 mx-auto px-6 space-y-4">
            <h1 className="my-6 text-2xl">Inbox</h1>
            {conversations.map((conversation: ConversationType) => {
                return (
                    <Conversation 
                        key={conversation.id}
                        userId={userId}
                        conversation={conversation}
                    />
                )
            })}
        </div>
    )
}

export default InboxPage