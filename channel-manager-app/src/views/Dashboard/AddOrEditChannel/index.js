import { Formik, Form } from "formik";
import FormField from "../../../components/Forms/FormField";
import * as Yup from "yup";
import { useParams } from "react-router-dom";

const ChannelSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  iconHash: Yup.string().min(46).max(46).required("Icon not provided"),
  badgeHash: Yup.string().min(46).max(46).required("Badge not provided"),
});
const AddOrEditChannel = () => {
  const { channel } = useParams();
  return (
    <div>
      <div className="container my-4">
        <Formik
          initialValues={{
            name: "",
            description: "",
            iconHash: "",
            badgeHash: "",
          }}
          validationSchema={ChannelSchema}
          onSubmit={(values) => {
            if (channel) {
              // already existent channel
            } else {
              // new channel
            }
          }}
        >
          {({ values, setValues, errors, touched, setTouched }) => {
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
                  type="file"
                  error={errors.iconHash}
                  values={values}
                  setValues={setValues}
                  setTouched={setTouched}
                  description="A square image (min 512x512 pixels). This icon will show on notifications. Your Company logo should go here."
                />
                <FormField
                  name="badgeHash"
                  type="file"
                  error={errors.badgeHash}
                  values={values}
                  setValues={setValues}
                  setTouched={setTouched}
                  description="A square image (min 96x96 pixels). This badge will show when notification is minimized. For example: on Android phones, this badge will appear on notifications bar if notifications panel is not open."
                />
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AddOrEditChannel;
