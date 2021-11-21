import * as React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormContainer, CancelButton } from "./styles";
import { Box, TextField, Button } from "@mui/material";

import { FiDelete } from "react-icons/fi";

function ModifyProjects({ callback, callbackRemove, state }) {
  const formSchema = yup.object().shape({
    name: yup.string().required("Insira o nome do projeto"),
    description: yup.string().required("Insira uma descrição do projeto"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

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
            label="Nome do projeto"
            variant="outlined"
            {...register("name")}
            error={errors.name?.message}
            helperText={errors.name?.message}
          />
          <TextField
            id="outlined-multiline-static"
            label="Descrição"
            multiline
            rows={3}
            {...register("description")}
            error={errors.description?.message}
            helperText={errors.description?.message}
          />

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
export default ModifyProjects;
