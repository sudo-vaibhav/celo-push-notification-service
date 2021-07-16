import { Switch, Route } from "react-router-dom";
import { MIN_HEIGHT_STRING } from "../../constants";
import Channels from "./Channels";
import SideNav from "./SideNav";
import AddOrEditChannel from "./AddOrEditChannel";
const Dashboard = () => {
  return (
    <div
      className="grid grid-cols-5 md:grid-cols-9 lg:grid-cols-18"
      style={{
        minHeight: MIN_HEIGHT_STRING,
      }}
    >
      <SideNav />
      <div className="lg:col-end-19 md:col-end-10 col-end-6 col-start-2">
        <Switch>
          <Route exact path="/dashboard" component={Channels} />
          <Route
            path="/dashboard/channels/:channel?"
            component={AddOrEditChannel}
          />
          {/* <Route path="/channels" component={Channels} />
              <Route path="/channel/:channelId" component={Channel} />
            <Route path="/channel/:channelId/edit" component={EditChannel} /> */}
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
