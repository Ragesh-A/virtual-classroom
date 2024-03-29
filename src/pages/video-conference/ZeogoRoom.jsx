import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useNavigate, useParams } from 'react-router-dom';
import { ZEGO_SERVER_SECRET, zegoAppId } from '../../constant/constant';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Maintenance from '../Maintenance';

const ZeogoRoom = () => {
  const { meetupId } = useParams();
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [myMeeting, setMyMeeting] = useState();

  // generate Kit Token
  // useEffect(() => {
  //   const meeting = async (element) => {
  //     try {
  //       const appID = zegoAppId;
  //       const serverSecret = ZEGO_SERVER_SECRET;
  //       const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
  //         appID,
  //         serverSecret,
  //         meetupId,
  //         user?._id,
  //         Date.now().toString()
  //       );
  //       // Create instance object from Kit Token.
  //       const zp = ZegoUIKitPrebuilt.create(kitToken);
  //       zp.joinRoom({
  //         container: element,
  //         // sharedLinks: [
  //         //   {
  //         //     name: 'Personal link',
  //         //     url:
  //         //      window.location.protocol + '//' +
  //         //      window.location.host + window.location.pathname +
  //         //       '?roomID=' +
  //         //       meetupId,
  //         //   },
  //         // ],
  //         scenario: {
  //           mode: ZegoUIKitPrebuilt.VideoConference,
  //         },
  //       });
  //     } catch (error) {
  //       navigate('/meetup');
  //     }
  //   };
  //   setMyMeeting(meeting);
  //   return ()=>{
  //     setMyMeeting(false)
  //   }
  // }, [meetupId, navigate, user?._id]);

  return (
    <div className="flex justify-center items-center h-[100vh]">
      {/* <div className="" ref={myMeeting} /> */}
      <Maintenance />
    </div>
  );
};

export default ZeogoRoom;
