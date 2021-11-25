import * as React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormContainer, CancelButton } from "./styles";
import { Box, TextField, Button } from "@mui/material";
import api from "../../services/api";
import toast from "react-hot-toast";
import { FiDelete } from "react-icons/fi";
import { useState, useEffect } from "react";

function ModifyProjects({
  displayModify2,
  setDisplayModify2,
  existing2,
  setExisting2,
  projects,
  setProjects,
}) {
  const token = JSON.parse(localStorage.getItem("@Kenziehub:token"));
  const userId = localStorage.getItem("@Kenziehub:userID");

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

  function toggle() {
    setDisplayModify2(!displayModify2);
  }

  function toggleExisting() {
    toggle();
    setExisting2("");
    reset();
  }

  const onSubmitFunction = (data) => {
    api
      .post(
        "/users/works",
        {
          title: data.name,
          description: data.description,
          deploy_url: `https://${data.name}.com`,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        toast.success("Sucesso ao inserir projeto");
        reset();
        toggle();
        loadProjects()
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao inserir projeto");
      });
  };

  function onSubmitModify(data) {
    api
      .put(
        `users/works/${existing2}`,
        {
          title: data.name,
          description: data.description,
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
        loadProjects();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao modificar projeto");
      });
  }

  function loadProjects() {
    api.get(`users/${userId}`).then((response) => {
      const works = response.data.works;
      setProjects(works);
    });
  }

  if (displayModify2 === true) {
    return (
      <FormContainer>
        <Box
          onSubmit={
            existing2 !== ""
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
