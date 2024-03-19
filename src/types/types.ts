export interface Data {
  label: string;
  data: Array<any>;
}

export interface Resumed {
  label: string;
  data: Array<ResumedData>;
}

export interface ResumedData {
  value: any;
  frequency: number;
  percentage: number;
}
