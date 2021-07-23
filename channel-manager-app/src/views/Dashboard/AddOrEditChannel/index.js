import { Formik, Form } from "formik";
import FormField from "../../../components/Forms/FormField";

const AddOrEditChannel = () => {
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
          validate={(values) => {}}
        >
          {({ values, setValues }) => {
            return (
              <Form className="grid gap-8">
                <FormField
                  name="name"
                  placeholder="Ubeswap"
                  description="The name of your channel that will be shown to the users. Generally this should be the name of your service or company, something which your users are familiar with."
                />
                <FormField
                  name="description"
                  description="A brief about what value the channel aims to provide in preferably less than 125 characters."
                />
                <FormField
                  name="iconHash"
                  type="file"
                  values={values}
                  setValues={setValues}
                  description="A square image (min 512x512 pixels). This icon will show on notifications. Your Company logo should go here."
                />
                <FormField
                  name="badgeHash"
                  type="file"
                  values={values}
                  setValues={setValues}
                  description="A square image (min 96x96 pixels). This badge will show when notification is minimized. For example: on Android phones, this badge will appear on notifications bar if notifications panel is not open."
                />
                <button className="btn btn-primary">Save</button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AddOrEditChannel;
