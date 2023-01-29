import { Button } from "@chakra-ui/react";
import React from "react";

const AuthButton: React.FC = () => {
  return (
    <>
      <Button
        variant="outline"
        height="28px"
        display={{
          base: "none",
          sm: "flex",
        }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        // onClick={() => {}}
      >
        로그인
      </Button>
      <Button
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        // onClick={() => {}}
      >
        회원가입
      </Button>
    </>
  );
};

export default AuthButton;
