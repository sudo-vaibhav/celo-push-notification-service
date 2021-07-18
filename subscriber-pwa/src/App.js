import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BottomNavigator from "./components/Layout/BottomNavigator";
import Channels from "./views/Channels";
import Notifications from "./views/Notifications";
import Permissions from "./views/Permissions";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Notifications} />
        <Route path="/permissions" component={Permissions} />
        <Route path="/channels" component={Channels} />
      </Switch>
      <BottomNavigator />
    </Router>
  );
};

export default App;
