import { Box } from "@mui/material";
import type { ElementType, ReactNode } from "react";

type LocalStackProps = {
  component?: ElementType;
  direction?: unknown;
  alignItems?: unknown;
  justifyContent?: unknown;
  gap?: unknown;
  flexWrap?: unknown;
  sx?: unknown;
  children?: ReactNode;
  [key: string]: unknown;
};

export function Stack({
  component = "div",
  direction = "column",
  alignItems,
  justifyContent,
  gap,
  flexWrap,
  sx,
  children,
  ...props
}: LocalStackProps) {
  const sxList = Array.isArray(sx) ? sx : [sx].filter(Boolean);

  return (
    <Box
      component={component}
      sx={[
        {
          display: "flex",
          flexDirection: direction,
          alignItems,
          justifyContent,
          gap,
          flexWrap,
        },
        ...sxList,
      ]}
      {...props}
    >
      {children}
    </Box>
  );
}
