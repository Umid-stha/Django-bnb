'use client'

import { useState, useEffect } from "react"
import {Range} from 'react-date-range'
import apiService from "@/app/services/apiService"
import useLoginModal from "@/app/hooks/useLoginModal"
import { difference } from "next/dist/build/utils"
import { differenceInDays, eachDayOfInterval } from "date-fns"
import DatePicker from "../form/Calender"
import format from "date-fns/format"

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

export type Property = {
    id: string
    guest: number
    price_per_night: number
}

interface ReservationSidebarProps {
    userId: string | null;
    property: Property
}

const ReservationSidebar : React.FC<ReservationSidebarProps> = ({userId, property}) => {
    const loginModal = useLoginModal()
    const [fee, setFee ] = useState(0);
    const [nights, setNights] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)
    const [minDate, setMinDate] = useState<Date>(new Date())
    const [guest, setGuest] = useState<string>('1')
    const [bookedDates, setBookedDates] = useState<Date[]>([])
    const guestRange = Array.from({length: property.guest}, (_, index) => index + 1 )
    
    const performBooking = async () => {
        if (userId){
            if (dateRange.startDate && dateRange.endDate){
                const formData = new FormData()
                formData.append('guests', guest)
                formData.append('start_date', format(dateRange.startDate, 'yyyy-MM-dd'))
                formData.append('end_date', format(dateRange.endDate, 'yyyy-MM-dd'))
                formData.append('number_of_nights', nights.toString())
                formData.append('total_price', totalPrice.toString())

                const response = await apiService.post(`/api/properties/${property.id}/book/`, formData)

                if (response.success) {
                    console.log("booking successful")
                }else{
                    console.log("something went wrong")
                }
            }

        }else{
            loginModal.open()
        }
    }

    const _setDateRange = (selection: any) => {
        const newStartDate = new Date(selection.startDate)
        const newEndDate = new Date(selection.endDate)

        if (newEndDate <= newStartDate){
            newEndDate.setDate(newStartDate.getDate() + 1)
        }

        setDateRange({
            ...dateRange,
            startDate: newStartDate,
            endDate: newEndDate
        })
    }

    const getReservation = async () => {
        const reservationDates = await apiService.get(`/api/properties/${property.id}/reservations/`)
        let dates: Date[] = []

        reservationDates.forEach((reservation: any) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.start_date),
                end: new Date(reservation.end_date),
            })
            dates = [...dates, ...range]
        })

        setBookedDates(dates)
    }

    useEffect(() => {
        getReservation()
        if (dateRange.startDate && dateRange.endDate){
            const dayCount = differenceInDays(
                dateRange.endDate,
                dateRange.startDate
            )

            if (dayCount && property.price_per_night) {
                const _fee = (dayCount * property.price_per_night)/100*5;
                setFee(_fee)
                setTotalPrice((dayCount * property.price_per_night) + _fee)
                setNights(dayCount)
            } else {
                const _fee = property.price_per_night/100*5;
                setFee(_fee)
                setTotalPrice( property.price_per_night + _fee)
                setNights(1)
            }
        }
    }, [dateRange])
    return (
        <aside className="mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow">
            <h2 className="mb-5 text-2xl">$30 per night</h2>

            <DatePicker
                value={dateRange}
                onChange={(value) => _setDateRange(value.selection)}
                bookedDates={bookedDates}
            />
            <div className="mb-6 p-3 border border-gray-400 rounded-xl">
                <label className="block font-bold text-xs mb-2">Guests</label>
                <select 
                    value={guest}
                    onChange={(e) => setGuest(e.target.value)}
                    className="w-full -ml-1 text-xm"
                >
                    {guestRange.map(number => (
                        <option key={number} value={number}>{number}</option>
                    ))}
                </select>
            </div>
            <div onClick={performBooking} className="w-full mb-6 text-center py-6 text-white bg-airbnb rounded-xl cursor-pointer hover:bg-airbnb-dark">Book</div>
            <div className="mb-4 flex justify-between align-center">
                <p>${property.price_per_night} * {nights} nights</p>
                <p>${property.price_per_night * nights}</p>
            </div>
            <div className="mb-4 flex justify-between align-center">
                <p>Djangobnb fee</p>
                <p>${fee}</p>
            </div>
            <hr />
            <div className="mt-4 flex justify-between align-center">
                <p>Total</p>
                <p>${totalPrice}</p>
            </div>
            
        </aside>
    )
}

export default ReservationSidebar