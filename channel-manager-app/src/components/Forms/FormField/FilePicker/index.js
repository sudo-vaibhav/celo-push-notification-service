import { useRef, useState } from "react";
import { FileDrop } from "react-file-drop";
import { create } from "ipfs-http-client";

import defaultPickerImage from "./file-picker-default.svg";
const FilePicker = ({ setValues, values, name, setTouched }) => {
  const fileInputRef = useRef(null);
  const [processing, setProcessing] = useState(false);
  const ipfs = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
  });

  const onTargetClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = async (files) => {
    setProcessing(true);
    setTouched((touched) => ({ ...touched, [name]: true }));
    try {
      console.log("received file drop");
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(files[0]);
      reader.onloadend = async () => {
        const buffer = Buffer(reader.result);
        console.log("buffer", buffer);
        const result = await ipfs.add(buffer);
        console.log("result", result);
        setValues((values) => {
          return {
            ...values,
            [name]: result.path,
          };
        });
        setProcessing(false);
      };
    } catch (e) {
      setProcessing(false);
    }
  };
  const previewFileSource =
    values[name] === ""
      ? defaultPickerImage
      : "https://ipfs.infura.io/ipfs/" + values[name];
  return (
    <div className="border border-dashed border-primary-700 rounded-lg p-4 text-center text-primary-700">
      <input
        onChange={(e) => {
          handleFileChange(e.target.files);
        }}
        ref={fileInputRef}
        type="file"
        className="hidden"
      />
      <FileDrop onDrop={handleFileChange} onTargetClick={onTargetClick}>
        <img
          src={previewFileSource}
          alt="file-picker"
          className="w-1/4 mx-auto"
        />
        <p>
          {processing ? "Uploading to IPFS..." : "Click here or drop an image"}
        </p>
      </FileDrop>
    </div>
  );
};

export default FilePicker;
