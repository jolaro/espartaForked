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
import SearchIcon from "@mui/icons-material/Search";
import { User } from "interfaces/User";

// For testing, mock list of soldiers
const soldiers: User[] = [
  {
    id: 1,
    name: "23",
    email: "string",
    access_level: "1",
    email_verified_at: null,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 4,
    name: "strsdfing",
    email: "string",
    access_level: "1",
    email_verified_at: null,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 3,
    name: "bob",
    email: "string",
    access_level: "1",
    email_verified_at: null,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    name: "string",
    email: "string",
    access_level: "1",
    email_verified_at: null,
    created_at: new Date(),
    updated_at: new Date(),
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

interface SoldierFormDialogProps {
  handleClickClose: () => void;
  handleAddSoldiers: (soldier: User) => void;
  open: boolean;
}

export default function WeaponFormDialog(props: SoldierFormDialogProps) {
  const selectedSoldier1: User = {
    id: 0,
    name: "",
    email: "",
    access_level: "",
    email_verified_at: null,
    created_at: new Date(),
    updated_at: new Date(),
  };
  const [selectedSoldier, setSelectedSoldier] = React.useState(selectedSoldier1);
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [foundSoldiers, setFoundSoldiers] = React.useState(soldiers);

  const filter = (e: any) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = soldiers.filter((soldier) => {
        return soldier.name.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundSoldiers(results);
    } else {
      setFoundSoldiers(soldiers);
      // If the text field is empty, show all users
    }

    setSearchKeyword(keyword);
  };

  const getRole = (accessLevel: string) => {
    if (accessLevel === "0") {
      return "Troop";
    } else if (accessLevel === "1") {
      return "Commander";
    } else if (accessLevel === "2") {
      return "Manager";
    } else {
      return "";
    }
  };

  const handleToggle = (soldier: User) => () => {
    let newSoldier: User;

    if (selectedSoldier.id === soldier.id) {
      newSoldier = {
        id: 0,
        name: "",
        email: "",
        access_level: "",
        email_verified_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      };
    } else {
      newSoldier = soldier;
    }

    setSelectedSoldier(newSoldier);
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClickClose}>
        <DialogTitle>Soldiers</DialogTitle>
        <DialogContent>
          <DialogContentText>Search by id or name</DialogContentText>
          <Search onChange={filter} defaultValue={searchKeyword} placeholder="Search by id or name">
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
          </Search>
          {foundSoldiers && foundSoldiers.length > 0 ? (
            <List dense sx={{ width: "100%" }}>
              {foundSoldiers.map((soldier) => {
                const labelId = `checkbox-list-secondary-label-${soldier}`;
                return (
                  <ListItem
                    key={soldier.id}
                    secondaryAction={
                      <Checkbox
                        edge="end"
                        onChange={handleToggle(soldier)}
                        checked={selectedSoldier.id === soldier.id}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    }
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          alt={`Avatar n°${soldier.id + 1}`}
                          src={`/static/images/avatar/${soldier.id + 1}.jpg`}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={soldier.name}
                        secondary={
                          <React.Fragment>
                            <Box>
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                Id: {soldier.id}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                Category: {getRole(soldier.access_level)}
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
              props.handleAddSoldiers(selectedSoldier);
            }}
            text={"Add"}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
