import mongoose from "mongoose";

const produtoSchema = new mongoose.Schema(
  {
    classificacao: {
      type: String,
      required: true
    },
    genero: {
      type: String,
      required: true
    },
    marca: {
      type: String,
    },
    unidade: {
      type: String,
      required: true
    },
    medida: {
        type: String,
    },
  },
  { timestamps: true }
);

const produtoModel = mongoose.models.produtoModel || mongoose.model("produtoModel", produtoSchema);


export default produtoModel;