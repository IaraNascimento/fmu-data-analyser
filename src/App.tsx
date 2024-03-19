import Upload from "./components/Upload/Upload";
import Statistics from "./components/Statistics/Statistics";
import "./App.scss";
import { useState } from "react";
import { Data } from "./types/types";

function App() {
  const [data, setData] = useState<Array<Data>>([]);

  return (
    <main>
      <h1 className="main-title">Analise!!!</h1>
      <Upload newData={(newData) => setData(newData)} />
      <Statistics data={data} />
    </main>
  );
}

export default App;
