import NavBar from "components/organisms/NavBar";
import { useIsMobile } from "hooks/useIsMobile";
import BodyLayoutDesktop from "./BodyLayoutDesktop";
import BodyLayoutMobile from "./BodyLayoutMobile";

const BodyLayout: React.FC = ({ children }) => {
  const isMobile = useIsMobile();

  return isMobile ? (
    <BodyLayoutMobile drawer={<NavBar />}>{children}</BodyLayoutMobile>
  ) : (
    <BodyLayoutDesktop drawer={<NavBar />}>{children}</BodyLayoutDesktop>
  );
};

export default BodyLayout;
