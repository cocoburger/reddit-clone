import { authModalState } from '@/atoms/authModalAtom';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import { FIREBASE_ERRORS } from '@/firebase/errors';

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  /**
   * todo : Firebase logic
   */
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await signInWithEmailAndPassword(
      loginForm.email,
      loginForm.password,
    );
  };
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
        required
        name='email'
        placeholder='email'
        type='email'
        mb={2}
        onChange={onChange}
        fontSize='10pt'
        _placeholder={{ color: 'gray.500' }}
        _hover={{
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500',
        }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500',
        }}
        bg='gray.50'
      />
      <Input
        required
        name='password'
        placeholder='password'
        type='password'
        mb={1}
        onChange={onChange}
        fontSize='10pt'
        _placeholder={{ color: 'gray.500' }}
        _hover={{
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500',
        }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500',
        }}
        bg='gray.50'
      />
      <Text textAlign='center' color='red' fontSize='10pt'>
        {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>

      <Button
        width='100%'
        height='36px'
        mt={2}
        mb={3}
        type='submit'
        isLoading={loading}
      >
        로그인
      </Button>
      <Flex fontSize='9pt' justifyContent='center' mb={2}>
        <Text mr={1} fontWeight={550}>
          비밀번호를 잃어버리셨나요?
        </Text>
        <Text
          color='blue.500'
          fontWeight={800}
          cursor='pointer'
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: 'resetPassword',
            }))
          }
        >
          비밀번호 찾기
        </Text>
      </Flex>
      <Flex fontSize='9pt' justifyContent='center'>
        <Text mr={1} fontWeight={550}>
          새로운 손님이세요? &nbsp;
        </Text>
        <Text
          color='blue.500'
          fontWeight={800}
          cursor='pointer'
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: 'signup',
            }))
          }
        >
          회원가입
        </Text>
      </Flex>
    </form>
  );
};

export default Login;
