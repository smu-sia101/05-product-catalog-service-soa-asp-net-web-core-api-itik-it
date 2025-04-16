import React, { useState } from 'react';
import {
    Card, CardContent, Typography, Button,
    Stack, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Box
} from '@mui/material';
import axios from 'axios';

function ProductDisplay({ product, onDelete, onUpdate }) {
    const [editOpen, setEditOpen] = useState(false);
    const [editedProduct, setEditedProduct] = useState({ ...product });

    const handleDelete = () => {
        axios.delete(`https://localhost:7028/api/products/${product.id}`)
            .then(() => {
                if (onDelete) onDelete(product.id);
                if (onUpdate) onUpdate();
            })
            .catch(err => console.error('Delete failed', err));
    };

    const handleEditOpen = () => {
        setEditedProduct({ ...product });
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    const handleEditChange = (e) => {
        setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = () => {
        axios.put(`https://localhost:7028/api/products/${product.id}`, editedProduct)
            .then(() => {
                console.log('Product updated');
                setEditOpen(false);
                if (onUpdate) onUpdate();
            })
            .catch(err => console.error('Update failed', err));
    };

    return (
        <>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ width: '100%', height: 200, overflow: 'hidden' }}>
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </Box>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h5" gutterBottom>{product.name}</Typography>
                    <Typography variant="body1">{product.description}</Typography>
                    <Typography variant="body2" color="text.secondary">Category: {product.category}</Typography>
                    <Typography variant="h6" sx={{ mt: 1 }}>₱{product.price}</Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>Stock: {product.stock}</Typography>
                    <Box sx={{ mt: 'auto' }}>
                        <Stack direction="row" spacing={1}>
                            <Button variant="contained" size="small" onClick={handleEditOpen}>Edit</Button>
                            <Button variant="contained" color="error" size="small" onClick={handleDelete}>Delete</Button>
                        </Stack>
                    </Box>
                </CardContent>
            </Card>

            <Dialog open={editOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent>
                    {["name", "price", "description", "category", "stock", "imageUrl"].map((field, index) => (
                        <TextField
                            key={index}
                            margin="dense"
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            type={field === "price" || field === "stock" ? "number" : "text"}
                            fullWidth
                            variant="standard"
                            name={field}
                            value={editedProduct[field]}
                            onChange={handleEditChange}
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button onClick={handleEditSubmit} variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ProductDisplay;
