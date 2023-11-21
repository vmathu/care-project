import { Typography, Rating, styled } from "@mui/material";
import color from "libs/ui/color";

export type CommentProps = {
  title: string;
  name: string;
  rate: number;
  description: string;
  img?: Array<string> | null;
};
const Root = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: ".5rem",
}));
const CommentBar = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

const Title = styled(Typography)(() => ({
  fontWeight: "bold",
}));

const Name = styled(Typography)(() => ({
  color: color.black200,
}));
export default function Comment({
  title,
  name,
  rate,
  description,
  img,
}: CommentProps) {
  return (
    <Root>
      <CommentBar>
        <div>
          <Title variant="subtitle1">{title}</Title>
          <Name variant="body1">{name}</Name>
        </div>
        <Rating defaultValue={rate} readOnly />
      </CommentBar>
      <Typography variant="body1">{description}</Typography>
    </Root>
  );
}
