import React from 'react';
import {ChevronDownIcon} from "@chakra-ui/icons";
import {Menu, MenuButton, MenuDivider, MenuItem, MenuList} from "@chakra-ui/menu";
import {Button, Flex, Icon} from "@chakra-ui/react";
import {signOut, User} from 'firebase/auth';
import {FaRedditSquare} from "react-icons/all";
import {VscAccount} from "react-icons/all";
import {IoSparkles} from "react-icons/io5";
import {CgProfile} from "react-icons/cg";
import {MdOutlineLogin} from "react-icons/all";
import {auth} from "@/firebase/clientApp";

// ?(oprional propertise) 선택적 속성
// ?가 없다면 user는 필수값이지만, ?를 붙여준다면 optional이 된다.
// https://devblogs.microsoft.com/typescript/walkthrough-interfaces/#Subsection_64
type UserMenuProps = {
  user?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({user}) => {
  return (
      <Menu>
        <MenuButton cursor='pointer' padding='0px 6px' borderRadius={4}
                    _hover={{outline: '1px solid', outlineColor: 'gray.200'}}>
          <Flex>
            <Flex align='center'>
              {user ? (
                  <>
                    <Icon fontSize={24} mr={1} color='gray.300' as={FaRedditSquare}/>
                  </>
              ) : (
                  <Icon fontSize={24} color='gary.400' mr={1} as={VscAccount}/>
              )}
            </Flex>
            <ChevronDownIcon/>
          </Flex>
        </MenuButton>
        <MenuList>
          {user ? (
              <>
                <MenuItem fontSize='10pt' fontWeight={700} _hover={{bg: 'blue.500', color: 'white'}}>
                  <Flex align='center'>
                    <Icon fontSize={20} mr={2} as={CgProfile}/>
                    프로필
                  </Flex>
                </MenuItem>
                <MenuDivider/>
                <MenuItem fontSize='10pt' fontWeight={700} _hover={{bg: 'blue.500', color: 'white'}}
                          onClick={() => {
                            signOut(auth)
                          }}
                >
                  <Flex align='center'>
                    <Icon fontSize={20} mr={2} as={MdOutlineLogin}/>
                    로그아웃
                  </Flex>
                </MenuItem>
              </>
          ) : (
              <>
                <MenuItem fontSize='10pt' fontWeight={700} _hover={{bg: 'blue.500', color: 'white'}}
                          onClick={() => {
                            signOut(auth)
                          }}
                >
                  <Flex align='center'>
                    <Icon fontSize={20} mr={2} as={MdOutlineLogin}/>
                    로그인 / 로그아웃
                  </Flex>
                </MenuItem>
              </>
          )}
        </MenuList>
      </Menu>
  );
}

export default UserMenu;