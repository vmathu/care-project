import { CircularProgress } from "@mui/material";
import  AppLogo from "../../../assets/app-logo.svg";

export default function SuspenseLoading() {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <img src={AppLogo} alt="logo" style={{ width: "100px" }} />
        <CircularProgress size={100}/>
    </div>
  );
}