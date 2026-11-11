import { useState, useRef } from 'react';
import Image from 'next/image';
import styles from '@/styles/ProductForm.module.css';
import { parseImageList } from '@/utils/cartImage';
import { replaceProductImages } from '@/lib/productImages';

const ProductForm = ({ product, onSubmit, buttonText }) => {
    const initialImages = parseImageList(product?.filename);
    const [formData, setFormData] = useState({
      name: product?.name || '',
      price: product?.price || '',
      brand: product?.brand || '',
      description: product?.description || '',
      gender: product?.gender || '',
      filename: JSON.stringify(initialImages)
    });
    
    const [previewImages, setPreviewImages] = useState(initialImages);
    const [uploadError, setUploadError] = useState('');
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = async (e) => {
      const files = Array.from(e.target.files || []);
      e.target.value = '';
      setUploadError('');
      setUploading(true);
      try {
        const urls = await replaceProductImages(files, previewImages);
        setPreviewImages(urls);
        setFormData(prev => ({ ...prev, filename: JSON.stringify(urls) }));
      } catch (error) {
        setUploadError(error.message || 'Erreur lors de l\'envoi des images');
      } finally {
        setUploading(false);
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
            disabled={uploading}
          />
          {uploadError && <p>{uploadError}</p>}
          
          <div className={styles.imagePreview}>
            {previewImages.map((filename) => (
              <div key={filename} className={styles.imageContainer}>
                <Image
                  src={filename}
                  alt={formData.name || "Aperçu"}
                  width={100}
                  height={100}
                  style={{ objectFit: 'cover' }}
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