import { useEffect } from "react";
import EditTask from "./components/Tasks/EditTask";
import Profile from "./components/Auth/Profile/Profile";
import PrivateRoute from "./components/Common/PrivateRoute";
import { Switch, Route } from "react-router-dom";
import AddTask from "./components/Tasks/AddTask";
import { useDispatch } from "react-redux";
import { fetchProjects, setToken, getIsLoading } from "./store/projects";
import AllTasks from "./components/Tasks/AllTasks";
import EditProject from "./components/Projects/EditProject";
import AddProject from "./components/Projects/AddProject";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { useAuth } from "./contexts/AuthContext";
import Home from "./components/Home/Home";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Dashboard from "./components/Dashboard";
import PageNotFound from "./components/404/PageNotFound";
import { CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { currentUser, getIdToken } = useAuth();
  const isDataLoading = useSelector(getIsLoading());

  useEffect(() => {
    const setTokenAndLoadData = async () => {
      if (currentUser) {
        setToken(await getIdToken());
        dispatch(fetchProjects());
      }
    };

    setTokenAndLoadData();
  }, [dispatch, currentUser, getIdToken]);

  if (currentUser && isDataLoading) {
    return (
      <div id="loader">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <PrivateRoute exact path="/profile" component={Profile} />
      <PrivateRoute
        exact
        path="/projects/:projectId/tasks/new"
        component={AddTask}
      />
      <PrivateRoute exact path="/projects/new" component={AddProject} />
      <PrivateRoute
        exact
        path="/projects/:projectId/tasks/:taskId"
        component={EditTask}
      />
      <PrivateRoute
        exact
        path="/projects/:projectId/tasks"
        component={AllTasks}
      />
      <PrivateRoute
        exact
        path="/projects/:projectId/dashboard"
        component={Dashboard}
      />
      <PrivateRoute exact path="/projects/:projectId" component={EditProject} />
      <Route path="/" component={PageNotFound} />
    </Switch>
  );
}

export default App;
