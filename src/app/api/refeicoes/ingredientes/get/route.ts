import { NextResponse } from "next/server";
import { connect } from "../../../../../../db";
import nutriMealModel from "@/models/refeicoes/nutriMealModel";

export async function GET() {
    try {
        await connect();

        const meals = await nutriMealModel.find();
        const ingredients = meals.reduce((acc, meal) => acc.concat(meal.ingredientes), []);
        

        return NextResponse.json(ingredients, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}