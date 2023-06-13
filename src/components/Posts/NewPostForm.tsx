import React, { useState } from 'react';
import { Flex, Icon } from '@chakra-ui/react';
import { BiPoll } from 'react-icons/bi';
import { IoImageOutline, IoDocumentText } from 'react-icons/io5';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import TabItem from '@/components/Posts/TabItem';

type NewPostFormProps = {
  children: React.ReactNode;
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

const NewPostForm: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(formTab[0].title);

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
    </Flex>
  );
};

export default NewPostForm;
