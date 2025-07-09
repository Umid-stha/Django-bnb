'use client'

import usePropertyModal from "@/app/hooks/usePropertyModal"
import Modal from "./Modal"
import CustomButton from "../form/CustomButton";
import { useState } from "react";
import Categories from "../addProperty/Categories";

const AddPropertyModel = () => {
    const [currentStep, setCurrentStep] = useState(1)
    const propertyModal = usePropertyModal();

    const [dataTitle, setDataTitle] = useState('')
    const [dataDescription, setDataDescription] = useState('')
    const [dataCategory, setDataCategory] = useState('')
    const [dataPrice, setDataPrice] = useState('')
    const [dataBedroom, setDataBedroom] = useState('')
    const [dataBathroom, setDataBathroom] = useState('')
    const [dataGuests, setDataGuests] = useState('')

    const setCategory = (category: string) => {
        setDataCategory(category)
    }
    
    const content = (
        <>
            {currentStep == 1 ? (
                <>
                    <h2 className="mb-6 text-2xl">Choose Category</h2>
                    <Categories dataCategory={dataCategory} setCategory={(category) => setCategory(category)} />
                    <CustomButton label="Next" onClick={() => setCurrentStep(2)} />
                </>
                ) : currentStep == 2 ? (
                    <>
                        <h2 className="mb-6 text-2xl">Describe your place</h2>
                        <div className="pt-3 pb-6 space-y-4">
                            <div className="flex flex-col space-y-2">
                                <label>Title</label>
                                <input
                                    type='text'
                                    value={dataTitle}
                                    onChange={(e) => setDataTitle(e.target.value)}
                                    className="w-full h-[200px] p-4 border border-gray-600 rounded-xl"
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label>Description</label>
                                <textarea
                                    value={dataDescription}
                                    onChange={(e) => setDataDescription(e.target.value)}
                                    className="w-full p-4 border border-gray-600 rounded-xl"
                                >
                                </textarea>
                            </div>
                        </div>
                        <CustomButton label="Previous" className="mb-2 bg-black border-gray-800" onClick={() => setCurrentStep(1)} />
                        <CustomButton label="Next" onClick={() => setCurrentStep(3)} />
                    </>
                ) : currentStep == 3 ? (
                    <>
                        <h2 className="mb-6 text-2xl">Describe your place</h2>
                        <div className="pt-3 pb-6 space-y-4">
                            <div className="flex flex-col space-y-2">
                                <label>Price per night</label>
                                <input
                                    type='number'
                                    value={dataPrice}
                                    onChange={(e) => setDataPrice(e.target.value)}
                                    className="w-full p-4 border border-gray-600 rounded-xl"
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label>Bedrooms</label>
                                <input
                                    type='number'
                                    value={dataBedroom}
                                    onChange={(e) => setDataBedroom(e.target.value)}
                                    className="w-full p-4 border border-gray-600 rounded-xl"
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label>Bathrooms</label>
                                <input
                                    type='number'
                                    value={dataBathroom}
                                    onChange={(e) => setDataBathroom(e.target.value)}
                                    className="w-full p-4 border border-gray-600 rounded-xl"
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label>Maximum number of Guests</label>
                                <input
                                    type='number'
                                    value={dataGuests}
                                    onChange={(e) => setDataGuests(e.target.value)}
                                    className="w-full p-4 border border-gray-600 rounded-xl"
                                />
                            </div>
                        </div>
                        <CustomButton label="Previous" className="mb-2 bg-black border-gray-800" onClick={() => setCurrentStep(2)} />
                        <CustomButton label="Next" onClick={() => setCurrentStep(4)} />
                    </>
                ) : (
                    <></>
            )}
        </>
    )
    return (
        <Modal isOpen={propertyModal.isOpen} close={propertyModal.close} content={content} label="Add Property" />
    )
}

export default AddPropertyModel