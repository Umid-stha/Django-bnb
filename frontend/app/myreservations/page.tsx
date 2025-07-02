import Image from "next/image"
const MyReservationsPage = () => {
    return (
        <div className="max-w-[1500px] pb-6 mx-auto px-6">
            <h1 className="my-6 text-2xl">My Reservation</h1>
            <div className="space-y-4">
                <div className="p-5 mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md rounded-xl border border-gray-300">
                    <div className="col-span-1">
                        <div className="relative overflow-hidden aspect-square rounded-xl">
                            <Image fill src="/beach_1.jpg" className="object-cover hover:scale-110 transition h-full w-full" alt="beach house" />
                        </div>
                    </div>
                    <div className="col-span-1 md:col-span-3 space-y-2">
                        <h2 className="mb-4 text-xl">Property name</h2>
                        <p><strong>Check in date:</strong> 14/02/2025</p> 
                        <p><strong>Check out date:</strong> 16/02/2025</p>

                        <p><strong>Number of nights:</strong> 2</p>

                        <p><strong>Total Price:</strong> $200</p>

                        <div className="cursor-pointer mt-4 bg-airbnb py-4 px-6 hover:bg-airbnb-dark text-white rounded-xl inline-block">Go to property</div>
                    </div>
                </div>
                <div className="p-5 mt-4 grid grid-cols-4 gap-4 shadow-md rounded-xl border border-gray-300">
                    <div className="col-span-1">
                        <div className="relative overflow-hidden aspect-square rounded-xl">
                            <Image fill src="/beach_1.jpg" className="object-cover hover:scale-110 transition h-full w-full" alt="beach house" />
                        </div>
                    </div>
                    <div className="col-span-1 md:col-span-3 space-y-2">
                        <h2 className="mb-4 text-xl">Property name</h2>
                        <p><strong>Check in date:</strong> 14/02/2025</p> 
                        <p><strong>Check out date:</strong> 16/02/2025</p>

                        <p><strong>Number of nights:</strong> 2</p>

                        <p><strong>Total Price:</strong> $200</p>
                        
                        <div className="cursor-pointer mt-4 bg-airbnb py-4 px-6 hover:bg-airbnb-dark text-white rounded-xl inline-block">Go to property</div>
                    </div>
                </div>
            </div>
        </div>
    )}

export default MyReservationsPage