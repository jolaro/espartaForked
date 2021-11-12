import { Button } from "@mui/material";

interface IconButtonProps {
  icon: any,
  onHandleClick: any
  text: String
}

export function IconButton(props: IconButtonProps) {
  return (
    <Button onClick={props.onHandleClick} variant="contained" startIcon={props.icon}>
      {props.text}
    </Button>
  );
}
