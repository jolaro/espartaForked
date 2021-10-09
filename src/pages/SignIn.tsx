import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
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

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

type Inputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const SignInSide: React.FC = () => {
  const t = useTranslate();

  const schema = yup
    .object({
      email: yup.string().matches(EMAIL_REGEX, t("signIn.invalidEmail")).required(t("signIn.requiredField")),
      password: yup.string().min(8, t("signIn.passwordTooShort")).required(t("signIn.requiredField")),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} sx={signInStyles.grid} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={3} square>
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
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              {...register("email")}
              margin="normal"
              required
              fullWidth
              id="email"
              label={t("signIn.email")}
              autoComplete="email"
              autoFocus
              error={!!errors.email}
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
              error={!!errors.password}
              helperText={errors.password?.message || ""}
            />
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label={t("signIn.rememberMe")}
              {...register("rememberMe", { setValueAs: (v) => !!v })}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {t("signIn.title")}
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
