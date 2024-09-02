import { connectMongoDB } from '../../../lib/mongodb';
import Product from '../../../models/product';

export async function PUT({ params, request }) {
  await connectMongoDB();

  const { id } = params;
  const { name, price, description, image } = await request.json();

  try {
    const product = await Product.findByIdAndUpdate(id, { name, price, description, image }, { new: true });

    if (!product) {
      return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Product updated successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return new Response(JSON.stringify({ error: 'Error updating product' }), { status: 500 });
  }
}

export async function DELETE({ params }) {
  await connectMongoDB();

  const { id } = params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Product deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return new Response(JSON.stringify({ error: 'Error deleting product' }), { status: 500 });
  }
}
