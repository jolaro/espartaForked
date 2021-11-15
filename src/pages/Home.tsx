import BodyLayout from "layouts/BodyLayout";
import React from "react";
import InventoryTabs from "../components/organisms/InventoryTabs";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <BodyLayout>
      <InventoryTabs />
    </BodyLayout>
  );
};

export default Home;
