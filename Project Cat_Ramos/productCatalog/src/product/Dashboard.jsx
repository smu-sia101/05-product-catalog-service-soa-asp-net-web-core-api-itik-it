import React from 'react'
import './Dashboard.css'
import Sidebar from './Sidebar';

function Dashboard() {

  return (
    <div class="main">
         <div class="Side">
            <Sidebar />
         </div>
         <div class="font"><h1>Product Catalog</h1></div>
         
    </div>
  )
}



export default Dashboard