import BodyLayout from "layouts/BodyLayout";
import React from "react";
import InventoryItemsTable from "../components/organisms/InventoryItemsTable";

interface HomeProps {
}

const Home: React.FC<HomeProps> = () => {
  return <BodyLayout><InventoryItemsTable/></BodyLayout>;
};

export default Home;
