import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Notes from "./components/Notes";
import Notebooks from "./components/Notebooks";
import SearchPage from "./components/SearchPage";
import NotebookSpecific from "./components/NotebookSpecific";
import SplashPage from "./components/SplashPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path ="/">
            <SplashPage/>
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/notes">
            <Notes />
          </Route>
          <Route exact path="/notebooks">
            <Notebooks />
          </Route>
          <Route path="/search" render={(props) => <SearchPage {...props} />} />
          <Route
            path="/notebook/:id"
            render={(props) => <NotebookSpecific {...props} />}
          />
        </Switch>
      )}
    </>
  );
}

export default App;
