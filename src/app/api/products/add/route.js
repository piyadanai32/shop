import { connectMongoDB } from '../../../../lib/mongodb';
import Product from '../../../../models/products';
import { getSession } from 'next-auth/react';

export async function POST(req) {
  await connectMongoDB();
  try {
    const { name, price, description, image } = await req.json();
    const session = await getSession();
    if (session?.user?.role !== 'admin') {
      return new Response('Unauthorized', { status: 403 });
    }

    const product = new Product({ name, price, description, image });
    await product.save();
    return new Response(JSON.stringify(product), { status: 201 });
  } catch (error) {
    console.error('Error adding product:', error);
    return new Response('Failed to add product', { status: 500 });
  }
}
