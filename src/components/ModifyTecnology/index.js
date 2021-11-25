import * as React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormContainer, CancelButton } from "./styles";
import {
  Box,
  TextField,
  FormHelperText,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FiDelete } from "react-icons/fi";
import api from "../../services/api";
import toast from "react-hot-toast";

function ModifyTecnology({
  displayModify,
  setDisplayModify,
  existing,
  setExisting,
  tecnologies,
  setTecnologies,
}) {
  const token = JSON.parse(localStorage.getItem("@Kenziehub:token"));
  const userId = localStorage.getItem("@Kenziehub:userID");

  const formSchema = yup.object().shape({
    tecnology: yup.string().required("Insira uma tecnologia").default('Tech'),
    status: yup.string().required("Especifique sua habilidade"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  function toggle() {
    setDisplayModify(!displayModify);
  }

  function toggleExisting() {
    toggle();
    setExisting("");
    reset();
  }

  const onSubmitFunction = (data) => {
    console.log(data.tecnology);

    api
      .post(
        "users/techs",
        {
          title: data.tecnology,
          status: data.status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        toast.success("Sucesso ao cadastrar tecnologia");
        reset();
        toggle();
        loadTechs();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao cadastrar tecnologia");
      });
  };

  function onSubmitModify(data) {
    delete data.tecnology;

    api
      .put(
        `users/techs/${existing}`,
        {
          status: data.status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        toast.success("Sucesso ao modificar projeto");
        reset();
        toggleExisting();
        loadTechs();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao modificar projeto");
      });
  }

  function loadTechs() {
    api.get(`users/${userId}`).then((response) => {
      const techs = response.data.techs;
      setTecnologies(techs);
    });
  }

  if (displayModify === true) {
    return (
      <FormContainer>
        <Box
          onSubmit={
            existing !== ""
              ? handleSubmit(onSubmitModify)
              : handleSubmit(onSubmitFunction)
          }
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "290px" },
          }}
          noValidate
          autoComplete="on"
        >
          <div>
            <CancelButton type="button" onClick={() => toggleExisting()}>
              <FiDelete />
            </CancelButton>
          </div>
          <TextField
            className="name"
            id="outlined-basic"
            label="Inserir tecnologia"
            variant="outlined"
            {...register("tecnology")}
            error={!existing ? errors.tecnology?.message : ""}
            helperText={!existing ? errors.tecnology?.message : ""}
            color="secondary"
            defaultValue={
              existing !== "" ? "Pode modificar somente o status" : ""
            }
            disabled={existing}
          />

          <FormControl error={errors.status?.message}>
            <InputLabel color="secondary" id="demo-simple-select-label">
              Status
            </InputLabel>
            <Select
              {...register("status")}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Status"
              color="secondary"
            >
              <MenuItem value={"Iniciante"}>Iniciante</MenuItem>
              <MenuItem value={"Intermediário"}>Intermediário</MenuItem>
              <MenuItem value={"Avançado"}>Avançado</MenuItem>
            </Select>
            <FormHelperText>{errors.status?.message}</FormHelperText>
          </FormControl>

          <Button
            className="button"
            type="submit"
            variant="contained"
            size="medium"
            color ='secondary'
          >
            Inserir
          </Button>
        </Box>
      </FormContainer>
    );
  } else {
    return null;
  }
}
export default ModifyTecnology;
