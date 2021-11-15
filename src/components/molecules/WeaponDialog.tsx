import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "components/atoms/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { alpha, Box, InputBase, styled, Typography } from "@mui/material";
import { Weapon } from "./WeaponsTableBody";
import SearchIcon from "@mui/icons-material/Search";

// For testing, mock list of weapons
const weapons: Weapon[] = [
  {
    category_id: 2,
    created_at: "",
    desired_amount: 10,
    current_amount: 5,
    id: 10,
    image: "string",
    name: "Weapon1",
    price: 100,
    updated_at: "string",
  },
  {
    category_id: 2,
    created_at: "",
    desired_amount: 10,
    current_amount: 5,
    id: 12,
    image: "string",
    name: "Weapon2",
    price: 100,
    updated_at: "string",
  },
  {
    category_id: 2,
    created_at: "",
    desired_amount: 10,
    current_amount: 5,
    id: 23,
    image: "string",
    name: "Uzi",
    price: 100,
    updated_at: "string",
  },
  {
    category_id: 2,
    created_at: "",
    desired_amount: 10,
    current_amount: 5,
    id: 34,
    image: "string",
    name: "HandGun",
    price: 100,
    updated_at: "string",
  },
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

interface WeaponFormDialogProps {
  handleClickClose: () => void;
  handleAddWeapons: (weapons: Weapon[]) => void;
  open: boolean;
}

export default function WeaponFormDialog(props: WeaponFormDialogProps) {
  const selectedWeapons1: Weapon[] = [];
  const [selectedWeapons, setSelectedWeapons] = React.useState(selectedWeapons1);
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [foundWeapons, setFoundWeapons] = React.useState(weapons);

  const filter = (e: any) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = weapons.filter((weapon) => {
        return weapon.name.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundWeapons(results);
    } else {
      setFoundWeapons(weapons);
      // If the text field is empty, show all users
    }

    setSearchKeyword(keyword);
  };

  const handleToggle = (value: Weapon) => () => {
    const currentIndex = selectedWeapons.indexOf(value);
    const newChecked = [...selectedWeapons];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedWeapons(newChecked);
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClickClose}>
        <DialogTitle>Weapons</DialogTitle>
        <DialogContent>
          <DialogContentText>Search by id or name</DialogContentText>
          <Search onChange={filter} defaultValue={searchKeyword} placeholder="test">
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
          </Search>
          {foundWeapons && foundWeapons.length > 0 ? (
            <List dense sx={{ width: "100%" }}>
              {foundWeapons.map((weapon) => {
                const labelId = `checkbox-list-secondary-label-${weapon}`;
                return (
                  <ListItem
                    key={weapon.id}
                    secondaryAction={
                      <Checkbox
                        edge="end"
                        onChange={handleToggle(weapon)}
                        checked={selectedWeapons.indexOf(weapon) !== -1}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    }
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar alt={`Avatar n°${weapon.id + 1}`} src={`/static/images/avatar/${weapon.id + 1}.jpg`} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={weapon.name}
                        secondary={
                          <React.Fragment>
                            <Box>
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                Id: {weapon.id}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                Category: {weapon.category_id}
                              </Typography>
                            </Box>
                          </React.Fragment>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <h1>No results found!</h1>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClickClose}>Cancel</Button>
          <IconButton
            icon={<CheckIcon />}
            onHandleClick={() => {
              props.handleAddWeapons(selectedWeapons);
            }}
            text={"Add"}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
