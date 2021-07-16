import { Field, Formik } from "formik";
import imagePickerImage from "./image-picker.svg";

const useLabelText = (str) => {
  // adding space between strings
  const result = str.replace(/([A-Z])/g, " $1");

  // converting first character to uppercase and join it to the final string
  const final = result.charAt(0).toUpperCase() + result.slice(1);

  return final; // "My Name"
};

const FormField = ({
  name,
  label = "",
  placeholder = "",
  description = "",
  type = "text",
}) => {
  const titleCasedName = useLabelText(name);
  return (
    <div className="">
      <label className="text-xl ">{label || titleCasedName}</label>
      <div className="grid lg:grid-cols-2 gap-4 pt-4">
        {type === "text" ? (
          <Field
            name={name}
            placeholder={placeholder}
            className="border-b border-primary-700 py-2 w-full"
          />
        ) : type === "file" ? (
          <div className="border border-dashed border-primary-700 rounded-lg p-4 text-center text-primary-700">
            <img
              src={imagePickerImage}
              alt="file-picker"
              className="w-1/4 mx-auto"
            />
            <p>Click here or drop an image</p>
          </div>
        ) : null}
        <p className="text-primary-900">{description}</p>
      </div>
    </div>
  );
};

const AddOrEditChannel = () => {
  return (
    <div>
      <div className="container my-4">
        <Formik
          initialValues={{
            title: "",
          }}
        >
          <div className="grid gap-8">
            <FormField
              name="title"
              placeholder="Ubeswap"
              description="The name that will be shown to the users. Generally this should be the name of your service or company, something which your users are familiar with"
            />
            <FormField
              name="icon"
              type="file"
              description="A square image (min 512x512 pixels). This icon will show on notifications. Your Company logo should go here."
            />
            <FormField
              name="badge"
              type="file"
              description="A square image (min 96x96 pixels). This badge will show when notification is minimized. For example: on Android phones, this badge will appear on notifications bar if notifications panel is not open."
            />
          </div>
        </Formik>
      </div>
    </div>
  );
};

export default AddOrEditChannel;
