import Image from "next/image"
import apiService from "../services/apiService"
import Link from "next/link"

const MyReservationsPage = async () => {
    const reservations = await apiService.get('/api/auth/myreservations/')
    return (
        <div className="max-w-[1500px] pb-6 mx-auto px-6">
            <h1 className="my-6 text-2xl">My Reservation</h1>
            <div className="space-y-4">
                {reservations.map((reservation:any) => (
                    <div key={reservation.start_date} className="p-5 mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md rounded-xl border border-gray-300">
                        <div className="col-span-1">
                            <div className="relative overflow-hidden aspect-square rounded-xl">
                                <Image fill src={reservation.property.image_url} className="object-cover hover:scale-110 transition h-full w-full" alt="beach house" />
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-3 space-y-2">
                            <h2 className="mb-4 text-xl">{reservation.property.title}</h2>
                            <p><strong>Check in date:</strong> {reservation.start_date}</p> 
                            <p><strong>Check out date:</strong> {reservation.end_date}</p>

                            <p><strong>Number of nights:</strong> {reservation.number_of_nights}</p>

                            <p><strong>Total Price:</strong> ${reservation.total_price}</p>

                            <Link href={`/properties/${reservation.property.id}`}>
                                <div className="cursor-pointer mt-4 bg-airbnb py-4 px-6 hover:bg-airbnb-dark text-white rounded-xl inline-block">Go to property</div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )}

export default MyReservationsPage