import React, {useState} from 'react'
import {useSetRecoilState} from "recoil";
import {authModalState} from "@/atoms/authModalAtom";
import {useSendPasswordResetEmail, useSignInWithEmailAndPassword} from "react-firebase-hooks/auth";
import {auth} from "@/firebase/clientApp";
import {Button, Flex, Icon, Input, Text} from "@chakra-ui/react";
import {FIREBASE_ERRORS} from "@/firebase/errors";
import {BsReddit} from "react-icons/all";
import {Form} from "@chakra-ui/theme/dist/components";


const ResetPassword: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);


  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await sendPasswordResetEmail(email);
    setSuccess(true);

  };
  return (
      <Flex direction='column' alignItems='center' width='100%'>
        <Icon as={BsReddit} color='brand.100' fontSize={40} mb={2}/>
        <Text>Reset your Password</Text>
        {success ? (
            <Text mb={4}> Check your email</Text>
        ) : (
            <>
              <Text fontSize='sm' textAlign='center' mb={2}>
                입력한 이메일로 비밀번호 초기화 링크를 보내드립니다..\n
                이메일을 입력해주세요
              </Text>
              <form onSubmit={onSubmit} style={{width: '100%'}}>
                <Input/>

              </form>
            </>
        )}
      </Flex>

  );
};

export default ResetPassword
