import React from 'react';
import { Community } from '@/atoms/communitiesAtom';
import { Box, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { FaReddit } from 'react-icons/fa';

type HeaderProps = {
  communityData: Community;
};
const Header: React.FC<HeaderProps> = ({ communityData }) => {
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
          <Flex>
            <Flex>
              <Text fontWeight={800} fontSize='16pt'>
                {communityData?.id}
              </Text>
              <Text fontWeight={600} fontSize='10pt'>
                {communityData?.id}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
