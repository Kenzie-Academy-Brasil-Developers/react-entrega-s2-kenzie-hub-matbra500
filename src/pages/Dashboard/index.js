import ListTecnology from "../../components/ListTecnology";
import { ContainerDashboard } from "./styles";
import ListProjects from "../../components/ListProjects";
import { Redirect } from "react-router";


function Dashboard({ authenticated }) {
  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <ContainerDashboard>
      <ListTecnology title="Minhas tecnologias" color="secondary" />
      <div className="whitespace"></div>
      <ListProjects title="Meus projetos" color="primary" />
    </ContainerDashboard>
  );
}

export default Dashboard;
