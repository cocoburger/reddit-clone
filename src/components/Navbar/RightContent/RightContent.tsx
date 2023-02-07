import AuthModal from "@/components/Modal/Auth/AuthModal";
import { Flex, Button } from "@chakra-ui/react";
import React from "react";
import AuthButton from "./AuthButtons";
import {signOut} from "@firebase/auth";
import {auth} from "@/firebase/clientApp";
type RightContentProps = {
  user: any;
};

const RightContent: React.FC<RightContentProps> = ({user}) => {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
          {user ? <Button onClick={() => signOut(auth)}>로그아웃</Button> : <AuthButton />}
      </Flex>
    </>
  );
};

export default RightContent;
