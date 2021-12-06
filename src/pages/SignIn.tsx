import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { signInStyles } from "../styles/mui/signInStyles";
import useTranslate from "hooks/useTranslate";
import LanguageSwitcher from "components/molecules/LanguageSwitcher";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import GlobalState from "state/GlobalState";
import { useHookstate } from "@hookstate/core";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, Button } from "@mui/material";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { snooze } from "utils/snooze";
import { useUser } from "hooks/useUser";
import ApiService from "utils/api_service/api_service";
import { getDefaultPathForRole } from "utils/get_default_route_for_role";

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

type Inputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const SignInSide: React.FC = () => {
  const isLoading = useHookstate(false);
  const errorSignIn = useHookstate(false);
  const { isLoggedIn, user } = useUser();
  const t = useTranslate();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const schema = yup
    .object({
      //TODO: Uncomment
      email: yup.string(), //.matches(EMAIL_REGEX, t("signIn.invalidEmail")).required(t("signIn.requiredField")),
      password: yup.string().min(6, t("signIn.passwordTooShort")).required(t("signIn.requiredField")),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  useEffect(() => {
    (async () => {
      if (isLoggedIn.get()) {
        await snooze(500);
        isLoading.set(false);
        await snooze(50);
        const defaultPath = getDefaultPathForRole(user.get()?.role);
        history.push(defaultPath || "/");
      }
    })();
  }, [isLoggedIn.get()]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    errorSignIn.set(false);
    try {
      isLoading.set(true);
      const response = await ApiService.post("/api/login", {
        email: data.email,
        password: data.password,
      });
      if (response.data.access_token && response.data.user) {
        GlobalState.signIn(response.data.access_token, response.data.user);
        enqueueSnackbar(t("notification.signedIn"));
        await snooze(800);
        const defaultPath = getDefaultPathForRole(user.get()?.role);
        history.push(defaultPath || "/");
      } else {
        errorSignIn.set(true);
        isLoading.set(false);
      }
    } catch (e) {
      errorSignIn.set(true);
      isLoading.set(false);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={false} sm={false} md={7} sx={signInStyles.grid} />
      <Grid item xs={12} sm={12} md={5} component={Paper} elevation={3} square>
        <Box sx={signInStyles.languageSwitcher}>
          <LanguageSwitcher />
        </Box>
        <Box sx={signInStyles.inputPaper}>
          <Avatar sx={signInStyles.signInIcon}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("signIn.title")}
          </Typography>
          {errorSignIn.get() && (
            <Box sx={signInStyles.errorMessage}>
              <Alert severity="error">{t("signIn.invalidLogin")}</Alert>
            </Box>
          )}
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={signInStyles.form}>
            <TextField
              {...register("email")}
              margin="normal"
              required
              fullWidth
              id="email"
              label={t("signIn.email")}
              autoComplete="email"
              autoFocus
              error={!!errors.email || errorSignIn.get()}
              helperText={errors.email?.message || ""}
            />
            <TextField
              {...register("password")}
              margin="normal"
              required
              fullWidth
              label={t("signIn.password")}
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors.password || errorSignIn.get()}
              helperText={errors.password?.message || ""}
            />
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label={t("signIn.rememberMe")}
              sx={{ width: "99%" }}
              {...register("rememberMe", { setValueAs: (v) => !!v })}
            />
            <Box sx={signInStyles.buttonContainer}>
              <Button variant="text">Register</Button>
              or
              <LoadingButton loading={isLoading.get()} type="submit" variant="contained">
                {t("signIn.title")}
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
