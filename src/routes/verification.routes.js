import InvitationVerification from "../pages/InvitationVerification";

const verifyRoute = {
  path:'/verify',
  children: [
    {
      path: 'instructor/:uuid/join/:organizationId',
      element: <InvitationVerification />
    }
  ]
};

export default verifyRoute;