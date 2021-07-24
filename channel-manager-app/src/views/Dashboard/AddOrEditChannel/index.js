import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import FormField from "../../../components/Forms/FormField";
import * as Yup from "yup";
import { useHistory, useParams } from "react-router-dom";
import useContract from "../../../components/hooks/useContract";
import { toast } from "react-toastify";

const ChannelSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  iconHash: Yup.string().min(46).max(46).required("Icon not provided"),
  badgeHash: Yup.string().min(46).max(46).required("Badge not provided"),
});
const AddOrEditChannel = () => {
  const { channel } = useParams();
  const { contract, account } = useContract();
  let history = useHistory();

  // useful in case of a prexisting data for edits
  const [channelInitData, setChannelInitData] = useState({
    name: "",
    description: "",
    iconHash: "",
    badgeHash: "",
  });

  useEffect(() => {
    (async () => {
      if (contract && channel) {
        const channelInfo = await contract.methods.channels(channel).call();
        setChannelInitData({
          name: channelInfo.name,
          description: channelInfo.description,
          iconHash: channelInfo.iconHash,
          badgeHash: channelInfo.badgeHash,
        });
        console.log("channelInfo ", channelInfo);
      }
    })();
  }, [channel, contract]);

  return (
    <div>
      <div className="container my-4">
        {((channel && channelInitData.name) || !channel) && (
          <Formik
            initialValues={channelInitData}
            validationSchema={ChannelSchema}
            onSubmit={(values, { setSubmitting }) => {
              try {
                console.log("contract", contract);
                if (channel) {
                  // already existent channel
                  contract.methods
                    .editChannel(
                      parseInt(channel),
                      values.name,
                      values.description,
                      values.iconHash,
                      values.badgeHash
                    )
                    .send({
                      from: account,
                    })
                    .on("receipt", () => {
                      setSubmitting(false);
                      toast.success("Channel udpated successfully!");
                      history.push("/dashboard");
                    });
                } else {
                  console.log("new channel");
                  // new channel
                  contract.methods
                    .createChannel(
                      values.name,
                      values.description,
                      values.iconHash,
                      values.badgeHash
                    )
                    .send({
                      from: account,
                    })
                    .on("receipt", () => {
                      setSubmitting(false);
                      toast.success("Channel created successfully!");
                      history.push("/dashboard");
                    });
                }
              } catch (e) {
                toast.error("Could not create channel. Please try again.");
                setSubmitting(false);
              }
              console.log("submitting", values);
            }}
          >
            {({
              values,
              setValues,
              errors,
              touched,
              setTouched,
              isSubmitting,
            }) => {
              return (
                <Form className="grid gap-8">
                  <FormField
                    name="name"
                    placeholder="Ubeswap"
                    error={touched.name && errors.name}
                    description="The name of your channel that will be shown to the users. Generally this should be the name of your service or company, something which your users are familiar with."
                  />
                  <FormField
                    name="description"
                    error={touched.description && errors.description}
                    description="A brief about what value the channel aims to provide in preferably less than 125 characters."
                  />
                  <FormField
                    name="iconHash"
                    label="Icon"
                    type="file"
                    error={errors.iconHash}
                    values={values}
                    setValues={setValues}
                    setTouched={setTouched}
                    description="A square image (min 512x512 pixels). This icon will show on notifications. Your Company logo should go here."
                  />
                  <FormField
                    name="badgeHash"
                    label="Badge"
                    type="file"
                    error={errors.badgeHash}
                    values={values}
                    setValues={setValues}
                    setTouched={setTouched}
                    description="A square image (min 96x96 pixels). This badge will show when notification is minimized. For example: on Android phones, this badge will appear on notifications bar if notifications panel is not open."
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
        )}
      </div>
    </div>
  );
};

export default AddOrEditChannel;
