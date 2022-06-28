import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import { ContractKitProvider } from "@celo-tools/use-contractkit";
import { ALLOWED_NETWORK, HEADER_MARGIN_TOP } from "./constants";
import Dashboard from "./views/Dashboard";
import Home from "./views/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "@celo-tools/use-contractkit/lib/styles.css";
function App() {
  return (
    <BrowserRouter basename="/channel-manager">
      <ContractKitProvider
        dapp={{
          name: "CPNS Admin Panel",
          description: "panel for managing all your channels",
          url: "https://cpns-dashboard.web.app",
        }}
        networks={[ALLOWED_NETWORK]}
      >
        <Navbar />
        <div
          style={{
            marginTop: HEADER_MARGIN_TOP,
          }}
        >
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
        <ToastContainer position="bottom-right" />
      </ContractKitProvider>
    </BrowserRouter>
  );
}

export default App;
