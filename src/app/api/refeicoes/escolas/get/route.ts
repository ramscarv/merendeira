import { NextResponse } from "next/server";
import { connect } from "../../../../../../db";
import nutriMealModel from "@/models/refeicoes/nutriMealModel";

export async function GET() {
    try{
        await connect();

        const refeicaoPadrao = await nutriMealModel.find();

        return NextResponse.json(refeicaoPadrao, { status: 200 });
    }catch(error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}