import Conversation from "../components/inbox/conversation"

const InboxPage = () => {
    return (
        <div className="max-w-[1500px] pb-6 mx-auto px-6 space-y-4">
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
        </div>
    )
}

export default InboxPage