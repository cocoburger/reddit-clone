import React, { useRef } from 'react';
import { Button, Flex } from '@chakra-ui/react';

type ImageUploadProps = {
  selectFile?: string;
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedTab: (value: string) => void;
  setSelectedFile: (value: string) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectFile,
  onSelectImage,
  setSelectedTab,
  setSelectedFile,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);

  return (
    <Flex justify='center' align='center' width='100%'>
      <Flex
        justify='center'
        align='center'
        p={20}
        border='1px dashed'
        borderColor='gray.200'
        width='100%'
        borderRadius={4}
      >
        <Button
          variant='outline'
          height='28px'
          onClick={() => selectedFileRef.current?.click()}
        >
          Upload
        </Button>
        <input
          ref={selectedFileRef}
          type='file'
          hidden
          onChange={onSelectImage}
        />
        <img src={selectFile} alt='file' />
      </Flex>
    </Flex>
  );
};

export default ImageUpload;
