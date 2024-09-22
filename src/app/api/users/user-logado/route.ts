import { getDataFromToken } from "../../../../../helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import nutriModel from "@/models/users/nutriModel";
import schoolModel from "@/models/users/schoolModel";

// Mapa de perfis para modelos de usuário
const profileToModelMap: { [key: string]: any } = {
    nutricionista: nutriModel,
    escola: schoolModel,
};

export async function GET(request: NextRequest) {
    try {
        // Obtemos o ID do usuário a partir do token
        const userId = await getDataFromToken(request);

        // Obtemos o perfil do usuário do sessionStorage
        const userProfile = sessionStorage.getItem("perfil");

        // Verifica se o userProfile é null ou undefined antes de acessar a propriedade
        if (userProfile !== null && userProfile !== undefined) {
            // Verificamos se o perfil do usuário existe no mapa
            const userModel = profileToModelMap[userProfile];

            if (!userModel) {
                return NextResponse.json({ error: "Perfil inválido" }, { status: 400 });
            }

            // Usamos o modelo de usuário correspondente para buscar as informações do usuário
            const userInfo = await userModel.findById(userId).select("-password");

            return NextResponse.json({
                message: "User found",
                data: userInfo
            });
        } else {
            // Trate o caso em que o userProfile é null ou undefined
            return NextResponse.json({ error: "Perfil do usuário não encontrado" }, { status: 400 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}