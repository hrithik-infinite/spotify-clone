const Stripe = require("stripe");
const { NextResponse } = require("next/server");
const { headers } = require("next/headers");

const { stripe } = require("@/libs/stripe");
const { upsertProductRecord, upsertPriceRecord, manageSubscriptionStatusChange } = require("@/libs/supabaseAdmin");

const relevantEvents = new Set([
  "product.created",
  "product.updated",
  "price.created",
  "price.updated",
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export async function POST(request) {
  const body = await request.text();
  const sig = headers().get("Stripe-Signature");

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_LIVE || process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.log(`❌ Error message: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case "product.created":
        case "product.updated":
          await upsertProductRecord(event.data.object);
          break;
        case "price.created":
        case "price.updated":
          await upsertPriceRecord(event.data.object);
          break;
        case "customer.subscription.created":
        case "customer.subscription.updated":
        case "customer.subscription.deleted":
          const subscription = event.data.object;
          await manageSubscriptionStatusChange(subscription.id, subscription.customer, event.type === "customer.subscription.created");
          break;
        case "checkout.session.completed":
          const checkoutSession = event.data.object;
          if (checkoutSession.mode === "subscription") {
            const subscriptionId = checkoutSession.subscription;
            await manageSubscriptionStatusChange(subscriptionId, checkoutSession.customer, true);
          }
          break;
        default:
          throw new Error("Unhandled relevant event!");
      }
    } catch (error) {
      console.log(error);
      return new NextResponse('Webhook error: "Webhook handler failed. View logs."', { status: 400 });
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
