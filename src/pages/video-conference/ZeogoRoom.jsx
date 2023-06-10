import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';

const ZeogoRoom = () => {
  const { meetupId } = useParams();

  const myMeeting = async () => {};

  return <div className="">{meetupId}</div>;
};

export default ZeogoRoom;
