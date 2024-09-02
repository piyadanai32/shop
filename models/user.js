import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,  // ป้องกันการซ้ำกันของ email
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "user",  // ค่าดีฟอลต์เป็น "user"
        },
    },
    { timestamps: true }  // สร้าง timestamps สำหรับ createdAt และ updatedAt
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
