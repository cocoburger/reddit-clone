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

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const { setPostStateValue } = usePosts();
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
    } catch (e) {
      console.log('buildNoUserHomeFeed error : ', e);
    }
  };

  const getUserPostVotes = () => {};

  //useEffects
  useEffect(() => {
    if (!user && !loadingUser) buildNoUserHomeFeed();
  }, [user, loadingUser]);
  return (
    <PageContent>
      <>{/*postFeed*/}</>
      <>{/*recommendations*/}</>
    </PageContent>
  );
};
export default Home;
