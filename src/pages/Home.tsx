import BodyLayout from "layouts/BodyLayout";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const history = useHistory();

  useEffect(() => {
    history.push("/manager/weapons");
  }, []);

  return (
    <BodyLayout>
      <h1>This is the homepage which does'nt show anything now. </h1>
    </BodyLayout>
  );
};

export default Home;
