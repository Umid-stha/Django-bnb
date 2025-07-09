'use client'
import usePropertyModal from "@/app/hooks/usePropertyModal"
import useLoginModal from "@/app/hooks/useLoginModal"

interface AddPropertyButtonProps{
    userId?: string | null
}

const AddPropertyButton: React.FC<AddPropertyButtonProps> = ({userId}) => {
    const propertyModal = usePropertyModal()
    const loginModal = useLoginModal()
    const airbnbYourHome = () => {
        if (userId) {
            propertyModal.open()
        }else{
            loginModal.open()
        }
    }
    return (
        <div className="p-2 cursor-pointer text-sm font-semibold rounded-full hover:bg-gray-200" onClick={airbnbYourHome}>
            DjangoBnb your home
        </div>
    )
}

export default AddPropertyButton