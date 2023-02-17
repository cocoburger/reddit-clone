import {Flex, Image} from "@chakra-ui/react";
import React from "react";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/firebase/clientApp";
import Directory from "@/components/Layout/Navbar/Directory/Directory";
import firebase from "firebase/compat";


/**
 * base: none은 모바일사이즈에서는 해당 이미지를 안보여주겠다, md(medium size)에서는 보여주겠다.
 */
const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
      <Flex bg="white" height="44px" padding="6px 12px" justify={{md: 'space-between'}}>
        <Flex align="center" width={{base: '40px', md: 'auto'}} mr={{base: 0, md: 2}}>
          <Image src="/images/redditFace.svg" alt="logo" height="30px"/>
          <Image
              src="/images/redditText.svg"
              alt="logo"
              height="46px"
              display={{base: "none", md: "unset"}}
          />
        </Flex>
        {user && <Directory/>}
        <SearchInput user={user}/>
        <RightContent user={user}/>
      </Flex>
  );
};

export default Navbar;
