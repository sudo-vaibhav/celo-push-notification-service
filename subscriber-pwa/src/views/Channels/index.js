import { Switch, Route } from "react-router-dom";
import ChannelsHome from "./ChannelsHome";
import ChannelView from "./ChannelView";
const Channels = () => {
  return (
    <Switch>
      <Route path="/channels" exact component={ChannelsHome} />
      <Route path="/channels/:channel" component={ChannelView} />
    </Switch>
  );
};

export default Channels;
