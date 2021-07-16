import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import { HEADER_MARGIN_TOP } from "./constants";
import Dashboard from "./views/Dashboard";
import Home from "./views/Home";
function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
