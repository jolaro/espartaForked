import { Button } from "@mui/material";

interface IconButtonProps {
  icon: any,
  onHandleClick: any
  text: String
  backgroundColor?: string
}

export function IconButton(props: IconButtonProps) {
  return (
    <Button onClick={props.onHandleClick} variant="contained"  style={{ backgroundColor: props.backgroundColor }} startIcon={props.icon}>
      {props.text}
    </Button>
  );
}
