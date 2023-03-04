import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { firestore } from '@/firebase/clientApp';
import { doc, getDoc } from '@firebase/firestore';
import { Community } from '@/atoms/communitiesAtom';
import safeJsonStringify from 'safe-json-stringify';
type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  console.log();
  return <div>WELCOME TO {communityData?.id}</div>;
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
    //getDoc() 함수를 사용하여 문서 참조에서 해당 문서의 데이터를 가져옵니다.
    const communityDoc = await getDoc(communityDocRef);
    return {
      props: {
        communityData: JSON.parse(
          safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() }),
        ),
      },
    };
  } catch (error) {
    //CLOUD ADD ERROR PAGE HERE
    console.log(`getServerSideprops error: ${error}`);
  }
}

export default CommunityPage;
