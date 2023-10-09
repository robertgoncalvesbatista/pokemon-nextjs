export interface IRow {
  name: string;
  url: string;
}

export interface IData {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<IRow>;
}
