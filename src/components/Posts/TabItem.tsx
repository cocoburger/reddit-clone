import React from 'react';
import { TabItemProps } from '@/components/Posts/NewPostForm';
import { Flex, Icon, Text } from '@chakra-ui/react';

type TabItemType = {
  item: TabItemProps;
  selected: boolean;
  setSelectedTab: (value: string) => void;
};

const TabItem: React.FC<TabItemType> = ({ item, selected }) => {
  return (
    <Flex
      align='center'
      justify='center'
      flexGrow={1}
      p='14px 0px'
      cursor='pointer'
      _hover={{ bg: 'gray.50' }}
      color={selected ? 'blue.500' : 'gray.500'}
      borderWidth={selected ? '0px 1px 2px 0px' : '0px 1px 1px 0px'}
      borderBottomColor={selected ? 'blue.500' : 'gray.200'}
      borderRightColor='gray.200'
      onClick={() => {}}
    >
      <Flex>
        <Icon as={item.icon} />
      </Flex>
      <Text fontSize='10pt'>{item.title}</Text>
    </Flex>
  );
};

export default TabItem;
