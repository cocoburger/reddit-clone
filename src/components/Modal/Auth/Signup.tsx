import { authModalState } from "../../../atoms/authModalAtom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { auth } from "@/firebase/clientApp";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
const Signup: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const [createUserWithEmailAndPassword, user, loading, error, userError] =
    useCreateUserWithEmailAndPassword(auth);

  /**
   * todo : Firebase logic
   */
  const onSubmit = () => {
    //passwords match
    if (signUpForm.password !== signUpForm.confirmPassword) {
      // setError
      setErrorMsg("passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  };
  /**
   * 하나의 함수에서 동적으로 state value 변경
   */
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //update from state
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        placeholder="email"
        type="email"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      <Input
        required
        name="password"
        placeholder="password"
        type="password"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      <Input
        required
        name="confirmPassword"
        placeholder="confirmPassword"
        type="password"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      <Text textAlign="center" color="red" fontSize="10pt">
        {errorMsg}
      </Text>
      <Button width="100%" height="36px" mt={2} mb={2} type="submit">
        회원가입
      </Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1} fontWeight={550}>
          이미 계정이 있으신가요? &nbsp;
        </Text>
        <Text
          color="blue.500"
          fontWeight={800}
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "login",
            }))
          }
        >
          로그인
        </Text>
      </Flex>
    </form>
  );
};

export default Signup;
