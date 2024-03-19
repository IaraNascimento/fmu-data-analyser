import { Data } from "../../types/types";
import Ordenated from "../Ordenated/Ordenated";
import "./Statistcs.scss";

interface StatisticsProps {
  data: Array<Data>;
}

function Statistics(props: StatisticsProps) {
  return (
    <section className="wrap">
      {props.data.map((data: Data, index: number) => {
        return <Ordenated data={data} key={index} />;
      })}
    </section>
  );
}

export default Statistics;
