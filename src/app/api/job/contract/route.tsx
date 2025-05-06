import { ApiResponseInterface } from "@/interface";
import { parseError } from "@/utils/parse-error";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const jsonString = JSON.stringify(body, null, 2);
    const file = new File([jsonString], "contract.json", { type: "application/json" });
    const formData = new FormData();
    formData.append("file", file);
    formData.append("network", "public");

    const uploadResponse = await fetch("https://uploads.pinata.cloud/v3/files", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
      body: formData,
    });
    const responseJson = await uploadResponse.json();
    const response: ApiResponseInterface = {
      statusCode: 200,
      message: "File uploaded successfully",
      data: {
        ipfsHash: responseJson.data.cid,
      },
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error uploading to Pinata:", error);
    const errorResponse: ApiResponseInterface = {
      statusCode: 500,
      message: parseError(error),
      data: null,
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
