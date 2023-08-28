import React, { useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { BiPoll } from 'react-icons/bi';
import { IoImageOutline, IoDocumentText } from 'react-icons/io5';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import TabItem from './TabItem';
import TextInput from '@/components/Posts/PostForm/TextInput';
import ImageUpload from '@/components/Posts/PostForm/ImageUpload';
import { Post } from '@/atoms/postsAtom';
import { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from '@firebase/firestore';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import { firestore, storage } from '@/firebase/clientApp';

type NewPostFormProps = {
  user: User;
  communityImageURL?: string;
};

const formTab = [
  {
    title: 'Post',
    icon: IoDocumentText,
  },
  {
    title: 'Image & Video',
    icon: IoImageOutline,
  },
  {
    title: 'Link',
    icon: BsLink45Deg,
  },
  {
    title: 'Poll',
    icon: BiPoll,
  },
  {
    title: 'Talk',
    icon: BsMic,
  },
];

export type TabItemProps = {
  title: string;
  icon: typeof Icon.arguments;
};

const NewPostForm: React.FC<NewPostFormProps> = ({
  user,
  communityImageURL,
}) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(formTab[0].title);
  const [textInput, setTextInput] = useState({
    title: '',
    body: '',
  });
  const [selectFile, setSelectedFile] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleCreatePost = async () => {
    const { communityId } = router.query;
    //create new post object => type Post
    const newPost: Post = {
      communityId: communityId as string,
      communityImageURL: communityImageURL || '',
      creatorId: user?.uid,
      creatorDisplayName: user.email?.split('@')[0],
      title: textInput.title,
      body: textInput.body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
    };

    setLoading(true);
    try {
      // store the post in db
      const postDocRef = await addDoc(collection(firestore, 'posts'), newPost);

      //check for selectedFile
      if (selectFile) {
        // store in storage => getDownloadURL (return imageURL)
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectFile, 'data_url');
        const downloadURL = await getDownloadURL(imageRef);

        // UPDATE POST DOC by adding imageURL
        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
      }

      //redirect the user to the communityPage using the router
      router.back();
    } catch (e: any) {
      console.log('handlecreatePost error', e.message);
      setError(true);
    }
    setLoading(false);
  };

  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
    }

    reader.onloadend = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };

  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {
      target: { name, value },
    } = event;
    setTextInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Flex direction='column' bg='white' borderRadius={4} mt={2}>
      <Flex width='100%'>
        {formTab.map((item) => (
          <TabItem
            key={item.title}
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex p={4}>
        {selectedTab === 'Post' && (
          <TextInput
            textInputs={textInput}
            handleCreatePost={handleCreatePost}
            onChange={onTextChange}
            loading={loading}
          />
        )}
        {selectedTab === 'Image & Video' && (
          <ImageUpload
            selectFile={selectFile}
            onSelectImage={onSelectImage}
            setSelectedFile={setSelectedFile}
            setSelectedTab={setSelectedTab}
          />
        )}
      </Flex>
      {error && (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle mr={2}>Error creating Post</AlertTitle>
          <AlertDescription>
            문제가 계속 발생하면 고객센터에 문의하세요.
          </AlertDescription>
        </Alert>
      )}
    </Flex>
  );
};

export default NewPostForm;
