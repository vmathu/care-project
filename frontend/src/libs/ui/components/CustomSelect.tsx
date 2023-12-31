import {
  Select,
  Typography,
  SelectProps,
  FormControl,
  FormHelperText,
} from "@mui/material";
import colors from "../color";
import React, { ReactNode } from "react";

const style: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: ".5rem",
  alignItems: "flex-start",
};

type Props = {
  label: string;
  children?: ReactNode;
  containerStyle?: React.CSSProperties;
  selectProps?: SelectProps;
  helperText?: string;
  rootStyle?: React.CSSProperties;
};

export const CustomSelect: React.FC<Props> = ({
  label,
  children,
  containerStyle,
  selectProps,
  helperText,
  rootStyle,
}: Props) => {
  return (
    <FormControl sx={{ ...rootStyle }}>
      <div style={{ ...style, ...containerStyle }}>
        <Typography color={colors.black500} style={{ fontWeight: "bold" }}>
          {label}{" "}
          {selectProps && "required" in selectProps && (
            <span style={{ color: colors.error }}>*</span>
          )}
        </Typography>
        <Select {...selectProps}>{children}</Select>
      </div>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};
