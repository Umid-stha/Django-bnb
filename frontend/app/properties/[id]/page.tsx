import Image from "next/image"
import Link from "next/link"
import { getUserId } from "@/app/lib/action"
import apiService from "@/app/services/apiService"
import ReservationSidebar from "@/app/components/properties/ReservationSidebar"

const PropertyDetailPage = async ({params}: {params: {id: string}}) => {
    const response = await apiService.get(`/api/properties/${params.id}`)
    const property = response.data
    const userId = await getUserId()
    return (
    <div className="max-w-[1500px] pb-6 mx-auto px-6">
        <div className="w-full relative h-[64vh] mb-4 overflow-hidden rounded-xl">
            <Image src={`${property.image_url}`} alt="beach cabin" fill className="object-cover w-full" />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="col-span-3 py-6 pr-6">
                <h1 className="mb-4 text-4xl">{property.title}</h1>
                <span className="mb-6 block text-lg text-gray-600">
                    {property.guest} guests - {property.bedrooms} bedrooms - {property.bathrooms} bathroom
                </span>
                <hr />
                <Link href={`/landlords/${property.landlord.id}`} className="py-6 flex items-center space-x-4">
                    {property.landlord.avatar_url && (<Image src={`${property.landlord.avatar_url}`} alt="Profile"  width={50} height={50} className="rounded-full" /> )}
                    <p><strong>{property.landlord.name}</strong> is your host</p>
                </Link>
                <hr />
                <p className="mt-6 text-lg">
                    {property.description}
                </p>
            </div>
            <ReservationSidebar userId={userId} property={property} />
        </div>

    </div>
    )
}

export default PropertyDetailPage 