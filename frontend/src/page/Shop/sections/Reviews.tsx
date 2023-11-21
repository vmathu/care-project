import { styled, Divider } from "@mui/material";
import { Comment } from "../components";

const mock = {
  title: "Rất tuyệt vời, xin cảm ơn",
  name: "Nguyễn Văn A",
  desciption:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
  rate: 4,
};
const Root = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "1.25rem",
}));
export default function Reviews() {
  return (
    <Root>
      <Comment
        title={mock.title}
        name={mock.name}
        description={mock.desciption}
        rate={mock.rate}
      />
      <Divider />
      <Comment
        title={mock.title}
        name={mock.name}
        description={mock.desciption}
        rate={mock.rate}
      />
    </Root>
  );
}
