import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import Sidebar from './Sidebar';
import './AddProduct.css'; 

function AddProduct({ onAdd }) {
    const [open, setOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        Id: "", 
        Name: '',
        Price: '',
        Description: '',
        Category: '',
        Stock: '',
        ImageUrl: ''
    });
    

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setNewProduct({
            Name: '',
            Price: '',
            Description: '',
            Category: '',
            Stock: '',
            ImageUrl: ''
        });
    };

    const handleChange = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formattedProduct = {
            Id: "", 
            Name: newProduct.Name,
            Price: parseFloat(newProduct.Price),
            Description: newProduct.Description,
            Category: newProduct.Category,
            Stock: parseInt(newProduct.Stock),
            ImageUrl: newProduct.ImageUrl
        };
    
        console.log("Submitting:", formattedProduct);
    
        axios.post('https://localhost:7028/api/products', formattedProduct, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            console.log("Added:", response.data);
            if (onAdd) onAdd(response.data);
            handleClose();
        })
        .catch(error => {
            if (error.response?.data?.errors) {
                console.error("Validation Errors:", error.response.data.errors);
            } else {
                console.error("Add failed:", error.response ? error.response.data : error.message);
            }
        });
    };
    


    return (
        <div className="addproduct-container">
            <div className="addproduct-sidebar">
                <Sidebar />
            </div>
            <div className="addproduct-content">
                <Button variant="contained" onClick={handleClickOpen}>Add New Product</Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add Product</DialogTitle>
                    <DialogContent>
                        {["Name", "Price", "Description", "Category", "Stock", "ImageUrl"].map((field, index) => (
                            <TextField
                                key={index}
                                margin="dense"
                                label={field.charAt(0).toUpperCase() + field.slice(1)}
                                type={field === "price" || field === "stock" ? "number" : "text"}
                                fullWidth
                                variant="standard"
                                name={field}
                                value={newProduct[field]}
                                onChange={handleChange}
                            />
                        ))}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Cancel</Button>
                        <Button onClick={handleSubmit} color="primary">Add Product</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default AddProduct;