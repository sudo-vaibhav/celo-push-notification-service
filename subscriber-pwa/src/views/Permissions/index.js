const PermissionItem = ({ p }) => {
  return <div className="bg-primary-700 my-2 p-4">{p.text}</div>;
};
const Permissions = () => {
  return (
    <div>
      <div className="container">
        <h3 className="text-2xl mt-4 font-bold">Permissions</h3>
        <p className="my-4">
          Make sure you've given the necessary permissions and installed the
          app/ added to homescreen
        </p>
        {[
          {
            text: "Install the App (Desktop)/ Add to Home Screen (Android)",
          },
          {
            text: "Connect to your celo wallet",
          },
          {
            text: "Allow permission for push notifications",
          },
        ].map((p) => {
          return <PermissionItem p={p} />;
        })}
      </div>
    </div>
  );
};

export default Permissions;
