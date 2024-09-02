import React from 'react';
import { connectMongoDB } from '../../../lib/mongodb';
import Product from '../../../models/product';
import { getSession } from 'next-auth/react';

export async function getProducts() {
  await connectMongoDB();
  try {
    const products = await Product.find({});
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();
  const session = await getSession();
  const isAdmin = session?.user?.role === 'admin';

  console.log('Session:', session); // ตรวจสอบว่า session มีข้อมูลหรือไม่
  console.log('isAdmin:', isAdmin); // ตรวจสอบว่า isAdmin ถูกต้องหรือไม่

  return (
    <div>
      <h1>Products</h1>
      {isAdmin && (
        <a href="/products/add">
          <button className="btn btn-primary">Add New Product</button>
        </a>
      )}
      <ul>
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product._id}>
              <a href={`/products/${product._id}`}>{product.name}</a>
            </li>
          ))
        ) : (
          <li>No products available</li>
        )}
      </ul>
    </div>
  );
}
