import React, { useEffect, useState } from 'react';
import { Community } from '@/atoms/communitiesAtom';
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from '@firebase/firestore';
import { auth, firestore } from '@/firebase/clientApp';
import usePosts from '@/hooks/usePosts';
import PostItem from '@/components/Posts/PostItem';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Stack } from '@chakra-ui/react';
import PostLoader from '@/components/Posts/PostLoader';

type PostsProps = {
  communityData: Community;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  const {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  } = usePosts();
  const getPosts = async () => {
    try {
      setLoading(true);
      //get posts for this community
      const postsQuery = query(
        collection(firestore, 'posts'),
        where('communityId', '==', communityData.id),
        orderBy('createdAt', 'desc'),
      );

      const postDocs = await getDocs(postsQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev: any) => ({
        ...prev,
        posts: posts,
      }));
    } catch (e) {
      setLoading(false);
      console.log('getPost error : ', e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPosts().then((r) => console.log(r));
  }, []);
  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {postStateValue.posts.length > 0 &&
            postStateValue?.posts?.map((item) => (
              <PostItem
                key={item.creatorId}
                userIsCreator={user?.uid === item.creatorId}
                post={item}
                userVoteValue={undefined}
                onVote={onVote}
                onDeletePost={onDeletePost}
                onSelectPost={onSelectPost}
              />
            ))}
        </Stack>
      )}
    </>
  );
};

export default Posts;
