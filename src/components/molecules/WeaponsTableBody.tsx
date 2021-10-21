import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import useTranslate from "../../hooks/useTranslate";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { inventoryTableStyles } from "../../styles/mui/inventoryTableStyles";

interface Weapon {
  category_id: number,
  created_at: string,
  desired_amount: number,
  current_amount: number
  id: number,
  image: string,
  name: string,
  price: number,
  updated_at: string
}

export function WeaponsTableBody() {
  const t = useTranslate();
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  let categories = [t("light"), t("medium"), t("heavy")];

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch("http://127.0.0.1:8000/api/itemtypes")
      .then(response => response.json())
      .then(data => updateWeaponsList(data));
  }, []);

  function updateWeaponsList(newWeapons: Weapon[]) {
    setWeapons(newWeapons);
  }

  function getQuantityStyle(weapon: Weapon) {
    let backgroundColor;
    if (weapon.desired_amount - 23 > weapon.desired_amount * 0.60) {
      backgroundColor = "#03a9f4";
    } else if (weapon.desired_amount - 23  > weapon.desired_amount * 0.30) {
      backgroundColor = "#ff9800";
    } else {
      backgroundColor = "#ef5350";
    }
    return { backgroundColor: backgroundColor };
  }

  return <TableBody>
    {weapons.map((weapon) => (
      <TableRow
        key={weapon.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row" sx={inventoryTableStyles.tableBodyCell}>
          {weapon.id}
        </TableCell>
        <TableCell sx={inventoryTableStyles.tableBodyCell}>{weapon.name}</TableCell>
        <TableCell sx={inventoryTableStyles.tableBodyCell}>
          <Box sx={inventoryTableStyles.itemQuantityStatus} style={getQuantityStyle(weapon)}>
            {weapon.desired_amount}
          </Box>
        </TableCell>
        <TableCell
          sx={inventoryTableStyles.tableBodyCell}>{categories[Math.floor(Math.random() * categories.length)]}</TableCell>
      </TableRow>
    ))}
  </TableBody>;
}