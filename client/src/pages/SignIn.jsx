import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => (
  <div className="flex justify-center items-center min-h-screen">
    <SignIn path="/login" routing="path" />
  </div>
);

export default SignInPage;