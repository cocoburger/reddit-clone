import React from 'react';
import PageContent from '@/components/Layout/PageContent';
import { Box, Text } from '@chakra-ui/react';
import NewPostForm from '@/components/Posts/NewPostForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import useCommunityData from '@/hooks/useCommunityData';

const SubmitPostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const { communityStateValue } = useCommunityData();
  return (
    <PageContent>
      <>
        <Box p='14px 0px' borderBottom='1px solid' borderColor='white'>
          <Text>Create a Post</Text>
        </Box>
        {/*New Post*/}
        {user && (
          <NewPostForm
            user={user}
            communityImageURL={communityStateValue?.communityImageURL?.imageURL}
          />
        )}
      </>
      <>{/*about*/}</>
    </PageContent>
  );
};

export default SubmitPostPage;
