import ListTecnology from "../../components/ListTecnology";
import { ContainerDashboard } from "./styles";
import ListProjects from "../../components/ListProjects";
import { Redirect } from "react-router";
import { Button } from "@mui/material";
import { useHistory } from "react-router";

function Dashboard({ authenticated, setAuthenticated }) {
  const history = useHistory();

  function logout() {
    history.push("/");
    localStorage.removeItem("@Kenziehub:token");
    localStorage.removeItem("@Kenziehub:userID");
    setAuthenticated(false);
  }

  if (!authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <ContainerDashboard>
        <ListTecnology title="Minhas tecnologias" color="secondary" />
        <div className="whitespace"></div>
        <ListProjects title="Meus projetos" color="primary" />
      </ContainerDashboard>
      <div className="logout">
        <Button variant="contained" onClick={() => logout()}>
          Logout
        </Button>
      </div>
    </>
  );
}

export default Dashboard;
