import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { firestore } from '@/firebase/clientApp';
import { doc, getDoc } from '@firebase/firestore';
import { Community } from '@/atoms/communitiesAtom';
import safeJsonStringify from 'safe-json-stringify';
import CommunityNotFound from '@/components/Community/NotFound';
import Header from '@/components/Community/Header';
import PageContent from '@/components/Layout/PageContent';
import CreatePostLink from '@/components/Community/CreatePostLink';
type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  console.log(communityData);
  if (!communityData) {
    return <CommunityNotFound />;
  }
  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
        </>
        <>
          <div>RHS </div>
        </>
      </PageContent>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // get community data and pass it to clinet => firebase db에 있는 실제 데이터를 가져오는 방법은 아래와 같다.
  // 함수는 DocumentReference 인스턴스를 반환합니다.
  // 이 인스턴스는 Firestore 데이터베이스에서 문서를 참조하는 데 사용됩니다.
  // 반환된 DocumentReference 인스턴스는 firestore 인스턴스의 communities 컬렉션 내에서 context.query.communityId 값과 일치하는 문서를 참조합니다.
  // 이 문서 참조를 사용하여 해당 문서의 데이터를 가져올 수 있습니다.
  try {
    const communityDocRef = doc(
      firestore,
      'communities',
      context.query.communityId as string,
    );
    console.log(communityDocRef);
    //getDoc() 함수를 사용하여 문서 참조에서 해당 문서의 데이터를 가져옵니다.
    const communityDoc = await getDoc(communityDocRef);
    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({
                id: communityDoc.id,
                ...communityDoc.data(),
              }),
            )
          : {},
      },
    };
  } catch (error) {
    //CLOUD ADD ERROR PAGE HERE
    // 아래 에러가 발생했기에 return을 해주었다.
    // error - Error: Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?
    console.log(`getServerSideprops error: ${error}`);
    console.error(`getServerSideprops error: ${error}`);
    return {
      props: {
        communityData: {},
      },
    };
  }
}

export default CommunityPage;
