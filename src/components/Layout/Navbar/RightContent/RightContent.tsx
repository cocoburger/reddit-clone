import { Flex } from "@chakra-ui/react";
import React from "react";
import AuthButton from "./AuthButtons";
type RightContentProps = {
  // user: any;
};

const RightContent: React.FC<RightContentProps> = () => {
  return (
    <>
      {/* <AuthModal /> */}
      <Flex justify="center" align="center">
        <AuthButton />
      </Flex>
    </>
  );
};

export default RightContent;
