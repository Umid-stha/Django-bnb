'use client'

import { useCallback, useEffect, useState } from "react";

interface ModalProps{
    label: string;
    content: React.ReactElement;
    close: () => void;
    isOpen: boolean;
}

const Modal : React.FC<ModalProps> = ({label, content, isOpen, close}) => {
    const [showModal, setShowModal] = useState(isOpen)

    useEffect(() => {
        setShowModal(isOpen)
    }, [isOpen])
    
    const handleClose = useCallback(() => {
        setShowModal(false);

        setTimeout(() => {
            close()
        }, 300)
    }, [close])

    if (!isOpen){
        return null;
    }
    return (
        <div className="flex items-center justify-center h-full w-full z-50 fixed inset-0 bg-black/60 ">
            <div className="relative w-[90%] md:w-[80%] lg:w-[700px] bg-white my-6 rounded-xl h-auto">
                <div className={`translate duration-600 h-full ${showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-10'} opacity-100`}>
                    <div className="w-full h-auto rounded-xl relative flex flex-col bg-white">
                        <header className="h-[60px] flex items-center p-6 rounded-t justify-center relative border-b border-gray-300">
                            <div className="p-3 absolute left-3 hover:bg-gray-300 rounded-full cursor-pointer" onClick={handleClose}>
                                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </div>

                            <div className="text-lg font-bold">{label}</div>
                        </header>
                        <section className="p-6">
                            {content}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal