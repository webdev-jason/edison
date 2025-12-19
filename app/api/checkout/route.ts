import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with a Secret Key (we will add the real key in the next step)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: Request) {
  try {
    // 1. Get the list of items the user wants to buy
    const body = await request.json();
    const { items } = body;

    // 2. Format the items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects cents (e.g., $10.00 = 1000)
      },
      quantity: item.quantity,
    }));

    // 3. Ask Stripe to create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${request.headers.get("origin")}/success`, // Redirect here if payment works
      cancel_url: `${request.headers.get("origin")}/cart`,    // Redirect here if they cancel
    });

    // 4. Send the secure session URL back to the frontend
    return NextResponse.json({ url: session.url });
    
  } catch (error) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}