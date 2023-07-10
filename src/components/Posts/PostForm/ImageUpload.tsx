import React, { useRef } from 'react';
import { Button, Flex, Stack, Image } from '@chakra-ui/react';

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
    <Flex direction='column' justify='center' align='center' width='100%'>
      {selectFile ? (
        <>
          <Image src={selectFile} maxWidth='400px' maxHeight='400px' />
          <Stack direction='row' mt={4}>
            <Button height='28px' onClick={() => setSelectedTab('Post')}>
              Back to Post
            </Button>
            <Button
              variant='outline'
              height='28px'
              onClick={() => setSelectedFile('')}
            >
              Remove
            </Button>
          </Stack>
        </>
      ) : (
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
          <img src={selectFile} alt='' />
        </Flex>
      )}
    </Flex>
  );
};

export default ImageUpload;
