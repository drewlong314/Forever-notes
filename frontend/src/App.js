import { Route, Switch } from "react-router";
import LoginFormPage from "./components/LoginFormPage";

function App() {
  return (
    <>
      <h1>Hello from App</h1>
      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
