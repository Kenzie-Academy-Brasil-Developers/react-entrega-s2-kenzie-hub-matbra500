import { Button } from "@mui/material";
import { Header, Container, ContainerItens, Card } from "./styles";
import { useState } from "react";
import {IoMdGitNetwork } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import ModifyProjects from "../ModifyProjects";
function ListProjects({ title, color }) {
  const [displayModify2, setDisplayModify2] = useState(false);

  const [projects, setProjects] = useState([]);

  function toggle() {
    setDisplayModify2(!displayModify2);
  }

  function addProject(inputObject) {
    setProjects([...projects, inputObject]);
    toggle();
  }

  function remove(name) {
    const filtered = projects.filter((card) => card.name !== name);
    setProjects(filtered);
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
            state={displayModify2}
            callbackRemove={toggle}
            callback={addProject}
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
              <h2>{project.name}</h2>
              <div>
              <p>{project.description}</p>

              </div>
            </div>
            <button onClick={() => remove(project.name)}>
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
