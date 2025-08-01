
import {create} from 'zustand';

export type SearchQuery = {
    country: string | undefined
    checkIn: Date | undefined
    checkOut: Date | undefined 
    guests: Number
    bathrooms: Number
    bedrooms: Number
    category: string
}

interface SearchModalSore{
    isOpen: boolean;
    step: string;
    open: (step: string)=> void;
    close: () => void;
    query: SearchQuery
    setQuery:  (query: SearchQuery) => void
}

const useSearchModal = create<SearchModalSore>((set) => ({
    isOpen: false,
    step: "",
    open: (step: string) => set({ isOpen: true, step: step}),
    close: () => set({ isOpen: false}),
    query: {
        country: '',
        checkIn: undefined,
        checkOut: undefined,
        guests: 1,
        bedrooms: 0,
        bathrooms: 0,
        category: ""
    },
    setQuery: (query: SearchQuery) => set({query: query})
}))

export default useSearchModal