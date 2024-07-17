import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
//import './App.css'; add some flare to make this pretty...

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/add" element={<ProductForm />} />
                    <Route path="/edit/:id" element={<ProductForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
