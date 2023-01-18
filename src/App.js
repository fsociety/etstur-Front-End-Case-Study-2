import React, { useEffect, useState } from 'react';
import { faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import Modal from './components/Modal';
import Card from './components/Card';

function App() {
  const [hotels, setHotels] = useState([])
  const [sortBy, setSortBy] = useState(null)
  const [modal, setModal] = useState({})
  const [page, setPage] = useState(1)
  const [numberOfPages, setNumberOfPages] = useState(1);
  const page_size = 5;

  useEffect(() => {
    const getHotels = () => {
      if(localStorage.hotels){
        let items = JSON.parse(localStorage.hotels);
        items.sort((a,b) => {
          switch (sortBy) {
            case 'ascending':
              return a.score - b.score || b.updatedAt - a.updatedAt;
            case 'descending':
              return b.score - a.score || b.updatedAt - a.updatedAt;
            default:
              return b.score - a.score || b.updatedAt - a.updatedAt;
          }
        });
        setNumberOfPages(Math.ceil(items.length / page_size));
        items = items.slice((page - 1) * page_size, page * page_size);
        setHotels(items);
      }
    }
    getHotels();
    window.addEventListener('storage', () => getHotels());
  }, [sortBy, page])

  const deleteItem = (id) => {
    let items = JSON.parse(localStorage.hotels);
    let item = items.find(val => val.id === id);
    setModal({
      active:true,
      hotel: item
    })
  }

  const Pagination = () => {
      let pages = [];
      for (let i = 0; i < numberOfPages; i++) {
        pages.push(<li key={i} onClick={() => setPage(i + 1)} className={i + 1 === page ? 'font-bold' : ''}>{i + 1}</li>);
      }
      return pages;
  }

  return (
    <div className="max-w-xl px-4 py-5 mx-auto">
      <Link to={'/add'} className="flex">
        <div className="flex items-center justify-center w-12 h-12 mr-4 text-xl text-blue-600 border border-blue-600 rounded-md">
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <div className="flex items-center text-xl font-bold">
          <span>OTEL EKLE</span>
        </div>
      </Link>
      <div className='mt-8 max-w-[200px]'>
        <select 
        onChange={e => setSortBy(e.target.value)}
        className='shadow-[0px_2px_31px_-8px_rgba(0,0,0,0.3)] outline-none px-4 py-2 rounded-md border border-slate-100 w-full'>
          <option value="" hidden>Sıralama</option>
          <option value="ascending">Puan (Artan)</option>
          <option value="descending">Puan (Azalan)</option>
        </select>
      </div>

      <div className='grid mt-6 gap-y-4'>
        
        {hotels?.map((data,index) => <Card key={index} data={data} remove={deleteItem} />)}

      </div>

      <div className='mt-8'>
        <ul className='grid grid-flow-col auto-cols-max gap-3 font-normal text-lg text-center w-full justify-center [&>li]:cursor-pointer'>
          <li onClick={() => page > 1 && setPage(page - 1)}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </li>
          <Pagination />
          <li onClick={() => page < numberOfPages && setPage(page + 1)}>
            <FontAwesomeIcon icon={faChevronRight} />
          </li>
        </ul>
      </div>

      <Modal data={{ modal, setModal }} />

    </div>
  );
}

export default App;
