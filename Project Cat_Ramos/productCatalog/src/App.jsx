import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Dashboard from './product/Dashboard';
import AddProduct from "./product/AddProduct";
import Product from "./product/Product"; 

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/productdisplay" element={<Product />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
