import * as React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormContainer, CancelButton } from "./styles";
import { useHistory } from "react-router-dom";
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

function Modify({ callback, callbackRemove, state }) {
  const formSchema = yup.object().shape({
    tecnology: yup.string().required("Insira uma tecnologia"),
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

  const history = useHistory();

  const onSubmitFunction = (data) => {
    callback(data);
    reset();
  };

  if (state === true) {
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
          <div>
            <CancelButton type="button" onClick={() => callbackRemove()}>
              <FiDelete />
            </CancelButton>
          </div>
          <TextField
            className="name"
            id="outlined-basic"
            label="Inserir tecnologia"
            variant="outlined"
            {...register("tecnology")}
            error={errors.tecnology?.message}
            helperText={errors.tecnology?.message}
          />

          <FormControl error={errors.status?.message}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              {...register("status")}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Status"
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
export default Modify;
