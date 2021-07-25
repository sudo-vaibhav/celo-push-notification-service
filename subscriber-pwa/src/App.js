import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BottomNavigator from "./components/Layout/BottomNavigator";
import Channels from "./views/Channels";
import Notifications from "./views/Notifications";
import Permissions from "./views/Permissions";
import { ContractKitProvider } from "@celo-tools/use-contractkit";
import "@celo-tools/use-contractkit/lib/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <ContractKitProvider
      dapp={{
        name: "cpns",
        description: "Bringing the web3 out of the stone age",
        url: "https://cpns.web.app",
      }}
    >
      <Router>
        <Switch>
          <Route exact path="/" component={Notifications} />
          <Route path="/permissions" component={Permissions} />
          <Route path="/channels" component={Channels} />
        </Switch>
        <ToastContainer position="bottom-right" />
        <BottomNavigator />
      </Router>
    </ContractKitProvider>
  );
};

export default App;
