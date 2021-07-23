import { Field, Form, Formik } from "formik";
import FormField from "../../../components/Forms/FormField";
import * as Yup from "yup";

const NotifySchema = Yup.object().shape({
  title: Yup.string().required("title of the notification is required."),
  action: Yup.string().url().required("action url is required."),
  body: Yup.string().required("body is required."),
  imageHash: Yup.string().required("image is required."),
  recipientsType: Yup.string().required("recipientsType is required."),
});

const NotifyChannel = () => {
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
            receipientsString: "",
            private: "false",
          }}
          validationSchema={NotifySchema}
          onSubmit={(values) => {
            console.log(values);
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
                  <div>
                    <div>
                      Enter the addresses of people whom you want to notify (one
                      address per line)
                    </div>
                    <Field
                      name="receipientsString"
                      as="textarea"
                      spellCheck={false}
                      className="w-full lg:w-1/2 border border-primary-700 rounded-lg mt-4 p-4"
                    />
                  </div>
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
