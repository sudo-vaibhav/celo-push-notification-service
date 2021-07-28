import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import FormField from "../../../components/Forms/FormField";
import useContract from "../../../components/hooks/useContract";
import { NoChannels } from "../Channels/ChannelsList";
import { toast } from "react-toastify";
import * as Yup from "yup";

const ContractNotificationsSchema = Yup.object().shape({
  contractAddress: Yup.string()
    .min(42)
    .max(42)
    .required("Contract Address should be mentioned"),
});
const ContractNotifications = () => {
  const { contract, account } = useContract();
  const [myChannels, setMyChannels] = useState([]);
  useEffect(() => {
    (async () => {
      if (contract) {
        const allChannels = (await contract.methods.allChannels().call()).map(
          (c, idx) => ({ id: idx, ...c })
        );
        setMyChannels(allChannels.filter((c) => c.admin === account));
      }
    })();
  }, [contract, account]);
  return (
    <div>
      <div className="container my-4">
        <p className="mb-4">
          Yes, you can also trigger notifications for your users right from
          within the smart contract itself. Learn more about how to do that{" "}
          <a className="link">here</a>
        </p>

        {myChannels.length > 0 ? (
          <Formik
            initialValues={{
              pushAccess: "yes",
              channel: myChannels[0].id.toString() + "-" + myChannels[0].name,
              contractAddress: "",
            }}
            validationSchema={ContractNotificationsSchema}
            onSubmit={(values) => {
              return new Promise(async (resolve) => {
                try {
                  contract.methods
                    .setPushAccess(
                      parseInt(values.channel.split("-")[0]),
                      values.contractAddress,
                      values.pushAccess === "yes" ? true : false
                    )
                    .send({
                      from: account,
                    })
                    .on("receipt", () => {
                      toast.success("Push Access Modified");
                      resolve(true);
                    });
                } catch (e) {
                  console.log(e);
                  toast.error("Could not set push access! Please try again.");
                  resolve(true);
                }
              });
            }}
          >
            {({ values, setValues, isSubmitting, errors, touched }) => {
              return (
                <Form className="grid gap-8">
                  <FormField
                    name="contractAddress"
                    description="address of the smart contract which should be allowed or disallowed to send notifications"
                    error={touched.contractAddress && errors.contractAddress}
                  />
                  <FormField
                    name="channel"
                    label="Channel"
                    type="radio"
                    values={values}
                    description="the channel you want to send notifications to through contract"
                    setValues={setValues}
                    options={myChannels.map(
                      (c) => c.id.toString() + "-" + c.name
                    )}
                  />
                  <FormField
                    name="pushAccess"
                    label="Should be allowed to send notifications to this channel?"
                    type="radio"
                    description="enable or disabled the notification push access"
                    values={values}
                    setValues={setValues}
                    options={["yes", "no"]}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Save"}
                  </button>
                </Form>
              );
            }}
          </Formik>
        ) : (
          <NoChannels />
        )}
      </div>
    </div>
  );
};

export default ContractNotifications;
