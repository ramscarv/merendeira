import { NextRequest, NextResponse } from "next/server";
import schoolModel from "@/models/users/schoolModel"; 
import schoolMealModel from "@/models/refeicoes/schoolMealModel";
import { connect } from "../../../../../db";

export async function GET(request: NextRequest) {
    try {
        await connect();

        // Buscando todas as escolas
        const schools = await schoolModel.find({}, '_id nome').sort({ nome: 1 });

        // Array para armazenar todas as informações de escolas e refeições
        const schoolsWithMeals = [];

        // Iterando sobre cada escola para buscar as refeições associadas
        for (const school of schools) {
            // Buscando as refeições associadas à escola
            const meals = await schoolMealModel.find({ school: school._id });

            // Adicionando as informações da escola e refeições ao array
            schoolsWithMeals.push({
                school: {
                    _id: school._id,
                    nome: school.nome
                },
                meals: meals
            });
        }

        return NextResponse.json({
            message: "Escolas e refeições recuperadas com sucesso",
            data: schoolsWithMeals
        });
    } catch (error) {
        console.error("Erro ao recuperar escolas e refeições:", error);
        return NextResponse.json({ error: "Erro ao recuperar escolas e refeições" }, { status: 500 });
    }
}
