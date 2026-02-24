import mongoose from "mongoose";
import mongooseAutoIncrement from "mongoose-sequence";
import bcrypt from "bcryptjs";


const AutoIncrement = mongooseAutoIncrement(mongoose);


const userSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true }, // Auto-incremented ID
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    idNumber: { type: String, unique: true },
    mobileNumber: { type: String },
    role: {
      type: String,
      enum: ["buyer", "seller", "admin"],
      default: "buyer",
    },
  },
  { timestamps: true }
);

// Apply AutoIncrement plugin
userSchema.plugin(AutoIncrement, { inc_field: "id" });

// Pre-save middleware to hash password
userSchema.pre("save", async function (next) {
  // Only hash the password if it's new or modified
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword ,this.password);
}

// Create and export the User model
const User = mongoose.model("User", userSchema);

export default User;
