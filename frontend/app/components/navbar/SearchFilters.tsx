'use client'
import Image from "next/image"
import useSearchModal from "@/app/hooks/useSearchModal"

const SearchFilter = () => {
    const searchModal = useSearchModal()
    return (
        <div 
            onClick={() => searchModal.open('location')}
            className="h-[64px] flex flex-row items-center justify-between lg:border border-gray-300 rounded-full lg:p-2"
        >
            <div className="hidden lg:block">
                <div className="flex flex-row items-center justify-between">
                    <div className="cursor-pointer px-2 w-[250px] h-[64px] flex flex-col justify-center rounded-full hover:bg-gray-100">
                        <p className="text-xs font-semibold">Where</p>
                        <p className="text-sm">Wanted location</p> 
                    </div>
                    <div className="cursor-pointer h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
                        <p className="text-xs font-semibold">Check in</p>
                        <p className="text-sm">Add Dates</p> 
                    </div>
                     <div className="cursor-pointer px-8 h-[64px] flex flex-col justify-center rounded-full hover:bg-gray-100">
                        <p className="text-xs font-semibold">check out</p>
                        <p className="text-sm">Add Dates</p> 
                    </div>
                    <div className="cursor-pointer px-8 h-[64px] flex flex-col justify-center rounded-full hover:bg-gray-100">
                        <p className="text-xs font-semibold">Who</p>
                        <p className="text-sm">Add Guests</p> 
                    </div>
                </div>
            </div>
            <div className="">
                <div className="cursor-pointer p-4 bg-airbnb hover:bg-airbnb-dark rounded-full text-white">
                    <Image alt="search" src="/search.png" width={16} height={16} />
                </div>
            </div>
        </div>
    )
}

export default SearchFilter