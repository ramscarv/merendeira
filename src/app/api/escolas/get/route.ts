import { NextResponse } from "next/server";
import { connect } from "../../../../../db";
import schoolModel from "@/models/users/schoolModel";

export async function GET() {
    try {
        await connect();

        const escolas = await schoolModel.find();

        return NextResponse.json(escolas, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}