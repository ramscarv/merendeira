import { NextResponse } from "next/server";
import { connect } from "../../../../../db";
import ingredienteModel from "@/models/ingredientes/ingredientesModel";

export async function GET() {
    try {
        await connect();

        const ingredients = await ingredienteModel.find();

        return NextResponse.json(ingredients, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
