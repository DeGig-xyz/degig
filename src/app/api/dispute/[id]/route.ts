import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ApiResponseInterface } from "@/interface";
import { parseError } from "@/utils/parse-error";

export async function GET({ params }: { params: Promise<{ id: string }> }) {
  const {id } = await params;
  try {

    const dispute = await prisma.dispute.findUnique({
      where: { id },
      include: {
        messages: true,
      },
    });

    if (!dispute) {
      throw new Error("Job not found");
    }
    const response: ApiResponseInterface = {
      statusCode: 200,
      message: "dispute fetched successfully",
      data: dispute,
    };
    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponseInterface = {
      statusCode: 500,
      message: parseError(error),
      data: null,
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await props.params;
    const { walletAddress, content } = await request.json();

    const dispute = await prisma.disputeMessage.create({
      data: {
        disputeId: id,
        author: walletAddress,
        content,
      },
      
    });

    if (!dispute) {
      throw new Error("Job not found");
    }
    const response: ApiResponseInterface = {
      statusCode: 200,
      message: "dispute fetched successfully",
      data: dispute,
    };
    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponseInterface = {
      statusCode: 500,
      message: parseError(error),
      data: null,
    };
    return NextResponse.json(response, { status: 500 });
  }
}
