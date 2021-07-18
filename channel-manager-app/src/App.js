import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import { ContractKitProvider } from "@celo-tools/use-contractkit";
import { HEADER_MARGIN_TOP } from "./constants";
import Dashboard from "./views/Dashboard";
import Home from "./views/Home";
import "@celo-tools/use-contractkit/lib/styles.css";
function App() {
  return (
    <Router>
      <ContractKitProvider
        dapp={{
          name: "My awesome dApp",
          description: "My awesome description",
          url: "https://example.com",
        }}
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
      </ContractKitProvider>
    </Router>
  );
}

export default App;
