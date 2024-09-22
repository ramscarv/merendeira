import mongoose from "mongoose";
import { Schema } from "mongoose";

const ingredienteSchema = new Schema({
    nomeIngrediente: {
      type: String,
      required: true
    },
    quantidade: {
      type: Number,
      required: true
    }
  });

const nutriMealModelSchema = new mongoose.Schema(
  {

    nome: {
      type: String,
      required: true
    },
    descricao: {
      type: String,
      required: true
    },
    ingredientes: {
      type: [ingredienteSchema],
      required: true
    },
  },
  { timestamps: true }
);

const nutriMealModel = mongoose.models.nutriMealModel || mongoose.model("nutriMealModel", nutriMealModelSchema);

export default nutriMealModel;