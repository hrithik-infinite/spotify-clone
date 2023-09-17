"use client";

import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

const SupabaseProvider = ({ children }) => {
  const [supabaseClient] = useState(() => createClientComponentClient());

  return React.createElement(SessionContextProvider, { supabaseClient: supabaseClient }, children);
};

export default SupabaseProvider;
