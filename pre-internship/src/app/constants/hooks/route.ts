import { NextResponse } from "next/server";
import { saveUserToDB } from "@/server/actions/user";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Ensure the webhook event is "user.created"
    if (body.type !== "user.created") {
      return NextResponse.json({ message: "Invalid event type" }, { status: 400 });
    }

    // Extract user details
    const user = {
      id: body.data.id,
      email: body.data.email_addresses[0]?.email_address || "",
      name: body.data.first_name || "Unnamed User",
    };

    // Save user to NeonDB
    await saveUserToDB(user);

    return NextResponse.json({ message: "User saved successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
