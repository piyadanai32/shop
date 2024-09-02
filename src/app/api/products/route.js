import { connectMongoDB } from '../../../lib/mongodb';
import Product from '../../../models/product';
import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';

export async function GET() {
    await connectMongoDB();

    try {
        const products = await Product.find({});
        return NextResponse.json({ success: true, data: products });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}