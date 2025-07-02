import Image from "next/image"
import ReservationSidebar from "@/app/components/properties/ReservationSidebar"

const PropertyDetailPage = () => {
    return (
    <div className="max-w-[1500px] pb-6 mx-auto px-6">
        <div className="w-full relative h-[64vh] mb-4 overflow-hidden rounded-xl">
            <Image src="/beach_1.jpg" alt="beach cabin" fill className="object-cover w-full" />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="col-span-3 py-6 pr-6">
                <h1 className="mb-4 text-4xl">Property Name</h1>
                <span className="mb-6 block text-lg text-gray-600">
                    4 guests - 2 bedrooms - 1 bathroom
                </span>
                <hr />
                <div className="py-6 flex items-center space-x-4">
                    <Image src='/profile_pic_1.jpg' alt="Profile"  width={50} height={50} className="rounded-full" />
                    <p><strong>John Doe</strong> is your host</p>
                </div>
                <hr />
                <p className="mt-6 text-lg">
                    Loawodsleoi dfjaofiffk is dshfosa sahfsafosahfklahfie lasf.
                </p>
            </div>
            <ReservationSidebar />
        </div>

    </div>
    )
}

export default PropertyDetailPage 