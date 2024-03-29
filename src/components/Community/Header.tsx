import React from 'react';
import { Community } from '@/atoms/communitiesAtom';
import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { FaReddit } from 'react-icons/fa';
import useCommunityData from '@/hooks/useCommunityData';

type HeaderProps = {
  communityData: Community;
};
const Header: React.FC<HeaderProps> = ({ communityData }) => {
  const { communityStateValue, onJoinOrLeaveCommunity, loading } =
    useCommunityData();
  // undefined는 논리적인 참과 거짓을 나타내는 불리언 값 중 하나입니다.
  // 따라서 !! 논리 부정 연산자를 사용하여 undefined 값을 불리언 값으로 변환할 수 있습니다.
  const isJoined = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === communityData.id,
  );
  return (
    <Flex direction='column' width='100%' height='146px'>
      <Box height='50%' bg='blue.400' />
      <Flex justify='center' bg='white' flexGrow={1}>
        <Flex width='95%' maxWidth='860px' border='1px solid red'>
          {communityData.imageURL ? (
            <Image />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              position='relative'
              top={-3}
              border='4px solid white'
              borderRadius='50%'
            />
          )}
          <Flex padding='10px 16px'>
            <Flex direction='column' mr={6}>
              <Text fontWeight={800} fontSize='16pt'>
                {communityData?.id}
              </Text>
              <Text fontWeight={600} fontSize='10pt' color='gray.400'>
                r/{communityData?.id}
              </Text>
            </Flex>
            <Button
              variant={isJoined ? 'outline' : 'solid'}
              height='30px'
              pr={6}
              pl={6}
              onClick={() => {
                onJoinOrLeaveCommunity(communityData, isJoined);
              }}
              isLoading={loading}
            >
              {isJoined ? 'Joined' : 'Join'}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
