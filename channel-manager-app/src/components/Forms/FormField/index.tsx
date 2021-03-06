import { Field } from "formik";
import FilePicker from "./FilePicker";
const useLabelText = (str: string) => {
  // adding space between strings
  const result = str.replace(/([A-Z])/g, " $1");

  // converting first character to uppercase and join it to the final string
  const final = result.charAt(0).toUpperCase() + result.slice(1);

  return final; // "My Name"
};

const FormField = ({
  name,
  label = "",
  as = "text",
  spellCheck = false,
  placeholder = "",
  description = "",
  type = "text",
  options = [],
  setValues,
  setTouched,
  error,
  values,
}: {
  name: string;
  label?: string;
  as?: string;
  spellCheck?: boolean;
  placeholder?: string;
  description?: string;
  type?: string;
  options?: any[];
  setValues?: any;
  setTouched?: any;
  error?: string | false;
  values?: any;
}) => {
  const titleCasedName = useLabelText(name);
  return (
    <div className="">
      <label className="text-xl ">{label || titleCasedName}</label>
      {error && <div className="text-red-600">{error}</div>}
      <div className="grid lg:grid-cols-2 gap-4 pt-2">
        {type === "text" ? (
          <Field
            name={name}
            placeholder={placeholder}
            className="border-b border-primary-700 py-2 w-full"
          />
        ) : type === "file" ? (
          <FilePicker
            values={values}
            setValues={setValues}
            name={name}
            setTouched={setTouched}
          />
        ) : type === "radio" ? (
          <div className="flex overflow-auto">
            {options.map((option) => {
              const active = option === values[name];
              return (
                <div
                  key={option}
                  onClick={() => {
                    // @ts-ignore
                    setValues!((values) => ({ ...values, [name]: option }));
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
