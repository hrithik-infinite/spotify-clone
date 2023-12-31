import React, { useEffect, useState, createContext, useContext } from "react";
import { useUser as useSupaUser, useSessionContext, User } from "@supabase/auth-helpers-react";
import { UserDetails, Subscription } from "@/types";

const UserContext = createContext(undefined);

const MyUserContextProvider = (props) => {
  const { session, isLoading: isLoadingUser, supabaseClient: supabase } = useSessionContext();
  const user = useSupaUser();

  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsloadingData] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [subscription, setSubscription] = useState(null);

  const getUserDetails = () => supabase.from("users").select("*").single();
  const getSubscription = () => supabase.from("subscriptions").select("*, prices(*, products(*))").in("status", ["trialing", "active"]).single();
  // const getSubscription = () => supabase.from("subscriptions").select("*, prices(*, products(*))").single();
  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsloadingData(true);
      Promise.allSettled([getUserDetails(), getSubscription()]).then((results) => {
        const userDetailsPromise = results[0];
        const subscriptionPromise = results[1];
        if (userDetailsPromise.status === "fulfilled") setUserDetails(userDetailsPromise.value.data);

        if (subscriptionPromise.status === "fulfilled") setSubscription(subscriptionPromise.value.data);

        setIsloadingData(false);
      });
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  };

  return React.createElement(UserContext.Provider, { value, ...props });
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};

export { MyUserContextProvider, useUser };
