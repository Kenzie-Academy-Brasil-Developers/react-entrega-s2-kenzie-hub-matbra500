import { Button } from "@mui/material";
import { Header, Container, Card } from "./styles";
import Modify from "../Modify";
import { useState } from "react";
import { GiTechnoHeart } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
function List({ title }) {
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
            color="secondary"
            type="button"
          >
            +
          </Button>
          <Modify
            state={displayModify}
            callbackRemove={toggle}
            callback={addTecnology}
          />
        </div>
      </Header>
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
    </Container>
  );
}

export default List;
