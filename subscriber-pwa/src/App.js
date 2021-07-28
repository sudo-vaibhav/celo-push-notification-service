import "@celo-tools/use-contractkit/lib/styles.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BottomNavigator from "./components/Layout/BottomNavigator";
import Channels from "./views/Channels/";
import Notifications from "./views/Notifications";
import Permissions from "./views/Permissions";
import { ContractKitProvider } from "@celo-tools/use-contractkit";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BOTTOM_NAVIGATOR_MARGIN_BOTTOM } from "./constants";

const App = () => {
  return (
    <ContractKitProvider
      dapp={{
        name: "CPNS",
        description: "Bringing WEB3 out of the stone ages",
        url: "https://celopns.web.app",
      }}
    >
      <Router>
        <div style={{ marginBottom: BOTTOM_NAVIGATOR_MARGIN_BOTTOM }}>
          <Switch>
            <Route exact path="/notifications" component={Notifications} />
            <Route path="/permissions" component={Permissions} />
            <Route path="/channels" component={Channels} />
          </Switch>
        </div>
        <ToastContainer position="bottom-right" />
        <BottomNavigator />
      </Router>
    </ContractKitProvider>
  );
};

export default App;
