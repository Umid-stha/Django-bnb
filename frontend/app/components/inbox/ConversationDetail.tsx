'use client'
import CustomButton from "../form/CustomButton"
const ConversationDetail = () => {
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