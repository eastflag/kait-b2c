import { Route, Redirect } from "react-router-dom";
import {useSelector} from "react-redux";
import {ROUTES_PATH} from "./index";

const PrivateRoute = (props) => {
  const { component: RouteComponent, ...rest } = props;

  const user = useSelector(state => state.Auth.user);

  return (
    <Route
      {...rest}
      render={routeProps =>
        !!user ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={ROUTES_PATH.Login} />
        )
      }
    />
  );
};


export default PrivateRoute
