import PropertyList from "../components/properties/PropertyList"
import { getUserId } from "../lib/action"

const MyPropertiesPage = async () => {
    const userId = await getUserId()
    return (
        <div className="max-w-[1500px] pb-6 mx-auto px-6">
            <h1 className="my-6 text-2xl">My Properties</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
                <PropertyList landlord_id={userId}/>
            </div>
        </div>
    )
}

export default MyPropertiesPage