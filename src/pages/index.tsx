import { NextPage } from 'next';
import PageContent from '@/components/Layout/PageContent';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/clientApp';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { communityState } from '@/atoms/communitiesAtom';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from '@firebase/firestore';
import usePosts from '@/hooks/usePosts';
import PostLoader from '@/components/Posts/PostLoader';
import { Stack } from '@chakra-ui/react';
import PostItem from '@/components/Posts/PostItem';
import CreatePostLink from '@/components/Community/CreatePostLink';
import { Post } from '@/atoms/postsAtom';

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  } = usePosts();
  const communityStateValue = useRecoilValue(communityState);

  const buildUserHomeFeed = () => {};

  const buildNoUserHomeFeed = async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, 'posts'),
        orderBy('voteStatus', 'desc'),
        limit(10),
      );
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as unknown as Post[],
      }));
    } catch (e) {
      console.log('buildNoUserHomeFeed error : ', e);
    }
    setLoading(false);
  };

  const getUserPostVotes = () => {};

  //useEffects
  useEffect(() => {
    if (!user && !loadingUser) buildNoUserHomeFeed();
  }, [user, loadingUser]);
  return (
    <PageContent>
      <>
        <CreatePostLink />
        {loading ? (
          <PostLoader />
        ) : (
          <Stack>
            {postStateValue.posts.map((post, idx) => (
              <PostItem
                post={post}
                key={post.creatorId + idx}
                onSelectPost={onSelectPost}
                onDeletePost={onDeletePost}
                onVote={onVote}
                userVoteValue={
                  postStateValue?.postVotes?.find(
                    (item) => item.postId === post?.id,
                  )?.voteValue
                }
                userIsCreator={user?.uid === post.creatorId}
                homePage
              />
            ))}
          </Stack>
        )}
      </>
      <>{/*recommendations*/}</>
    </PageContent>
  );
};
export default Home;
