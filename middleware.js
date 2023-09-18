const { createMiddlewareClient } = require("@supabase/auth-helpers-nextjs");
const { NextRequest, NextResponse } = require("next/server");

async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();
  return res;
}

module.exports = { middleware };
