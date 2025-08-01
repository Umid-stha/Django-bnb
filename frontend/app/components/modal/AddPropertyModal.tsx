'use client'

import usePropertyModal from "@/app/hooks/usePropertyModal"
import Modal from "./Modal"
import CustomButton from "../form/CustomButton";
import { useState } from "react";
import Categories from "../addProperty/Categories";
import SelectCountry, { SelectCountryValue } from "../form/SelectCountry";
import { ChangeEvent } from "react";

import Image from "next/image";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";

const AddPropertyModel = () => {

    const router = useRouter()

    const [currentStep, setCurrentStep] = useState(1)
    const propertyModal = usePropertyModal();

    const [dataTitle, setDataTitle] = useState('')
    const [dataDescription, setDataDescription] = useState('')
    const [dataCategory, setDataCategory] = useState('')
    const [dataPrice, setDataPrice] = useState('')
    const [dataBedroom, setDataBedroom] = useState('')
    const [dataBathroom, setDataBathroom] = useState('')
    const [dataGuests, setDataGuests] = useState('')
    const [dataCountry, setDataCountry] = useState<SelectCountryValue>()
    const [dataImage, setDataImage] = useState<File | null >(null)
    const [errors, setErrors] = useState<string[]>([])

    const setCategory = (category: string) => {
        setDataCategory(category)
    }

    const setImage = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files.length > 0){
            const tmpImage = event.target.files[0]

            setDataImage(tmpImage)
        }
    }
    
    const submitForm = async () => {
        console.log('submit Form')

        if (
            dataCategory &&
            dataTitle &&
            dataDescription &&
            dataPrice &&
            dataCountry &&
            dataImage
        ) {
            const formData = new FormData()
            formData.append('category', dataCategory)
            formData.append('title', dataTitle)
            formData.append('description', dataDescription)
            formData.append('price_per_night', dataPrice)
            formData.append('bedrooms', dataBedroom)
            formData.append('bathrooms', dataBathroom)
            formData.append('guest', dataGuests)
            formData.append('country', dataCountry.label)
            formData.append('country_code', dataCountry.value)
            formData.append('image', dataImage)
            
            const response = await apiService.post('/api/properties/create/', formData)

            if (response.success){
                console.log('Success :-D')
                propertyModal.close()
                router.push('/?added=true')
            }
            else{
                console.log('Error');
                const tmpErrors : string[] = Object.values(response).map((error: any) => {
                    return error;
                })

                setErrors(tmpErrors)
            }
        }else{
            alert("Please fill in all the fields")
        }
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
                                    className="w-full p-4 border border-gray-600 rounded-xl"
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label>Description</label>
                                <textarea
                                    value={dataDescription}
                                    onChange={(e) => setDataDescription(e.target.value)}
                                    className="w-full h-[200px] p-4 border border-gray-600 rounded-xl"
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
                ) : currentStep == 4 ? (
                    <>
                        <h2 className="mb-6 text-2xl">Location</h2>
                        <div className="pt-3 pb-6 space-y-4">
                            <SelectCountry 
                                onChange={(value) => setDataCountry(value as SelectCountryValue)} 
                                value={dataCountry}
                            />
                        </div>
                        <CustomButton label="Previous" className="mb-2 bg-black border-gray-800" onClick={() => setCurrentStep(2)} />
                        <CustomButton label="Next" onClick={() => setCurrentStep(5)} />
                    </>
                ) : (
                    <>
                        <h2 className="mb-6 text-2xl">Location</h2>
                        <div className="pt-3 pb-6 space-y-4">
                            <div className="py-4 px-5 bg-gray-600 text-white rounded-xl">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e)}
                                />
                            </div>

                            {dataImage && (
                                <div className="w-[200px] h-[150px] relative">
                                    <Image
                                        fill
                                        alt="uploaded-image"
                                        src={URL.createObjectURL(dataImage)}
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                </div>
                            )}
                        </div>
                        {errors.map((error, index) => {
                            return (
                                <div className="p-5 mb-4 bg-airbnb text-white bg-airbnb rounded-xl opcity-80" key={index}>
                                    {error}
                                </div>
                            )
                        })}
                        <CustomButton label="Previous" className="mb-2 bg-black border-gray-800" onClick={() => setCurrentStep(2)} />
                        <CustomButton label="Submit" onClick={submitForm} />
                    </>
            )}
        </>
    )
    return (
        <Modal isOpen={propertyModal.isOpen} close={propertyModal.close} content={content} label="Add Property" />
    )
}

export default AddPropertyModel