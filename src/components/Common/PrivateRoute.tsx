import {
  Route,
  RouteComponentProps,
  RouteProps,
  Redirect,
} from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface Props extends RouteProps {
  component: React.ComponentType<RouteComponentProps>;
}

const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};
export default PrivateRoute;
