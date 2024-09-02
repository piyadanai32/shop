import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }  // สร้าง timestamps สำหรับ createdAt และ updatedAt
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
