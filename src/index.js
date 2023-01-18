import React from 'react';
import ReactDOM from 'react-dom/client';
import './app.css';
import App from './App';
import AddHotel from './AddHotel';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function Index() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/add' element={<AddHotel />} />
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);