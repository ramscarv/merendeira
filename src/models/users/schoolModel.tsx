import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    profile: {
      type: String,
      required: true, 
    },
    nome: {
        type: String,
        unique: true,
        required: true,
      },
    cnpj: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
    solicitation: {
        type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.schoolModel || mongoose.model("schoolModel", userSchema);