import { Button } from "@mui/material";

export function IconButton(props: any) {
  return (
    <Button onClick={props.onHandleClick} variant="contained" startIcon={props.icon}>
      {props.text}
    </Button>
  );
}
