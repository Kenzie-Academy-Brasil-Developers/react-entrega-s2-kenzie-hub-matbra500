import { Button } from "@mui/material";
import { Header, Container, ContainerItens, Card } from "./styles";
import ModifyTecnology from "../ModifyTecnology";
import { useState } from "react";
import { GiTechnoHeart } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
function ListTecnology({ title, color }) {
  const [displayModify, setDisplayModify] = useState(false);

  const [tecnologies, setTecnologies] = useState([]);

  function toggle() {
    setDisplayModify(!displayModify);
  }

  function addTecnology(inputObject) {
    setTecnologies([...tecnologies, inputObject]);
    toggle();
  }

  function remove(tecnology) {
    const filtered = tecnologies.filter((card) => card.tecnology !== tecnology);
    setTecnologies(filtered);
  }

  console.log(tecnologies);

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
          <ModifyTecnology
            state={displayModify}
            callbackRemove={toggle}
            callback={addTecnology}
          />
        </div>
      </Header>
      <ContainerItens>
      {tecnologies.map((tecnology, index) => {
        return (
          <Card key={index}>
            <div className="card-image">
              <GiTechnoHeart style={{ color: "white", fontSize: "27px" }} />
            </div>
            <div className="card-description">
              <h2>{tecnology.tecnology}</h2>
              <h4>{tecnology.status}</h4>
            </div>
            <button onClick={() => remove(tecnology.tecnology)}>
              <MdDelete />
            </button>
          </Card>
        );
      })}
      </ContainerItens>
    </Container>
  );
}

export default ListTecnology;
