import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`/api/products/${id}`);
        const product = response.data;
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setImage(product.image);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.put(`/api/products/${id}`, {
        name,
        price,
        description,
        image,
      });
      
      if (response.status === 200) {
        // เปลี่ยนเส้นทางหรือแสดงข้อความสำเร็จ
        router.push('/products');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      <h1>แก้ไขผลิตภัณฑ์</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">ชื่อผลิตภัณฑ์:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">ราคา:</label>
          <input
            id="price"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">คำอธิบาย:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="image">URL ของภาพ:</label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">อัปเดตผลิตภัณฑ์</button>
      </form>
    </div>
  );
}
