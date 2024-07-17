import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/api/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/products/${id}`,{
            method : 'DELETE',
        })
            .then(response => {
                if(!response.ok){
                    throw new Error('Network response was not okay.');
                }
                setProducts(products.filter(product => product.id !== id));
            })
            .catch(error => {
                console.error('Delete error:', error);
                setError(error.toString());
            });
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleAdd = () => {
        navigate('add');
    };

    return (
        <div>
            <h1>Product List</h1>
            <button onClick={() => handleAdd()}>Add Product</button>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - {product.price.toFixed(2)}
                        <button onClick={() => handleEdit(product.id)}>Edit</button>
                        <button onClick={()=> handleDelete(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
