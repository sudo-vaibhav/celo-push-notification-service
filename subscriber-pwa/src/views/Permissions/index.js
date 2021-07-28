import useContract from "../../components/hooks/useContract";
import { useContractKit } from "@celo-tools/use-contractkit";
import { pushSupported } from "../../utils/pushNotification";
import NotSupported from "./NotSupported";
import PermissionsList from "./PermissionsList";
const Permissions = () => {
  const { connect } = useContractKit();
  const { account } = useContract();

  return (
    <div>
      <div className="container">
        <div className="mt-4 flex justify-end">
          <button
            className="btn btn-dark"
            onClick={account ? () => {} : connect}
          >
            {account ? account.slice(0, 10) + "..." : "Not connected"}
          </button>
        </div>
        <h3 className="text-2xl my-4 font-bold">Permissions</h3>
        {pushSupported() ? <PermissionsList /> : <NotSupported />}
      </div>
    </div>
  );
};

export default Permissions;
