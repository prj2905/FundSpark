import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { amount, campaignId, backerEmail } = await request.json();

    const session = await stripe.checkout.sessions.create({
        mode: "payment",
      customer_email: backerEmail,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Support Campaign: ${campaignId}`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      
      
      success_url: `http://localhost:3000/`,
      cancel_url: `http://localhost:3000/create`,
      metadata: { campaignId },
    });

    return NextResponse.json({ url: session.url });
  } catch (error : unknown) {
    console.error("Stripe Checkout error:", error);
    const errorMessage = (error instanceof Error) ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
