import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['creator', 'backer'], },

    forgotPasswordToken: { type: String, default: null },
    forgotPasswordExpiry: { type: Date, default: null },
})

const User = mongoose.models.users || mongoose.model('users', userSchema);  

export default User;
