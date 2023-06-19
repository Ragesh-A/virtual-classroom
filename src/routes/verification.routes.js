import { Suspense, lazy } from "react";

const InvitationVerification = lazy(()=> import("../pages/InvitationVerification"));
const VerifySubscription = lazy(()=> import("../pages/verification/VerifySubscription"));

const verifyRoute = {
  path:'/verify',
  children: [
    {
      path: 'instructor/:uuid/join/:organizationId',
      element: <Suspense><InvitationVerification /></Suspense>
    },
    {
      path: 'subscription',
      element:<Suspense><VerifySubscription /></Suspense>
    }
  ]
};

export default verifyRoute;