import React from 'react';
import { Post } from '@/atoms/postsAtom';
import { Text, Flex, Icon, Stack } from '@chakra-ui/react';
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
} from 'react-icons/io5';

type PostItemProps = {
  post?: Post;
  userIsCreator?: boolean;
  userVoteValue?: number;
  onVote?: () => {};
  onSelectPost?: () => void;
  onDeletePost?: () => {};
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onSelectPost,
  onDeletePost,
}) => {
  return (
    <Flex
      border='1px solid'
      bg='white'
      borderColor='gray.300'
      borderRadius={4}
      _hover={{ borderColor: 'gray.500' }}
      cursor='pointer'
      onClick={onSelectPost}
    >
      <Flex
        direction='column'
        align='center'
        width='40px'
        p={2}
        borderRadius={4}
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? 'brand.100' : 'gray.400'}
          fontSize={22}
          onClick={onVote}
          cursor='pointer'
        />
        <Text fontSize='9pt'>{post.voteStatus}</Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === 1 ? '#4379ff' : 'gray.400'}
          fontSize={22}
          cursor='pointer'
          onClick={onVote}
        />
      </Flex>
      <Flex direction='column' width='100%'>
        <Stack spacing={1} p='10px'>
          <Stack direction='row' spacing={0.6} align='center' fontSize='9pt'>
            {/*{home page check}*/}
            <Text> Posted by u/{post.creatorDisplayName}</Text>
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default PostItem;
