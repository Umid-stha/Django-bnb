'use client'
import useSearchModal, { SearchQuery } from "@/app/hooks/useSearchModal"
import Modal from "./Modal"
import SelectCountry, {SelectCountryValue} from "../form/SelectCountry"
import { useState } from "react"
import CustomButton from "../form/CustomButton"
import { Range } from "react-date-range"
import DatePicker from "../form/Calender"

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

const SearchModal = () => {
    let content = (<></>)
    const searchModal = useSearchModal()
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)
    const [country, setCountry] = useState<SelectCountryValue>()
    const [numGuest, setNumGuest] = useState('1')
    const [numBedroom, setNumBedroom] = useState('0')
    const [numBathroom, setNumBathroom] = useState('0')

    const closeAndSearch = () => {
        const newSearchQuery: SearchQuery = {
            country: country?.label,
            checkIn: dateRange.startDate,
            checkOut: dateRange.endDate,
            guests: parseInt(numGuest),
            bedrooms: parseInt(numBedroom),
            bathrooms: parseInt(numBathroom),
            category: ''
        }
        searchModal.setQuery(newSearchQuery)
        searchModal.close()
    } 

    const _setDateRange = (selection: Range) => {
        if (searchModal.step === 'checkIn') {
            searchModal.open('checkOut')
        } else if ( searchModal.step === 'checkOut') {
            searchModal.open('details')
        }

        setDateRange(selection)
    }

    const contentLocation = (
        <>
            <h2 className="mb-6 text-2xl ">Where do you want to go?</h2>
            
            <SelectCountry 
                value={country}
                onChange={(value) => setCountry(value as SelectCountryValue)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton label='check in date' onClick={() => searchModal.open('checkIn')} />
            </div>
        </>
    )

    const contentCheckIn = (
        <>
            <h2 className="mb-6 text-2xl ">When do you want to check in?</h2>
            
            <DatePicker
                value={dateRange}
                onChange={(value) => _setDateRange(value.selection)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton label="Location"
                    onClick={() => searchModal.open('location')}
                />
                <CustomButton label="check out date"
                    onClick={() => searchModal.open('checkOut')}
                />
            </div>
        </>
    )

    const contentCheckOut = (
        <>
            <h2 className="mb-6 text-2xl ">When do you want to check out?</h2>
        
            <DatePicker
                value={dateRange}
                onChange={(value) => _setDateRange(value.selection)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton label="Check in date"
                    onClick={() => searchModal.open('checkIn')}
                />
                <CustomButton label="details"
                    onClick={() => searchModal.open('details')}
                />
            </div>
        </>
    )

    const contentDetails = (
        <>
            <h2 className="mb-6 text-2xl ">Details</h2>

            <div className="space-y-4" >
                <div className="space-y-4">
                    <label>Number of Guests</label>
                    <input className="w-full h-14 px-4 border border-gray-300 rounded-xl" type="number" min="1" value={numGuest} onChange={(e) => setNumGuest(e.target.value)} />
                </div>
                <div className="space-y-4">
                    <label>Number of Bedrooms</label>
                    <input className="w-full h-14 px-4 border border-gray-300 rounded-xl" type="number" min="1" value={numBedroom} onChange={(e) => setNumBedroom(e.target.value)} />
                </div>
                <div className="space-y-4">
                    <label>Number of Bathrooms</label>
                    <input className="w-full h-14 px-4 border border-gray-300 rounded-xl" type="number" min="1" value={numBathroom} onChange={(e) => setNumBathroom(e.target.value)} />
                </div>
            </div>

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton label="Check out date"
                    onClick={() => searchModal.open('checkOut')}
                />
                <CustomButton label="Search"
                    onClick={() => closeAndSearch() } 
                />
            </div>
        </>
    )


    if (searchModal.step === 'location'){
        content = contentLocation
    } else if (searchModal.step === 'checkIn') {
        content = contentCheckIn
    } else if (searchModal.step === 'checkOut') {
        content = contentCheckOut
    } else if (searchModal.step === 'details') {
        content = contentDetails
    }

    return (
        <Modal
            isOpen={searchModal.isOpen}
            close={searchModal.close}
            label="Search"
            content={content}
        />
    )
}

export default SearchModal