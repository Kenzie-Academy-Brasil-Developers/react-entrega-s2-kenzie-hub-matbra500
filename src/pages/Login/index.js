import * as React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormContainer } from "./styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useHistory } from "react-router-dom";
import {
  Box,
  TextField,
  IconButton,
  FormHelperText,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Button,
} from "@mui/material";
import { Link, Redirect } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

function Login({ authenticated, setAuthenticated }) {
  const formSchema = yup.object().shape({
    email: yup.string().required("E-mail obrigatória").email("E-mail inválida"),
    password: yup.string().required("Senha obrigatória"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const history = useHistory();

  const onSubmitFunction = (data) => {
    reset();
    setValues({
      ...values,
      password: "",
    });
    console.log(data);

    api
      .post("/sessions", data)
      .then((response) => {
        const { token } = response.data;
        const userId = response.data.user.id
        
        console.log(response)
        console.log(response.data.user.id)

        localStorage.setItem("@Kenziehub:token", JSON.stringify(token));
        localStorage.setItem("@Kenziehub:userID", userId)

        setAuthenticated(true);

        return history.push("/dashboard");
      })
      .catch((err) => toast.error("Email ou senha inválidos"));
  };

  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <FormContainer>
      <Box
        onSubmit={handleSubmit(onSubmitFunction)}
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "290px" },
        }}
        noValidate
        autoComplete="on"
      >
        <TextField
          id="outlined-basic"
          label="E-mail"
          variant="outlined"
          {...register("email")}
          error={errors.email?.message}
          helperText={errors.email?.message}
          className="name"
        />

        <FormControl
          error={errors.password?.message ? true : false}
          sx={{ m: 1, width: "25ch" }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            {...register("password")}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <FormHelperText>{errors.password?.message}</FormHelperText>
        </FormControl>

        <Button
          className="button"
          type="submit"
          variant="contained"
          size="large"
        >
          Logar
        </Button>
        <p>
          Não tem uma conta? Faça seu <Link to="/signup">Cadastro</Link>
        </p>
      </Box>
    </FormContainer>
  );
}

export default Login;
