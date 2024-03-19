import { useState } from "react";
import { Data } from "../../types/types";
import initial from "../../datapoints/example.json";
import "./Upload.scss";

interface UploadProps {
  newData: (value: Array<Data>) => void;
}

function Upload(props: UploadProps) {
  const [temp, setTemp] = useState<string>(JSON.stringify(initial));
  // const [data, setData] = useState<Array<Data>>([]);

  // function uploadBtn(value: string): void {
  //   alert("EM DESENVOLVIMENTO!");
  // }

  function uploadSubmit(value: string): void {
    const parsedValue: any = JSON.parse(value);
    if (typeof parsedValue === "object" && parsedValue.length >= 1) {
      props.newData(parsedValue);
    }
  }

  return (
    <section className="wrap">
      {/* <button onClick={(e) => uploadBtn(String(data))}>Upload</button> */}
      <textarea
        placeholder="Dados"
        value={temp}
        onChange={(e) => setTemp(String(e.target.value))}
      />
      <button onClick={(e) => uploadSubmit(temp)}>Vamos nessa!</button>
    </section>
  );
}

export default Upload;
