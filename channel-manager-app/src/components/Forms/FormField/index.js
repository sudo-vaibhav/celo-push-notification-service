import imagePickerImage from "./image-picker.svg";
import { Field } from "formik";
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
  options = [],
  setValues,
  values,
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
        ) : type === "radio" ? (
          <div className="flex">
            {options.map((option) => {
              const active = option === values[name];
              return (
                <div
                  key={option}
                  onClick={() => {
                    setValues({ [name]: option });
                  }}
                  className={
                    "py-2 px-4 m-2 cursor-pointer uppercase flex items-center " +
                    (active
                      ? "bg-primary-700"
                      : "border-dark-900 border opacity-60")
                  }
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                    }}
                    className="grid place-items-center bg-light-100 rounded-full mr-2 border border-dark-900"
                  >
                    <div
                      style={{
                        height: 10,
                        width: 10,
                      }}
                      className={
                        "rounded-full " +
                        (active ? "bg-primary-700" : "bg-light-100")
                      }
                    ></div>
                  </div>
                  <div>{option}</div>
                </div>
              );
            })}
          </div>
        ) : null}
        <p
          className="text-primary-900"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
      </div>
    </div>
  );
};

export default FormField;
