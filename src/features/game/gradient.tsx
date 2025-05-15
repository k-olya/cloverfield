import { FC } from "react";

interface Props {
  id: string;
}

export const Gradient: FC<Props> = ({ id }) => (
  <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" style={{ stopColor: "#bdce46", stopOpacity: 1 }} />
    <stop offset="35%" style={{ stopColor: "#8bc02b", stopOpacity: 1 }} />
    <stop offset="100%" style={{ stopColor: "#65a21b", stopOpacity: 1 }} />
  </linearGradient>
);
