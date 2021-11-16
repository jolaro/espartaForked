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
import { useCallback } from "react";
import ApiService from "utils/api_service/api_service";
import { ItemResponse, ItemTypesResponse } from "utils/api_service/endpoints.config";

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
  handleAddWeapons: (weapons: ItemResponse[]) => void;
  open: boolean;
}

export default function WeaponFormDialog(props: WeaponFormDialogProps) {
  const [weapons, setWeapons] = React.useState<ItemResponse[]>([]);
  const [selectedWeapons, setSelectedWeapons] = React.useState<ItemResponse[]>([]);
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [foundWeapons, setFoundWeapons] = React.useState<ItemResponse[]>([]);

  React.useEffect(() => {
    fetchItems();
  }, []);

  const getCategory = (weight_category: string) => {
    if (weight_category === "0") {
      return "Light";
    } else if (weight_category === "1") {
      return "Medium";
    } else if (weight_category === "2") {
      return "Heavy";
    } else {
      return "";
    }
  };

  const fetchItems = useCallback(async () => {
    const responseItems = await ApiService.get("/api/items");
    const responseItemsTypes = await ApiService.get("/api/itemtypes");
    const itemsResponse: ItemResponse[] = responseItems.data;
    const itemsItemsTypes: ItemTypesResponse[] = responseItemsTypes.data;

    for (let i = 0; i < itemsResponse.length; i++) {
      for (let i2 = 0; i2 < itemsItemsTypes.length; i2++) {
        if (itemsResponse[i].item_type_id === itemsItemsTypes[i2].id.toString()) {
          itemsItemsTypes[i2].category = getCategory(itemsItemsTypes[i2].category_id);
          itemsResponse[i].item_type = itemsItemsTypes[i2];
        }
      }
    }
    setWeapons(itemsResponse);
    setFoundWeapons(itemsResponse);
  }, []);

  const filter = (e: any) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = weapons.filter((weapon) => {
        return (
          weapon.item_type?.name.toLowerCase().startsWith(keyword.toLowerCase()) ||
          weapon.id.toString().toLowerCase().startsWith(keyword.toLowerCase())
        );
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundWeapons(results);
    } else {
      setFoundWeapons(weapons);
      // If the text field is empty, show all users
    }

    setSearchKeyword(keyword);
  };

  const handleToggle = (value: ItemResponse) => () => {
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
                        primary={weapon?.item_type?.name}
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
                                Category: {weapon.item_type?.category}
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
