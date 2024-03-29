import React from 'react';
import { Button, Flex, Input, Stack, Textarea } from '@chakra-ui/react';

type TextInputProps = {
  textInputs: {
    title: string;
    body: string;
  };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleCreatePost: () => void;
  loading: boolean;
};

const TextInput: React.FC<TextInputProps> = ({
  textInputs,
  onChange,
  handleCreatePost,
  loading,
}) => {
  return (
    <Stack spacing={3} width='95%'>
      <Input
        name='title'
        value={textInputs.title}
        onChange={onChange}
        fontSize='10pt'
        borderRadius={4}
        placeholder='Title'
        _placeholder={{ color: 'gray.500' }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'black',
        }}
        mt={2}
        ml={2}
      />
      <Textarea
        name='body'
        value={textInputs.body}
        onChange={onChange}
        fontSize='10pt'
        borderRadius={4}
        height='100px'
        placeholder='Text (optional)'
        _placeholder={{ color: 'gray.500' }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'black',
        }}
        style={{ marginLeft: '0.5rem' }}
      />
      <Flex justify='flex-end'>
        <Button
          height='34px'
          padding='0px 30px'
          isDisabled={!textInputs.title}
          isLoading={loading}
          onClick={handleCreatePost}
          mb={2}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};

export default TextInput;
