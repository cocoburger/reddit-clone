import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import Link from 'next/link';

const CommunityNotFound: React.FC = () => {
  return (
    <Flex
      direction='column'
      justifyContent='center'
      alignItems='center'
      minHeight='60vh'
    >
      <p>죄송합니다, 커뮤니티가 존재하지 않거나 정지당한 커뮤니티입니다.</p>
      <Link href='/'>
        <Button mt={5}>홈으로 가기</Button>
      </Link>
    </Flex>
  );
};

export default CommunityNotFound;
