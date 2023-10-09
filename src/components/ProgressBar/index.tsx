import { TypeStatus } from "../../enums/TypeStatus";

import {
  ContainerProgreesBar,
  BarBackProgressBar,
  BarFrontProgressBar,
  ValueProgressBar,
  SpanProgressBar,
} from "./styles";

interface IProps {
  name: string;
  value: number;
  max: number;
}

export default function ProgressBar({ name, value, max }: IProps) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const status = TypeStatus[name];
  const percentage = (value * 100) / max;

  return (
    <ContainerProgreesBar>
      <SpanProgressBar>{status}</SpanProgressBar>

      <BarBackProgressBar>
        <BarFrontProgressBar css={{ $$percentage: `${percentage}%` }}>
          <ValueProgressBar>{value}/300</ValueProgressBar>
        </BarFrontProgressBar>
      </BarBackProgressBar>
    </ContainerProgreesBar>
  );
}
