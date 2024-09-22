import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import schoolModel from "@/models/users/schoolModel";
import { connect } from "../../../../../db";


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { profile, cnpj, nome, email, password, solicitation } = reqBody;

        console.log(reqBody);
        
        const userExist = await schoolModel.findOne({cnpj});

        if(userExist) {
            return NextResponse.json({ error: "Escola já cadastrado" }, { status: 400 });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newSchoolUser = new schoolModel({
            profile,
            cnpj,
            nome,
            email,
            password: hashedPassword,
            solicitation
        });

        const savedUser = await newSchoolUser.save();
        console.log(savedUser);

        return NextResponse.json({
            message: "Usuário criado com sucesso",
            success: true,
            savedUser
        });
    } catch (error) {
        return NextResponse.json({ error: "Escola ja cadastrado" }, { status: 500 });
    }
}