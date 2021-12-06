import { useUser } from "hooks/useUser";
import React, { useEffect } from "react";

const Auth: React.FC = () => {
  const { isLoggedIn, user } = useUser();

  useEffect(() => {
    if (isLoggedIn && !user.get()) {
      console.log("WOAH DUDE!");
    }
    console.log(isLoggedIn, user.get());
  }, [isLoggedIn, user]);

  return null;
};

export default Auth;
