import React, { useState } from 'react';
import { Flex, Icon } from '@chakra-ui/react';
import { BiPoll } from 'react-icons/bi';
import { IoImageOutline, IoDocumentText } from 'react-icons/io5';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import TabItem from './TabItem';
import TextInput from '@/components/Posts/PostForm/TextInput';
import ImageUpload from '@/components/Posts/PostForm/ImageUpload';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const formTabs: TabItem[] = [];

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

const NewPostForm: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(formTab[0].title);
  const [textInput, setTextInput] = useState({
    title: '',
    body: '',
  });
  const [selectFile, setSelectedFile] = useState<string>();
  const [loading, setLoading] = useState(false);
  const handleCreatePost = async () => {};

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
    </Flex>
  );
};

export default NewPostForm;
