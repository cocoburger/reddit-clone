import {SearchIcon} from "@chakra-ui/icons";
import {Flex, Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import React from "react";
import {User} from "firebase/auth";

type SearchInputProps = {
  user?: User | null;
};

// eslint-disable-next-line valid-jsdoc
/**
 * _hover _focus 처럼 언더바 다음에 event name으로 설정 시 해당 이벤트 발생 시 style
 * 변경이 된다.
 * _hover에 bg를 white로 변경해서 호버 시에 인풋창이 color가 화이트로 변해 hover에 기능을
 * 잘 보여주는 styling이라고 생각한다.
 */
const SearchInput: React.FC<SearchInputProps> = ({user}) => {
  return (
      <Flex flexGrow={1} maxWidth={user ? 'auto' : '600px'} mr={2} align="center">
        <InputGroup>
          {/* eslint-disable-next-line react/no-children-prop */}
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.400" mb={1}/>}/>
          <Input
              placeholder="Search Reddit"
              fontSize="10pt"
              _placeholder={{color: "gary:500"}}
              _hover={{
                bg: "white",
                border: "1px solid",
                borderColor: "blue.500",
              }}
              _focus={{
                outline: "none",
                border: "1px solid",
                borderColor: "blue.500",
              }}
              height="34px"
              bg="gray.50"
          />
        </InputGroup>
      </Flex>
  );
};

export default SearchInput;
