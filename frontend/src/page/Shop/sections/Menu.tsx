import { styled } from "@mui/material";
import { menu } from "../mocks";

const Image = styled("img")(() => ({
  width: "100%",
}));
export default function Menu() {
  return <Image src={menu} alt="menu" />;
}
