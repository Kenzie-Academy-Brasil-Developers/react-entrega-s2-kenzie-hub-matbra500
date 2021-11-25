import { Button } from "@mui/material";
import { Header, Container, ContainerItens, Card } from "./styles";
import ModifyTecnology from "../ModifyTecnology";
import { useState, useEffect } from "react";
import { GiTechnoHeart } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import api from "../../services/api";

function ListTecnology({ title, color }) {
  const token = JSON.parse(localStorage.getItem("@Kenziehub:token"));
  const userId = localStorage.getItem("@Kenziehub:userID");

  const [displayModify, setDisplayModify] = useState(false);

  const [tecnologies, setTecnologies] = useState([]);
  const [existing, setExisting] = useState('')


  console.log(userId);

  function loadTechs() {
    api.get(`users/${userId}`).then((response) => {
      const techs = response.data.techs;
      setTecnologies(techs);
    });
  }

  useEffect(() => {
    loadTechs();
  }, []);

  function toggle() {
    setDisplayModify(!displayModify);
  }

  function modifyExisting(id){
    toggle()
    setExisting(id)
  }

  function remove(id) {
    const filtered = tecnologies.filter((tech) => tech.id !== id);

    api
      .delete(`/users/techs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        toast.success("Sucesso ao eliminar tecnologia");
        setTecnologies(filtered);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao eliminar tecnologia");
      });
  }

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
            displayModify={displayModify}
            setDisplayModify={setDisplayModify}
            existing={existing}
            setExisting={setExisting}
            tecnologies={tecnologies}
            setTecnologies={setTecnologies}
          />
        </div>
      </Header>
      <ContainerItens>
        {tecnologies.map((tech, index) => {
          return (
            <Card key={index}>
              <div className="card-image">
                <GiTechnoHeart style={{ color: "white", fontSize: "27px" }} />
              </div>
              <div className="card-description">
                <h2 onClick={()=> modifyExisting(tech.id)}>{tech.title}</h2>
                <h4>{tech.status}</h4>
              </div>
              <button onClick={() => remove(tech.id)}>
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
