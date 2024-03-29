import React, { useState } from 'react';
import { Post } from '@/atoms/postsAtom';
import { Text, Flex, Icon, Stack, Image, Skeleton } from '@chakra-ui/react';
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from 'react-icons/io5';
import { FaReddit } from 'react-icons/fa';
import { BsDot } from 'react-icons/bs';
import moment from 'moment';
import { BsChat } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import Link from 'next/link';

type PostItemProps = {
  post?: Post;
  userIsCreator?: boolean;
  userVoteValue?: number;
  onVote?: () => {};
  onSelectPost?: () => void;
  onDeletePost?: () => {};
  homePage?: boolean;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onSelectPost,
  onDeletePost,
  homePage,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
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
        bg='gray.100'
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
            {homePage && (
              <>
                {post.communityImageURL ? (
                  <Image
                    src={post.communityImageURL}
                    borderRadius='full'
                    boxSize='18px'
                    mr={2}
                  />
                ) : (
                  <Icon as={FaReddit} fontSize='18pt' mr={1} color='blue.500' />
                )}
                <Link href={`r/${post.communityId}`}>
                  <Text
                    fontWeight={700}
                    _hover={{ textDecoration: 'underline' }}
                  >
                    {`r/${post.communityId}`}
                  </Text>
                </Link>
                <Icon as={BsDot} color='gray.500' fontSize={8} />
              </>
            )}
            <Text>
              Posted by u/{post.creatorDisplayName} {''}{' '}
            </Text>
            <Text style={{ marginLeft: '10px' }}>
              {' '}
              {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          </Stack>
          <Text fontSize='12pt' fontWeight={600}>
            {post.title}
          </Text>
          <Text fontSize='10pt'>{post.body}</Text>
          {post.imageURL && (
            <Flex justify='center' align='center' p={2}>
              {loadingImage && (
                <Skeleton height='200px' width='100%' borderRadius={4} />
              )}
              <Image
                src={post.imageURL}
                alt='post image'
                maxHeight='460px'
                display={loadingImage ? 'none' : 'unset'}
                onLoad={() => setLoadingImage(false)}
              />
            </Flex>
          )}
        </Stack>
        <Flex ml={1} mb={0.5} color='gray.500' fontWeight={600}>
          <Flex
            align='center'
            p='8px 10px'
            borderRadius={4}
            _hover={{ bg: 'gray.200' }}
            cursor='pointer'
          >
            <Icon as={BsChat} mr={2} />
            <Text fontSize='9pt'>{post.numberOfComments}</Text>
          </Flex>
          <Flex
            align='center'
            p='8px 10px'
            borderRadius={4}
            _hover={{ bg: 'gray.200' }}
            cursor='pointer'
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text fontSize='9pt'>Share</Text>
          </Flex>
          <Flex
            align='center'
            p='8px 10px'
            borderRadius={4}
            _hover={{ bg: 'gray.200' }}
            cursor='pointer'
          >
            <Icon as={IoBookmarkOutline} mr={2} />
            <Text fontSize='9pt'>Save</Text>
          </Flex>
          {userIsCreator && (
            <Flex
              align='center'
              p='8px 10px'
              borderRadius={4}
              _hover={{ bg: 'gray.200' }}
              cursor='pointer'
              onClick={onDeletePost}
            >
              <Icon as={AiOutlineDelete} mr={2} />
              <Text fontSize='9pt'>Delete</Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PostItem;
