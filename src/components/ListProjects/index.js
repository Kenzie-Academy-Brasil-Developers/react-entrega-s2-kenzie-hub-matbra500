import { Button } from "@mui/material";
import { Header, Container, ContainerItens, Card } from "./styles";
import { useState, useEffect } from "react";
import { IoMdGitNetwork } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import ModifyProjects from "../ModifyProjects";
import api from "../../services/api";
import toast from "react-hot-toast";

function ListProjects({ title, color }) {
  const token = JSON.parse(localStorage.getItem("@Kenziehub:token"));

  const userId = localStorage.getItem("@Kenziehub:userID");

  const [displayModify2, setDisplayModify2] = useState(false);

  const [existing2, setExisting2] = useState("");

  const [projects, setProjects] = useState([]);

  function loadProjects() {
    api.get(`users/${userId}`).then((response) => {
      const works = response.data.works;
      setProjects(works);
    });
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function toggle() {
    setDisplayModify2(!displayModify2);
  }

  function modifyExisting(id) {
    toggle();
    setExisting2(id);
  }

  function remove(id) {
    const filtered = projects.filter((work) => work.id !== id);

    api
      .delete(`/users/works/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        toast.success("Sucesso ao eliminar projeto");
        setProjects(filtered);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao eliminar projeto");
      });
  }

  console.log(projects);

  return (
    <Container>
      <Header>
        <div className="list-title">
          <h3>{title}</h3>
        </div>
        <div className="list-button">
          <Button
            onClick={() => toggle()}
            size="small"
            variant="contained"
            color={color}
            type="button"
          >
            +
          </Button>
          <ModifyProjects
            displayModify2={displayModify2}
            setDisplayModify2={setDisplayModify2}
            existing2={existing2}
            setExisting2={setExisting2}
            projects={projects}
            setProjects={setProjects}
          />
        </div>
      </Header>
      <ContainerItens>
        {projects.map((project, index) => {
          return (
            <Card key={index}>
              <div className="card-image">
                <IoMdGitNetwork style={{ color: "white", fontSize: "27px" }} />
              </div>
              <div className="card-description">
                <h2 onClick={() => modifyExisting(project.id)}>
                  {project.title}
                </h2>
                <div>
                  <p>{project.description}</p>
                </div>
              </div>
              <button onClick={() => remove(project.id)}>
                <MdDelete />
              </button>
            </Card>
          );
        })}
      </ContainerItens>
    </Container>
  );
}

export default ListProjects;
