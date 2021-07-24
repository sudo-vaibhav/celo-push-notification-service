import { Form, Formik } from "formik";
import FormField from "../../../components/Forms/FormField";
import * as Yup from "yup";
import useContract from "../../../components/hooks/useContract";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { MAX_ENCRYPTED_FIELD_SIZE } from "../../../constants";
const NotifySchema = Yup.object().shape({
  title: Yup.string().required("title of the notification is required."),
  action: Yup.string().url().required("action url is required."),
  body: Yup.string().required("body is required."),
  imageHash: Yup.string().required("image is required."),
  recipientsType: Yup.string().required("recipientsType is required."),
});

const NotifyChannel = () => {
  const { contract, account } = useContract();
  const { channel } = useParams<{ channel: string }>();
  return (
    <div>
      <div className="container my-4">
        <Formik
          initialValues={{
            title: "",
            imageHash: "",
            action: "",
            body: "",
            recipientsType: "everyone",
            recipient: "",
            private: "no",
          }}
          validationSchema={NotifySchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            let channelId = parseInt(channel);

            try {
              if (values.recipientsType === "everyone") {
                // broadcast to everyone
                contract!.methods
                  .notifyAllInChannel(
                    channelId,
                    values.title,
                    values.action,
                    values.body,
                    values.imageHash
                  )
                  .send({
                    from: account,
                  })
                  .on("receipt", () => {
                    setSubmitting(false);
                    toast.success("Notification(s) queued");
                  });
              } else {
                // one person
                const privateNotification = values.private === "yes";

                // if notification is private it has to be encrypted first
                if (privateNotification) {
                  contract!.methods
                    .publicKeys(values.recipient)
                    .call()
                    .then((publicKey: string) => {
                      if (publicKey) {
                        const encryptedFields = {};
                      } else {
                        throw new Error(
                          "Public Key not published by recipient"
                        );
                      }
                    });
                }
                contract!.methods
                  .notifyOneInChannel(
                    values.recipient,
                    channelId,
                    values.title,
                    values.action,
                    values.body,
                    values.imageHash,
                    privateNotification
                  )
                  .send({
                    from: account,
                  })
                  .on("receipt", () => {
                    setSubmitting(false);
                    toast.success("Notification(s) queued");
                  });
              }
            } catch (e) {
              toast.error("Could not send notification(s)! Please try again.");
              setSubmitting(false);
            }
          }}
        >
          {({ setValues, values, errors, touched, setTouched }) => {
            return (
              <Form className="grid gap-8">
                <FormField
                  name="title"
                  placeholder="Your loan collateral is being liquidated!"
                  error={touched.title && errors.title}
                  description="The title of the notification."
                />
                <FormField
                  name="action"
                  placeholder="https://app.ubeswap.org/"
                  error={touched.action && errors.action}
                  description="On clicking the notification, the user will be taken to this specified URL, you can also encode information in the URL like <a href='https://en.wikipedia.org/wiki/Query_string' class='link' target='_blank' rel='noreferrer'>this</a>"
                />
                <FormField
                  name="body"
                  placeholder="Your collateral value is down 15%. Deposit more collateral to prevent liquidation"
                  error={touched.body && errors.body}
                  description="This contains extra text to go along with the title to give more context to the user about what's going on."
                />
                <FormField
                  name="imageHash"
                  label="Image"
                  type="file"
                  error={errors.imageHash}
                  values={values}
                  setValues={setValues}
                  setTouched={setTouched}
                  description="an OPTIONAL image that will show in your notification on expanding. Example <a class='link' target='_blank' rel='noreferrer' href='https://developer.android.com/training/notify-user/expanded#image-style'>here</a>"
                />
                <FormField
                  name="recipientsType"
                  label="Recipients"
                  type="radio"
                  description="Notify the whole channel or handpick your recipients"
                  options={["everyone", "one subscriber"]}
                  setValues={setValues}
                  values={values}
                />
                {values.recipientsType === "one subscriber" && (
                  <>
                    <FormField
                      name="recipient"
                      label="Enter the addresses of subscriber whom you want to notify"
                    />
                    <FormField
                      name="private"
                      label="Send Privately?"
                      type="radio"
                      description="For private notification to work, recipient must have a published public key on chain"
                      options={["yes", "no"]}
                      setValues={setValues}
                      values={values}
                    />
                  </>
                )}
                <button className="btn btn-primary">
                  send notification(s)
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default NotifyChannel;
