import { TextField, TextFieldProps, Typography } from "@mui/material";
import colors from "../color";

const style: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: ".5rem",
  alignItems: "flex-start",
};

type Props = {
  label: string;
  containerStyle?: React.CSSProperties;
  textFieldProps?: TextFieldProps;
};

export const CustomTextField = ({
  label,
  containerStyle,
  textFieldProps,
}: Props) => {
  return (
    <div style={{ ...style, ...containerStyle }}>
      <Typography color={colors.black500} style={{ fontWeight: "bold" }}>
        {label}{" "}
        {textFieldProps && "required" in textFieldProps && (
          <span style={{ color: colors.error }}>*</span>
        )}
      </Typography>
      <TextField {...textFieldProps} />
    </div>
  );
};
