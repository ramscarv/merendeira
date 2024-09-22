import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import nutriModel from "@/models/users/nutriModel";
import { connect } from "../../../../../db";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { profile, cpf, nome, email, password } = reqBody;

        console.log(reqBody);
        
        const userExist = await nutriModel.findOne({cpf});

        if(userExist) {
            return NextResponse.json({ error: "Usuário já cadastrado" }, { status: 400 });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newNutriUser = new nutriModel({
            profile,
            cpf,
            nome,
            email,
            password: hashedPassword
        });

        const savedUser = await newNutriUser.save();
        console.log(savedUser);

        return NextResponse.json({
            message: "Usuário criado com sucesso",
            success: true,
            savedUser
        });
    } catch (error) {
        return NextResponse.json({ error: "Usuário ja cadastrado" }, { status: 500 });
    }
}
