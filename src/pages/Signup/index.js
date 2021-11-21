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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";

const Signup = () => {
  const formSchema = yup.object().shape({
    username: yup
      .string()
      .required("Username obrigatório")
      .matches(/^[aA-zZ\s]+$/, "Somente letras"),
    email: yup.string().required("E-mail obrigatória").email("E-mail inválida"),
    password: yup
      .string()
      .required("Senha obrigatória")
      .matches(
        /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Pelo menos 1 letra maiúscula, 1 número, 1 caractere especial e mínimo 6 digitos"
      ),
    confirmPassword: yup
      .string()
      .required("Confirmação de senha obrigatória")
      .oneOf([yup.ref("password"), null], "As senhas não estão iguais"),
    contact: yup
      .string()
      .required("Celular obrigatório")
      .matches(/^\d{10}[0-9]$/, "Inserir DDD + telefone"),
    course_module: yup.string().required("Módulo obrigatório"),
    bio: yup.string().required("Bio obrigatória"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });
  console.log(errors);

  const [userData, setUserData] = useState({});
  const history = useHistory();

  const onSubmitFunction = (data) => {
    delete data.confirmPassword;
    setUserData(data);
    localStorage.setItem("nomeUsuario", data.username);
    // reset();
    // setValues({
    //   ...values,
    //   password: "",
    // });
    console.log(data);
    console.log(localStorage);
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
          className="name"
          id="outlined-basic"
          label="Nome"
          variant="outlined"
          {...register("username")}
          error={errors.username?.message}
          helperText={errors.username?.message}
        />
        <TextField
          id="outlined-basic"
          label="E-mail"
          variant="outlined"
          {...register("email")}
          error={errors.email?.message}
          helperText={errors.email?.message}
        />
        <TextField
          id="outlined-basic"
          label="Bio"
          variant="outlined"
          {...register("bio")}
          error={errors.bio?.message}
          helperText={errors.bio?.message}
        />
        <TextField
          className="name"
          id="outlined-basic"
          label="Celular"
          variant="outlined"
          {...register("contact")}
          error={errors.cellphone?.message}
          helperText={errors.cellphone?.message}
        />
        <FormControl error={errors.modulo?.message ? true : false}>
          <InputLabel
            {...register("course_module")}
            id="demo-simple-select-label"
          >
            Módulo
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Módulo"
          >
            <MenuItem value={1}>Primeiro</MenuItem>
            <MenuItem value={2}>Segundo</MenuItem>
            <MenuItem value={3}>Terceiro</MenuItem>
            <MenuItem value={4}>Quarto</MenuItem>
          </Select>
          <FormHelperText>{errors.modulo?.message}</FormHelperText>
        </FormControl>
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
          <FormHelperText>
            {errors.password?.message
              ? errors.password.message
              : "Pelo menos 1 letra maiúscula, 1 número, 1 caractere especial e mínimo 6 digitos"}
          </FormHelperText>
        </FormControl>
        <TextField
          type="password"
          id="outlined-basic"
          label="Confirm Password"
          variant="outlined"
          color="primary"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
          helperText={errors.confirmPassword?.message}
        />
        <Button
          className="button"
          type="submit"
          variant="contained"
          size="large"
        >
          Cadastrar
        </Button>
        <p>
          Já tem uma conta? Faça seu <Link to="/login">Login</Link>
        </p>
      </Box>
    </FormContainer>
  );
};

export default Signup;
