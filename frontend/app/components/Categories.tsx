'use client'

import Image from "next/image"
import { useState } from "react"
import useSearchModal, { SearchQuery } from "../hooks/useSearchModal"

const Categories = () => {
    const searchModel = useSearchModal()
    const [category, setCategory] = useState('')

    const _setCategory = (_category: string) => {
        setCategory(_category)
        const query: SearchQuery = {
            country: searchModel.query.country,
            checkIn: searchModel.query.checkIn,
            checkOut: searchModel.query.checkOut,
            guests: searchModel.query.guests,
            bedrooms: searchModel.query.bedrooms,
            bathrooms: searchModel.query.bathrooms,
            category: _category
        }
        searchModel.setQuery(query)
    }

    return (
        <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
            <div
                onClick={() => _setCategory('')}
                className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:border-gary-200 hover:opacity-100">
                <Image alt="Beach" src="/vacations.png" height={20} width={20} />
                <span className="text-sm">All</span>
            </div>
            <div
                onClick={() => _setCategory('Beach')}
                className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:border-gary-200 hover:opacity-100">
                <Image alt="Beach" src="/vacations.png" height={20} width={20} />
                <span className="text-sm">Beach</span>
            </div>
             <div
                onClick={() => _setCategory('Villas')}
                className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:border-gary-200 hover:opacity-100">
                <Image alt="Beach" src="/vacations.png" height={20} width={20} />
                <span className="text-sm">Villas</span>
            </div>
            <div
                onClick={() => _setCategory('Cabins')}
                className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:border-gary-200 hover:opacity-100">
                <Image alt="Beach" src="/vacations.png" height={20} width={20} />
                <span className="text-sm">Cabins</span>
            </div>
            <div
                onClick={() => _setCategory('Tiny Homes')}
                className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:border-gary-200 hover:opacity-100">
                <Image alt="Beach" src="/vacations.png" height={20} width={20} />
                <span className="text-sm">Tiny Homes</span>
            </div>
        </div>
    )
}

export default Categories