import { useState } from 'react';

const ProductForm = ({ product, onSubmit, buttonText }) => {
    const [formData, setFormData] = useState({
      name: product?.name || '',
      price: product?.price || '',
      brand: product?.brand || '',
      description: product?.description || ''
    });
  
    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Nom du produit" required />
        <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Prix" required />
        <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} placeholder="Marque" required />
        <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" required />
        <button type="submit">{buttonText}</button>
      </form>
    );
  };
  
  export default ProductForm;