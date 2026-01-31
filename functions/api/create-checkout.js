export async function onRequestPost(context) {
  const { env } = context;

  if (!env.STRIPE_SECRET_KEY) {
    return new Response(
      JSON.stringify({ error: "Stripe key missing" }),
      { status: 500 }
    );
  }

  const body = new URLSearchParams({
    "payment_method_types[]": "card",
    "mode": "payment",
    "line_items[0][price_data][currency]": "usd",
    "line_items[0][price_data][product_data][name]": "Wavie D – Vault Access",
    "line_items[0][price_data][unit_amount]": "2000",
    "line_items[0][quantity]": "1",
    "success_url": "https://officialwavied.com/vault.html?access=granted",
    "cancel_url": "https://officialwavied.com/vault.html"
  });

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body
  });

  const session = await response.json();

  if (!session.url) {
    return new Response(
      JSON.stringify(session),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({ url: session.url }),
    { headers: { "Content-Type": "application/json" } }
  );
}
