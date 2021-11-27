import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import Login from "./features/components/pages/Login";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import PrivateRoute from "./features/router/PrivateRoute";
import Page404 from "./features/components/pages/Page404";

import {
  fetchAsyncGetTokeState,
  fetchAsyncLogin,
} from "./features/components/slices/loginSlice";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* ルーターで遷移先を擬似的に指定 */}
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/diaries" children={<App />} />
          <Route exact path="*" component={Page404} />
        </Switch>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
