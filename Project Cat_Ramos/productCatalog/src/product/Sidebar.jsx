// src/components/Sidebar.jsx
import React from 'react';
import './Sidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';

function Sidebar() {
    return (
        <div className="sid">
            <nav>
                <div className="tab">
                    <HomeIcon /><a href="/">Home</a>
                </div>
                <div className="tab">
                    <InfoIcon /><a href="/addproduct">Add Product</a>
                </div>
                <div className="tab">
                    <InfoIcon /><a href="/productdisplay">Product Display</a>
                </div>
            </nav>
        </div>
    );
}

export default Sidebar;
