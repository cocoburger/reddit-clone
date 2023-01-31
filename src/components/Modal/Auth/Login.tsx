import {Button, Input} from "@chakra-ui/react";
import React, {useState} from "react";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const onSubmit = () => {};
    /**
     * 하나의 함수에서 동적으로 state value 변경
     */
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //update from state
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        name="email"
        placeholder="email"
        type="email"
        mb={2}
        onChange={onChange}
      />

      <Input
        name="password"
        placeholder="password"
        type="password"
        onChange={onChange}
      />
      <Button type="submit">로그인</Button>
    </form>
  );
};

export default Login;