import { Typography } from "@mui/material";

type Props = {
  data: string;
};
export default function Description({ data }: Props) {
  return (
    <Typography variant="body1" style={{ textAlign: "justify" }}>
      {data}
    </Typography>
  );
}
