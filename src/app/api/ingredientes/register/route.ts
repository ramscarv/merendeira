import { NextRequest, NextResponse } from "next/server";
import Ingrediente from "@/models/ingredientes/ingredientesModel";
import schoolModel from "@/models/users/schoolModel";
import { getDataFromToken } from "../../../../../helpers/getDataFromToken";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        // Obtendo o ID do usuário do token
        const userId = getDataFromToken(request);

        // Buscando a escola associada ao usuário logado
        const schoolObj = await schoolModel.findOne({ _id: userId });
        if (!schoolObj) {
            return NextResponse.json({ error: "Escola não encontrada" }, { status: 400 });
        }

        // Verificando se o reqBody é um array
        if (Array.isArray(reqBody)) {
            // Array para armazenar os IDs dos ingredientes cadastrados
            const ingredientesRegistrados = [];

            // Iterando sobre cada ingrediente no array reqBody
            for (const ingredienteData of reqBody) {
                const { genero, quantidadeRecebida, validade, classificacao } = ingredienteData;
            

        

                // Cria um novo registro de ingrediente associado à escola do usuário logado
                const newIngrediente = new Ingrediente({
                    genero,
                    quantidadeRecebida,
                    validade,
                    classificacao,
                    school: schoolObj._id,
                });

                // Salvando o novo ingrediente no banco de dados
                const ingredienteRegistrado = await newIngrediente.save();
                // Adiciona o ID do ingrediente cadastrado ao array
                ingredientesRegistrados.push(ingredienteRegistrado._id);
            }

            return NextResponse.json({
                message: "Ingredientes cadastrados com sucesso",
                success: true,
                ingredientesRegistrados
            });
        } else {
            // Caso não seja um array e o usuário cadastre um único ingrediente
            const { genero, quantidadeRecebida,   validade, classificacao } = reqBody;


            // Verifica se já existe um ingrediente com o mesmo gênero e validade associado à escola do usuário
            const existingIngredient = await Ingrediente.findOne({
                genero,
                validade
              });
              
              // Se existir um ingrediente com o mesmo gênero e validade, retorne um erro
              if (existingIngredient) {
                return NextResponse.json({ error: "Ingrediente já cadastrado com o mesmo gênero e validade" }, { status: 400 });
              }
    


            // Cria um novo registro de ingrediente associado à escola do usuário logado
            const newIngrediente = new Ingrediente({
                genero,
                quantidadeRecebida,
                validade,
                classificacao,
                school: schoolObj._id,
            });

            // Salva o novo ingrediente no banco de dados
            const ingredienteRegistrado = await newIngrediente.save();

            return NextResponse.json({
                message: "Ingrediente cadastrado com sucesso",
                success: true,
                ingredienteRegistrado
            });
        }
    } catch (error) {
        console.error("Erro ao cadastrar ingredientes:", error);
        return NextResponse.json({ error: "Erro ao cadastrar ingredientes" }, { status: 500 });
    }
}