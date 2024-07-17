import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productList from "./ProductList";

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({ name: '', price: '' });

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8080/api/products/${id}`)
                .then(response => response.json())
                .then(data => setProduct(data));
        }
    }, [id]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let isValid = true;

        if (!product.name || !product.price) {
            isValid = false
            alert("Product name and price required.");
        }

        if (isValid) {
            const url = id ? `http://localhost:8080/api/products/${id}` : 'http://localhost:8080/api/products';
            const method = id ? 'PUT' : 'POST';

            fetch(url, {
                method: method,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(product),
            })
                .then(() => navigate('/'));
        }
    };

    const handleBack = () =>{
      navigate('/');
    };


    return (
        <div>
            <h1>{id ? 'Edit Product' : 'Add Product'}</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={product.name} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Price:
                    <input type="text" name="price" value={product.price} onChange={handleChange} />
                </label>
                <br />
                <button onClick={() => handleBack()}>Back</button>
                <button type="submit">{id ? 'Update' : 'Add'}</button>
            </form>
        </div>
    );
};

export default ProductForm;
