import { NextRequest, NextResponse } from "next/server";
import schoolModel from "@/models/users/schoolModel"; 
import schoolMealModel from "@/models/refeicoes/schoolMealModel";
import { getDataFromToken } from "../../../../../helpers/getDataFromToken";
import { connect } from "../../../../../db";

export async function GET(request: NextRequest) {
    try {
        await connect();

        // Obtendo o ID do usuário do token
        const userId = await getDataFromToken(request);

        // Buscando a escola associada ao usuário logado
        const userSchool = await schoolModel.findOne({ _id: userId });

        if (!userSchool) {
            console.error("Escola não encontrada para o usuário:", userId);
            return NextResponse.json({ error: "Escola não encontrada" }, { status: 400 });
        }

        // Buscando as refeições associadas à escola do usuário logado
        const meals = await schoolMealModel.find({ school: userSchool._id });

        return NextResponse.json({
            message: "Refeições recuperadas com sucesso",
            data: meals
        });
    } catch (error) {
        console.error("Erro ao recuperar refeições:", error);
        return NextResponse.json({ error: "Erro ao recuperar refeições" }, { status: 500 });
    }
}