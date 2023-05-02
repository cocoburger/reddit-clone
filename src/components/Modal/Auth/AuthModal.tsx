import { authModalState } from '@/atoms/authModalAtom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import AuthInputs from './AuthInputs';
import OAuthButtons from './OAuthButtons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import ResetPassword from '@/components/Modal/Auth/ResetPassword';

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth);
  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  useEffect(() => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  }, [user]);

  useEffect(() => {
    if (user) handleClose();
  }, [user]);

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center'>
            {modalState.view === 'login' && 'Login'}
            {modalState.view === 'signup' && 'Sign up'}
            {modalState.view === 'resetPassword' && 'Reset Password'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display='flex' flexDirection='column' alignItems='center' justifyContent='center' pb={6}>
            <Flex direction='column' align='center' justify='center' width='70%'>
              {modalState.view === 'login' || modalState.view === 'signup' ? (
                <>
                  <OAuthButtons />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                      margin: '5% 0 5% 0',
                    }}
                  >
                    <span
                      style={{
                        borderTop: '1px solid #edeff1',
                        width: '40%',
                        marginTop: '2px',
                      }}
                    ></span>
                    <Text color='gray.500' fontWeight={700} mb={1} style={{ fontSize: '14px', lineHeight: '8px' }}>
                      OR
                    </Text>
                    <span style={{ borderTop: '1px solid #edeff1', width: '40%' }}></span>
                  </div>
                  <AuthInputs />
                </>
              ) : (
                <ResetPassword />
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
