import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request?: NextRequest) => {
    try {
        // Obtém o token JWT dos cookies da solicitação, se fornecida
        const token = request?.cookies.get("token")?.value || '';
        
        // Decodifica o token JWT para extrair os dados necessários
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        
        // Retorna o ID do usuário do token decodificado
        return decodedToken.id;
    } catch (error: any) {
        // Em caso de erro na verificação do token, lança uma exceção com a mensagem de erro
        throw new Error(error.message);
    }
}
