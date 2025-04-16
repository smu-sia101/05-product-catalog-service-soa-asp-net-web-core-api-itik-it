// src/components/Product.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductDisplay from "./ProductDisplay";
import Sidebar from './Sidebar';
import './Product.css'; 

function Product() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7028/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="product-container">
            <div className="product-sidebar">
                <Sidebar />
            </div>
            <div className="product-list">
                {products.map(product => (
                    <ProductDisplay key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default Product;
