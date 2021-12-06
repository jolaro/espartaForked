import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { useHistory } from "react-router";
import SentimentVeryDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentVeryDissatisfiedOutlined";
import { useUser } from "hooks/useUser";
import { getDefaultPathForRole } from "utils/get_default_route_for_role";
import GlobalState from "state/GlobalState";

interface Page404Props {}

const Page404: React.FC<Page404Props> = () => {
  const { isLoggedIn } = useUser();
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn.get()) {
      history.push("/sign-in");
    }
  }, [history, isLoggedIn.get()]);

  const redirectToHomePage = () => {
    // TODO: Handle this more gracefully
    const path = getDefaultPathForRole(GlobalState.user?.role);

    history.push(path || "/sign-in");
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <SentimentVeryDissatisfiedOutlinedIcon sx={{ width: 200, height: 200 }} />
        <Box>
          <Typography component="h1" variant="h1">
            404
          </Typography>
          <Typography component="h3" variant="h4">
            Page not found
          </Typography>
        </Box>
      </Box>
      <Button variant="outlined" onClick={redirectToHomePage} sx={{ mt: 2 }}>
        To home page
      </Button>
    </Box>
  );
};

export default Page404;
