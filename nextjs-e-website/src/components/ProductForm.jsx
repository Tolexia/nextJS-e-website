import { useState, useRef } from 'react';
import Image from 'next/image';
import styles from '@/styles/ProductForm.module.css';

const ProductForm = ({ product, onSubmit, buttonText }) => {
    const [formData, setFormData] = useState({
      name: product?.name || '',
      price: product?.price || '',
      brand: product?.brand || '',
      description: product?.description || '',
      gender: product?.gender || '',
      filename: product?.filename ? JSON.parse(product.filename) : []
    });
    
    const [previewImages, setPreviewImages] = useState(
      product?.filename ? JSON.parse(product.filename) : []
    );
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = async (e) => {
      const files = Array.from(e.target.files);
      
      // Supprimer les anciennes images si elles existent
      if (previewImages.length > 0) {
        try {
          const response = await fetch('/api/deleteImages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filenames: previewImages })
          });
          if (!response.ok) throw new Error('Erreur lors de la suppression des images');
        } catch (error) {
          console.error('Erreur:', error);
          return;
        }
      }

      // Upload des nouvelles images
      const formData = new FormData();
      files.forEach(file => formData.append('images', file));

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        
        if (!response.ok) throw new Error('Erreur lors de l\'upload');
        
        const { filenames } = await response.json();
        setPreviewImages(filenames);
        setFormData(prev => ({ ...prev, filename: JSON.stringify(filenames) }));
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Nom du produit" required />
        <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Prix" required />
        <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} placeholder="Marque" required />
        <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" required />
        <select name="gender" value={formData.gender} onChange={handleInputChange} required>
          <option value="">Sélectionner un genre</option>
          <option value="homme">Homme</option>
          <option value="femme">Femme</option>
        </select>
        
        <div className={styles.imageSection}>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className={styles.fileInput}
          />
          
          <div className={styles.imagePreview}>
            {previewImages.map((filename, index) => (
              <div key={index} className={styles.imageContainer}>
                <Image
                  src={`/images/${filename}`}
                  alt={`Preview ${index + 1}`}
                  width={100}
                  height={100}
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </div>

        <button type="submit">{buttonText}</button>
      </form>
    );
};

export default ProductForm;