import { Button } from "@mui/material";
import { useHistory } from "react-router";
import "./styles.css";
import { Redirect } from "react-router-dom";

function InitialPage(authenticated) {
  const history = useHistory();
  
  return (
    <div className="flex-buttons">
      <div>
        <Button
          onClick={() => history.push("/signup")}
          variant="contained"
          size="large"
        >
          Cadastro
        </Button>
      </div>
      <div>
        <Button
          onClick={() => history.push("/login")}
          variant="contained"
          size="large"
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default InitialPage;
