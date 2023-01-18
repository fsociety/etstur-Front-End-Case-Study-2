import React from 'react'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Card({data, remove}) {
    
    const increase = (id) => {
        let items = JSON.parse(localStorage.hotels);
        let item = items.find(val => val.id === id);
        if(item.score < 10){
          item.score += 1;
          item.updatedAt = Date.now();
          localStorage.hotels = JSON.stringify(items);
          window.dispatchEvent(new Event("storage"));
        }
      }
    
      const decrease = (id) => {
        let items = JSON.parse(localStorage.hotels);
        let item = items.find(val => val.id === id);
        if(item.score > 0){
          item.score -= 1;
          item.updatedAt = Date.now();
          localStorage.hotels = JSON.stringify(items);
          window.dispatchEvent(new Event("storage"));
        }
      }

    return (
    <div className='relative flex p-3 transition-shadow duration-300 border rounded-md shadow-lg hover:shadow-2xl max-sm:items-center max-sm:flex-col border-black/5 group'>
        <button 
        onClick={() => remove(data.id)}
        className='absolute items-center justify-center w-8 h-8 text-xl text-white bg-red-600 rounded-full fadeOut group-hover:fadeIn -right-3 -top-3'>
        <FontAwesomeIcon icon={faXmark} />
        </button>
        <div className='overflow-hidden rounded-md w-36 h-36 shrink-0'>
        <img src="https://picsum.photos/200" alt="" className='object-cover w-full h-full' />
        </div>
        <div className='flex flex-col justify-between w-full px-5 sm:items-start max-sm:mt-3'>
        <div className='w-full'>
            <h1 className='text-2xl font-semibold max-sm:text-center'>{data.name}</h1>
            <div className='text-green-500 bg-gray-100/75 font-semibold mt-2 px-3 py-1 max-sm:mx-auto max-sm:text-center max-w-[175px]'>
            {data.score}
            </div>
        </div>
        <div className='grid grid-cols-2 gap-x-3'>
            <button 
            onClick={() => increase(data.id)}
            className='px-3 py-2 font-semibold text-center text-blue-600 transition-all border-2 border-blue-600 rounded-md hover:bg-blue-500 hover:text-white'>
            PUAN ARTIR
            </button>
            <button 
            onClick={() => decrease(data.id)}
            className='px-3 py-2 font-semibold text-center text-blue-600 transition-all border-2 border-blue-600 rounded-md hover:bg-blue-500 hover:text-white'>
            PUAN ARTIR
            </button>
        </div>
        </div>
    </div>
    )
}
