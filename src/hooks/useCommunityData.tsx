import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  Community,
  CommunitySnippet,
  communityState,
} from '@/atoms/communitiesAtom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, getDocs } from '@firebase/firestore';
import { auth, firestore } from '@/firebase/clientApp';

const UseCommunityData = () => {
  const [user] = useAuthState(auth);
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean,
  ) => {
    // is the user signed in?
    // if not => open auth modal

    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };

  const getMySnippets = async () => {
    setLoading(true);
    try {
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`),
      );

      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
      }));
      console.log('here are snippets', snippets);
    } catch (error) {
      setError('getMySnippets error : ' + error);
    }
  };
  const joinCommunity = (communityData: Community) => {};
  const leaveCommunity = (communityId: string) => {};

  useEffect(() => {
    if (!user) return;
    getMySnippets();
  }, [user]);
  return {
    // data a nd functions
    communityStateValue,
    onJoinOrLeaveCommunity,
  };
};

export default UseCommunityData;
