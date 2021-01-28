import { Route, Redirect } from "react-router-dom";
import {useSelector} from "react-redux";
import {ROUTES_PATH} from "./index";
import {jwtUtils} from "../utils/jwtUtils";

const PrivateRoute = (props) => {
  const { component: RouteComponent, ...rest } = props;

  const token = useSelector(state => state.Auth.token);

  return (
    <Route
      {...rest}
      render={routeProps =>
        jwtUtils.isAuth(token) ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={ROUTES_PATH.Login} />
        )
      }
    />
  );
};


export default PrivateRoute
