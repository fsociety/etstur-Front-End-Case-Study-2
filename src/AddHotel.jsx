import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faAngleLeft, faCheck } from '@fortawesome/free-solid-svg-icons'

export default function AddHotel() {
    const [name, setName] = useState('');
    const [success, setSuccess] = useState(false);

    const handleForm = (e) => {
        e.preventDefault();
        if(name !== ""){
            let hotels = localStorage.hotels ? JSON.parse(localStorage.hotels) : [];
            hotels = [
                { id: Date.now(),name: name, score: 0, updatedAt: Date.now() },
                ...hotels
            ];
            localStorage.hotels = JSON.stringify(hotels);
            setSuccess(true);

            setTimeout(() => setSuccess(false), 1500);
        }
    }


    return (
        <div className='max-w-xl px-4 py-5 mx-auto'>
            <Link to={'/'} className='flex'>
                <div className="flex items-center justify-center w-12 h-12 mr-4 text-xl text-blue-600 border border-blue-600 rounded-md">
                    <FontAwesomeIcon icon={faAngleLeft} />
                </div>
                <div className="flex items-center text-xl font-bold">
                    <span>ANASAYFA</span>
                </div>
            </Link>
            
            <div className='mt-4'>
                <form 
                onSubmit={handleForm}
                className='flex flex-col items-start max-w-xs'>
                    <label htmlFor="name" className='text-lg font-medium'>Otel Adı</label>
                    <input type="text" id='name' onChange={e => setName(e.target.value)} className='w-full h-16 px-6 mt-2 border-2 rounded-md outline-none border-gray-500/25' />
                    <button 
                    type='submit'  
                    className={`inline-flex justify-center duration-300 items-center h-14 px-5 min-w-[120px] transition-all text-lg mt-2 ml-auto font-medium text-white rounded-lg bg-gradient-to-r ${success ? 'from-green-500 to-green-400' : 'from-blue-600 to-blue-500'}`}>
                        {success ? (
                            <>
                            <FontAwesomeIcon icon={faCheck} size='2x' className='mr-3' />
                            <span>EKLENDİ</span>
                            </>
                        ) : 'EKLE'}
                    </button>
                </form>
            </div>
        </div>
    )
}
