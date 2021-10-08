import { SxProps, Theme } from "@mui/system";

export type Sx = SxProps<Theme>;

export const asStyle = <T>(et: { [K in keyof T]: Sx }) => et;
