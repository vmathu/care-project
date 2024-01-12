import { ChipPropsVariantOverrides } from "@mui/material/Chip";
import React, { useState } from "react";
import { OverridableStringUnion } from "@mui/types";
import { Chip } from "@mui/material";

type Props = {
  label: React.ReactNode;
  onClick: (
    label: React.ReactNode,
    setChipVariant: React.Dispatch<
      React.SetStateAction<
        OverridableStringUnion<"filled" | "outlined", ChipPropsVariantOverrides>
      >
    >,
    chipVariant: any,
  ) => void;
};

export function Tag({ label, onClick }: Props) {
  const [chipVariant, setChipVariant] =
    useState<
      OverridableStringUnion<"filled" | "outlined", ChipPropsVariantOverrides>
    >("text");
  return (
    <Chip
      label={label}
      variant={chipVariant}
      onClick={() => onClick(label, setChipVariant, chipVariant)}
    />
  );
}
