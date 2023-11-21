import { ChipOwnProps, ChipPropsVariantOverrides } from "@mui/material/Chip";
import { useState } from "react";
import { OverridableStringUnion } from "@mui/types";
import { Chip } from "@mui/material";

export function Tag({ label }: ChipOwnProps) {
  const [chipVariant, setChipVariant] =
    useState<
      OverridableStringUnion<"filled" | "outlined", ChipPropsVariantOverrides>
    >("text");
  const handleChipClick = () => {
    setChipVariant(chipVariant == "text" ? "filled" : "text");
  };
  return <Chip label={label} variant={chipVariant} onClick={handleChipClick} />;
}
