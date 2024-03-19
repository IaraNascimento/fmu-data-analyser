import "./Information.scss";

interface InformationProps {
  label: string;
  value: any;
}

function Information(props: InformationProps) {
  return (
    <div>
      <label className="label">{props.label}:</label>
      {props.value && typeof props.value === "object" ? (
        props.value.map((val: any, index: number) => (
          <span className="result" key={index}>
            {index > 0 && ", "}
            {val}
          </span>
        ))
      ) : (
        <span className="result">{props.value}</span>
      )}
    </div>
  );
}

export default Information;
