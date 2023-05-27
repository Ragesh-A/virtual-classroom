import InvitationVerification from "../pages/InvitationVerification";

const verifyRoute = {
  path:'/verify',
  children: [
    {
      path: 'instructor/join/:organizationId',
      element: <InvitationVerification />
    }
  ]
};

export default verifyRoute;