import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  Community,
  CommunitySnippet,
  communityState,
} from '@/atoms/communitiesAtom';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from '@firebase/firestore';
import { auth, firestore } from '@/firebase/clientApp';
import { authModalState } from '@/atoms/authModalAtom';
const UseCommunityData = () => {
  const [user] = useAuthState(auth);
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean,
  ) => {
    // is the user signed in?
    // if not => open auth modal
    if (!user) {
      // open modal
      setAuthModalState({ open: true, view: 'login' });
      return;
    }
    setLoading(true);
    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };

  const joinCommunity = async (communityData: Community) => {
    // batch write

    try {
      const batch = writeBatch(firestore);
      // creating a nwe community snippet
      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || '',
      };
      // updating the numberOfMembers
      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          communityData.id,
        ),
        newSnippet,
      );

      batch.update(doc(firestore, `communities`, communityData.id), {
        numberOfMembers: increment(1),
      });

      await batch.commit();

      // update recoil state - communityState.mySnippets
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (e) {
      console.log('Join community error', e);
      setError(e.message);
    }
    setLoading(false);
  };
  const leaveCommunity = async (communityId: string) => {
    try {
      // batch write
      const batch = writeBatch(firestore);

      // deleting a nwe community snippet from user
      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets/${communityId}`),
      );
      // updating the numberOfMembers(-1)
      batch.update(doc(firestore, `communities`, communityId), {
        numberOfMembers: increment(-1),
      });
      await batch.commit();
      // update recoil state - communityState.mySnippets
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (snippet) => snippet.communityId !== communityId,
        ),
      }));
    } catch (e: any) {
      console.log('leave community error', e);
      setError(e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user) return;
    getMySnippets();
  }, [user]);

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
    } catch (error: any) {
      console.log('getMySnippets error : ' + error);
      setError('getMySnippets error : ' + error);
    }
    setLoading(false);
  };

  return {
    // data a nd functions
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};

export default UseCommunityData;
