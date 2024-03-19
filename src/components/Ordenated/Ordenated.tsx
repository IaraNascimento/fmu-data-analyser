import { useEffect, useState } from "react";
import { Data, ResumedData } from "../../types/types";
import Information from "../Information/Information";
import "./Ordenated.scss";

interface OrdenatedProps {
  data: Data;
}

function Ordenated(props: OrdenatedProps) {
  const [digits, setDigits] = useState<number>(2);
  const [ordenated, setOrdenated] = useState<Array<string | number>>([]);
  const [resumed, setResumed] = useState<Array<ResumedData>>([]);
  const [classAmp, setClassAmp] = useState<string | number>();
  const [sturges, setSturges] = useState<string | number>();
  const [kq1, setKq1] = useState<string | number>();
  const [kq2, setKq2] = useState<string | number>();
  const [kq3, setKq3] = useState<string | number>();
  const [range, setRange] = useState<string | number>();
  const [mode, setMode] = useState<Array<string | number>>([]);
  const [median, setMedian] = useState<string | number>();
  const [mean, setMean] = useState<string | number>();
  const [variance, setVariance] = useState<string | number>();
  const [deviation, setDeviation] = useState<string | number>();
  const [coefficientVariation, setCoefficientVariation] = useState<
    string | number
  >();

  function organizeResumed(data: Array<string | number>): Array<ResumedData> {
    let aux: Array<ResumedData> = [];
    const quantity: number = data.length;
    data.forEach((element) => {
      const foundIndex = aux.findIndex(
        (item: ResumedData) => item.value === element
      );
      if (foundIndex >= 0) {
        const newFrequency: number = aux[foundIndex].frequency + 1;
        aux[foundIndex] = {
          ...aux[foundIndex],
          frequency: newFrequency,
          percentage: newFrequency / quantity,
        };
      } else {
        aux.push({ value: element, frequency: 1, percentage: 1 / quantity });
      }
    });
    return aux.sort((a, b) => a.value - b.value);
  }

  function calculateSturges(size: number): number {
    return Math.round(1 + 3.3 * Math.log10(size));
  }

  function calculateClassAmp(
    data: Array<string | number>,
    sturges: number
  ): string | number {
    const min = data[0];
    const max = data[data.length - 1];
    if (typeof min === "number" && typeof max === "number") {
      return (max - min) / sturges;
    }
    return "-";
  }

  function calculateKQ(
    data: Array<string | number>,
    qPosition: number
  ): string | number {
    const index = Math.floor((data.length + 1) * 0.25 * qPosition) - 1;
    if (data.length % 2 === 1) {
      return data[index];
    }
    if (
      typeof data[index] === "number" &&
      typeof data[index + 1] === "number"
    ) {
      return ((data[index] as number) + (data[index + 1] as number)) / 2;
    }
    return `-`;
  }

  function calculateRange(data: Array<string | number>): string | number {
    const min = data[0];
    const max = data[data.length - 1];
    if (typeof min === "number" && typeof max === "number") {
      return max - min;
    }
    return `${min} até ${max}`;
  }

  function calculateMode(data: Array<string | number>): Array<string | number> {
    let mode: Array<string | number> = [];
    let frequency: { [key: string | number]: number } = {};
    data.forEach((value: string | number, index: number) => {
      frequency[value] = frequency[value] ? frequency[value] + 1 : 1;
      if (
        mode.length === 0 ||
        (value !== mode[0] && frequency[value] === frequency[mode[0]])
      ) {
        mode.push(value);
      } else if (frequency[value] > frequency[mode[0]]) {
        mode = [value];
      }
    });
    return mode;
  }

  function calculateMedian(data: Array<string | number>): string | number {
    let median1 = data[Math.round(data.length / 2) - 1];
    let median2 = data[Math.round(data.length / 2)];
    if (typeof median1 === "number" && typeof median2 === "number") {
      if (data.length > 1 && data.length % 2 === 0) {
        return (median1 + median2) / 2;
      }
      return median1;
    }
    return "-";
  }

  function calculateMean(data: Array<string | number>): string | number {
    let sum: string | number = 0;
    const isNumber: boolean = data.every((element) => {
      if (typeof element === "number") {
        sum = (sum as number) + element;
        return true;
      }
      return false;
    });
    if (isNumber) {
      return sum / data.length;
    }
    return "-";
  }

  function calculateVariance(
    data: Array<string | number>,
    auxMean: string | number
  ): string | number {
    let sum: number = 0;
    if (typeof auxMean === "number") {
      data.forEach((element: string | number) => {
        const localVariance = Math.pow(auxMean - (element as number), 2);
        sum += localVariance;
      });
      return sum / (data.length - 1);
    }
    return "-";
  }

  useEffect(() => {
    const auxOrdenated: Array<string | number> = props.data.data.sort();
    setOrdenated(auxOrdenated);
    const auxSturges = calculateSturges(auxOrdenated.length);
    setSturges(auxSturges);
    setClassAmp(calculateClassAmp(auxOrdenated, auxSturges));
    setResumed(organizeResumed(auxOrdenated));
    setKq1(calculateKQ(auxOrdenated, 1));
    setKq2(calculateKQ(auxOrdenated, 2));
    setKq3(calculateKQ(auxOrdenated, 3));
    setRange(calculateRange(auxOrdenated));
    setMode(calculateMode(auxOrdenated));
    setMedian(calculateMedian(auxOrdenated));
    const auxMean = calculateMean(auxOrdenated);
    setMean(auxMean);
    const auxVariance = calculateVariance(auxOrdenated, auxMean);
    setVariance(auxVariance);
    const auxDeviation =
      typeof auxVariance === "number" ? Math.sqrt(auxVariance) : "-";
    setDeviation(auxDeviation);
    setCoefficientVariation(
      typeof auxDeviation === "number"
        ? auxDeviation / (auxMean as number)
        : "-"
    );
  }, [props.data]);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>{props.data.label}</th>
          </tr>
        </thead>
        <tbody>
          {resumed.length &&
            resumed.map((data: ResumedData, index: number) => {
              return (
                <tr key={index}>
                  <td>
                    <strong>{data.value}</strong> - {data.frequency} (
                    {(data.percentage * 100).toFixed(digits)}%)
                  </td>
                </tr>
              );
            })}
        </tbody>
        <tfoot>
          <input
            className="input-digits"
            name="digits"
            placeholder="digitos"
            type="number"
            min="0"
            value={digits}
            onChange={(e) => setDigits(e.target.value as unknown as number)}
          />
          <Information
            label="Quantidade"
            value={
              typeof ordenated.length === "number"
                ? ordenated.length.toFixed(digits)
                : ordenated.length
            }
          />
          <Information
            label="k (Quantidade de classes)"
            value={
              typeof sturges === "number" ? sturges.toFixed(digits) : sturges
            }
          />
          <Information
            label="h (Amplitude das classes)"
            value={
              typeof classAmp === "number" ? classAmp.toFixed(digits) : classAmp
            }
          />
          <Information
            label="K-Q1"
            value={typeof kq1 === "number" ? kq1.toFixed(digits) : kq1}
          />
          <Information
            label="K-Q2"
            value={typeof kq2 === "number" ? kq2.toFixed(digits) : kq2}
          />
          <Information
            label="K-Q3"
            value={typeof kq3 === "number" ? kq3.toFixed(digits) : kq3}
          />
          <Information
            label="Amplitude"
            value={typeof range === "number" ? range.toFixed(digits) : range}
          />
          <Information
            label="Moda"
            value={mode.map((element) =>
              typeof element === "number" ? element.toFixed(digits) : element
            )}
          />
          <Information
            label="Mediana"
            value={typeof median === "number" ? median.toFixed(digits) : median}
          />
          <Information
            label="Média"
            value={typeof mean === "number" ? mean.toFixed(digits) : mean}
          />
          <Information
            label="Variância"
            value={
              typeof variance === "number" ? variance.toFixed(digits) : variance
            }
          />
          <Information
            label="Desvio padrão"
            value={
              typeof deviation === "number"
                ? deviation.toFixed(digits)
                : deviation
            }
          />
          <Information
            label="Coeficiente de variância"
            value={
              typeof coefficientVariation === "number"
                ? coefficientVariation.toFixed(digits)
                : coefficientVariation
            }
          />
        </tfoot>
      </table>
    </>
  );
}

export default Ordenated;
