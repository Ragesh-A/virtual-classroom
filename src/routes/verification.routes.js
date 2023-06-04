import InvitationVerification from "../pages/InvitationVerification";
import VerifySubscription from "../pages/verification/VerifySubscription";

const verifyRoute = {
  path:'/verify',
  children: [
    {
      path: 'instructor/:uuid/join/:organizationId',
      element: <InvitationVerification />
    },
    {
      path: 'subscription',
      element: <VerifySubscription />
    }
  ]
};

export default verifyRoute;