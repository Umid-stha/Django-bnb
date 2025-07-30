'use client';

import { format } from 'date-fns'
import apiService from "@/app/services/apiService";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import PropertyListItem from "./PropertyListItem"
import useSearchModal from "@/app/hooks/useSearchModal";

export type PropertyType = {
    id: string;
    title: string;
    price_per_night: number;
    image_url: string
    is_favorite: boolean
}

interface PropertyListProps {
    landlord_id? : string | null
    favorites?: boolean | null
}

const PropertyList: React.FC<PropertyListProps> = ({landlord_id, favorites}) => {
    const params = useSearchParams()
    const searchModal = useSearchModal()
    const country = searchModal.query.country
    const numGuest = searchModal.query.guests
    const numBathroom = searchModal.query.bathrooms
    const numBedroom = searchModal.query.bedrooms
    const checkIn = searchModal.query.checkIn
    const checkOut = searchModal.query.checkOut
    const category = searchModal.query.category
    const [properties, setProperties] = useState<PropertyType[]>([])
    console.log(searchModal.query)
    const markFavorite = (id: string, is_favorite: boolean) => {
        const tmpProperties = properties.map((property: PropertyType) => {
            if( property.id == id) {
                property.is_favorite = is_favorite

                if (is_favorite) {
                    console.log('added to list of favorited properties')
                } else {
                    console.log('removed from list')
                }
            }

            return property
        })

        setProperties(tmpProperties)
    }
    const getProperties = async () => {
        let url = '/api/properties/';

        if (landlord_id) {
            url += `?landlord_id=${landlord_id}`
        } else if (favorites){
            url += '?is_favorite=true'
        } 
        let urlQuery = '';

        if (country) {
            urlQuery += '&country=' + country
            console.log(country)
        }
        if (numGuest) {
            urlQuery += '&numGuest=' + numGuest
        }
        if (numBathroom) {
            urlQuery += '&numBathroom=' + numBathroom 
        }
        if (numBedroom) {
            urlQuery += '&numBedroom=' + numBedroom 
        }
        if (checkIn) {
            urlQuery += '&checkIn=' + format(checkIn, 'yyyy-MM-dd')
        }
        if (checkOut) {
            urlQuery += '&checkOut=' + format(checkOut, 'yyyy-MM-dd')
        }
        if (category) {
            urlQuery += '&category=' + category
        }

        if (urlQuery.length) {
            console.log('Query', urlQuery)

            urlQuery = '?' + urlQuery.substring(1)

            url += urlQuery
        }

        const tmpProperties = await apiService.get(url)

        setProperties(tmpProperties.data.map((property: PropertyType) => {
            if (tmpProperties.favorites.includes(property.id)){
                property.is_favorite = true
            }else{
                property.is_favorite = false 
            }

            return property
        }))
    }

    useEffect(() => {
        getProperties();
    }, [category, searchModal.query, params])
    
    return (
        <>
            {properties.map((property) => (
                <PropertyListItem 
                    key={property.id}
                    property= {property}
                    markFavorite = {(is_favorite: any) => markFavorite(property.id, is_favorite)}
                />
            ))}
        </>
    )
}

export default PropertyList