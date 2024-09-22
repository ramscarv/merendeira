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

  const ingredienteAdicionadoSchema = new Schema({
    nomeIngrediente: {
      type: String,
      required: true
    },
    quantidade: {
      type: Number,
      required: true
    }
  });

const schoolMealModelSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true
    },
    turno: {
      type: String,
      required: true
    },
    quantidadeAlunos:{
      type: Number,
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
    ingredientesAdicionados: {
      type: [ingredienteAdicionadoSchema],
    },
    padraoMantido: {
      type: Boolean
    },
    observacao: {
      type: String
    },
    school: {
      type: Schema.Types.ObjectId,
      ref: 'schoolModel'
    },
  },
  { timestamps: true }
);

const schoolMealModel = mongoose.models.schoolMealModel || mongoose.model("schoolMealModel", schoolMealModelSchema);

export default schoolMealModel;