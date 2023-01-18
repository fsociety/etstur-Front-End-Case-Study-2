import React from 'react'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Modal({data}) {
    const {modal, setModal} = data;

    const removeItem = () => {
        let hotels = JSON.parse(localStorage.hotels);
        let filtered = hotels.filter(item => item.id !== modal.hotel.id);
        localStorage.hotels = JSON.stringify(filtered);
        window.dispatchEvent(new Event("storage"));
        setModal({active:false});
    }

    return (
        <div className={`${modal?.active ? 'flex' : 'hidden'} fixed top-0 left-0 z-50 items-center justify-center w-screen h-screen bg-black/40`}>
            <div className='relative max-w-sm py-6 bg-white rounded-lg px-7'>
            <button 
                onClick={() => setModal({active:false})}
                className='absolute flex items-center justify-center w-8 h-8 text-xl text-gray-700 bg-gray-200 rounded-full -right-3 -top-3'>
                <FontAwesomeIcon icon={faXmark} />
            </button>
            <h2 className='text-2xl font-semibold'>Oteli Sil</h2>
            <div className='mt-5 text-lg text-center'>
                <p>
                <strong>{modal?.hotel?.name}</strong>'i silmek istediğinizden emin misiniz?
                </p>
            </div>
            <div className='grid mt-6 sm:grid-cols-2 gap-x-3'>
                <button 
                onClick={removeItem}
                className='py-4 text-base font-semibold text-white rounded-lg bg-gradient-to-r from-blue-600 to-blue-500'>
                OTELİ SİL
                </button>
                <button 
                onClick={() => setModal({active:false})}
                className='py-4 text-base font-semibold text-blue-600 rounded-lg outline-blue-600 outline-2 outline bg-gradient-to-r'>
                VAZGEÇ
                </button>
            </div>
            </div>
        </div>
    )
}
