import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    profile: {
    type: String,
    },
    nome: {
        type: String,
        required: true,
      },
    cpf: {
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
  },
  { timestamps: true }
);

const nutriModel = mongoose.models.nutriModel || mongoose.model("nutriModel", userSchema);

export default nutriModel;