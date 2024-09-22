import mongoose from "mongoose";
import { Schema } from "mongoose";

const ingredienteSchema = new mongoose.Schema(
  {

    genero: {
      type: String,
      required: true
    },
    quantidadeRecebida: {
      type: Number,
      required: true
    },
    validade: {
      type: String,
      required: true
    },
    classificacao: {
      type: String,
      required: true
    },
    school: {
      type: Schema.Types.ObjectId,
      ref: 'schoolModel'
    },
  },
  { timestamps: true }
);

const Ingrediente = mongoose.models.Ingrediente || mongoose.model("Ingrediente", ingredienteSchema);

export default Ingrediente;