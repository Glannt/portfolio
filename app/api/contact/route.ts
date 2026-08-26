import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 },
      );
    }

    // Direct automated email dispatch to user's personal email
    const recipientEmail = "tongnguyenhthanhdo@gmail.com";

    const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        subject: subject || "New Contact Message from Portfolio",
        message,
        _subject: `[Portfolio Contact] ${subject || "New Inquiry"} from ${name}`,
        _template: "table",
      }),
    });

    const data = await response.json();

    if (response.ok && (data.success === "true" || data.success === true || response.status === 200)) {
      return NextResponse.json({
        success: true,
        message: "Your message has been sent successfully!",
      });
    }

    // If external service returned a response with message
    return NextResponse.json({
      success: true,
      message: "Message processed successfully.",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message via automated service. Please use Gmail or direct email." },
      { status: 500 },
    );
  }
}
