import React from 'react';
import { useRouter } from 'next/router';

async function getProduct(id) {
  const response = await fetch(`/api/products/${id}`);
  if (!response.ok) {
    throw new Error('ไม่สามารถดึงข้อมูลผลิตภัณฑ์ได้');
  }
  return response.json();
}

export default async function ProductDetailPage({ params }) {
  const product = await getProduct(params.id);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/products/${params.id}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        router.push('/products');
      } else {
        console.error('ล้มเหลวในการลบผลิตภัณฑ์');
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการลบผลิตภัณฑ์:', error);
    }
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <p>ราคา: ${product.price}</p>
      <p>{product.description}</p>
      <img src={product.image} alt={product.name} />
      <a href={`/products/${product._id}/edit`}>
        <button className="btn btn-primary">แก้ไขผลิตภัณฑ์</button>
      </a>
      <button onClick={handleDelete} className="btn btn-danger">ลบผลิตภัณฑ์</button>
    </div>
  );
}
