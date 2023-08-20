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
import { useRecoilState } from 'recoil';
import usePosts from '@/hooks/usePosts';
import { Post } from '@/atoms/postsAtom';
import PostItem from '@/components/Posts/PostItem';
import { useAuthState } from 'react-firebase-hooks/auth';

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
      console.log('getPost error : ', e);
    }
  };

  useEffect(() => {
    getPosts().then((r) => console.log(r));
  }, []);
  return (
    <>
      {postStateValue.posts.length > 0 &&
        postStateValue?.posts?.map((item, idx) => (
          <PostItem
            key={idx}
            userIsCreator={user?.uid === item.creatorId}
            post={item}
            userVoteValue={undefined}
            onVote={onVote}
            onDeletePost={onDeletePost}
            onSelectPost={onSelectPost}
          />
        ))}
    </>
  );
};

export default Posts;
