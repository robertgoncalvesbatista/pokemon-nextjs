import { styled } from "@stitches/react";

export const ContainerProgreesBar = styled("div", {
  display: "grid",
  gridTemplateColumns: "0.5fr 5fr",
  marginBottom: "0.5rem",
});

export const BarBackProgressBar = styled("div", {
  backgroundColor: "#e5e5e5",
  borderRadius: "25px",
});

export const BarFrontProgressBar = styled("div", {
  backgroundColor: "#2a9d8f",
  borderRadius: "25px",
  width: "$$percentage",
  padding: "0.2rem 0.6rem",
});

export const ValueProgressBar = styled("p", {
  display: "flex",
  justifyContent: "flex-end",

  color: "#fff",

  fontSize: "10pt",
  fontWeight: "500",
});

export const SpanProgressBar = styled("span", {
  fontWeight: "500",
});
