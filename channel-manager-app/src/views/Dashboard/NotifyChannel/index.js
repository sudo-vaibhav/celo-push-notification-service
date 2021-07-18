import { Field, Form, Formik } from "formik";
import FormField from "../../../components/Forms/FormField";

const NotifyChannel = () => {
  return (
    <div>
      <div className="container my-4">
        <Formik
          initialValues={{
            title: "",
            image: "",
            action: "",
            body: "",
            recipientsType: "everyone",
            receipientsString: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ setValues, values }) => {
            return (
              <Form className="grid gap-8">
                <FormField
                  name="title"
                  placeholder="Your loan collateral is being liquidated 🚨"
                  description="The title of the notification."
                />
                <FormField
                  name="action"
                  placeholder="https://app.ubeswap.org/"
                  description="On clicking the notification, the user will be taken to this specified URL, you can also encode information in the URL like <a href='https://en.wikipedia.org/wiki/Query_string' class='link' target='_blank' rel='noreferrer'>this</a>"
                />
                <FormField
                  name="body"
                  placeholder="Your collateral value is down 15%. Deposit more collateral to prevent liquidation"
                  description="This contains extra text to go along with the title to give more context to the user about what's going on."
                />
                <FormField
                  name="image"
                  type="file"
                  description="an OPTIONAL image that will show in your notification on expanding. Example <a class='link' target='_blank' rel='noreferrer' href='https://developer.android.com/training/notify-user/expanded#image-style'>here</a>"
                />
                <FormField
                  name="recipientsType"
                  label="Recipients"
                  type="radio"
                  description="Notify the whole channel or handpick your recipients"
                  options={["everyone", "choose recipients"]}
                  setValues={setValues}
                  values={values}
                />
                {values.recipientsType === "choose recipients" && (
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
