import AuthModal from "@/components/Modal/Auth/AuthModal";
import {Flex} from "@chakra-ui/react";
import React from "react";
import AuthButton from "./AuthButtons";
import Icons from "@/components/Navbar/RightContent/Icons";

type RightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({user}) => {
  return (
      <>
        <AuthModal/>
        <Flex justify="center" align="center">
          {user ? (<Icons/>) : <AuthButton/>}
          {/*<Menu/>*/}
        </Flex>
      </>
  );
};

export default RightContent;
