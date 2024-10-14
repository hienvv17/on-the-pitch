"use client";
import GoogleLogin from "@/components/firebase/popup-login";
// import { auth, googleProvider } from "@/firebase/firebase";
import { authQuery } from "@/hooks/auth";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { mutate: login, isPending } = authQuery.mutation.useLogin();

  const handleLogin = async () => {
    try {
      const data = await GoogleLogin();
      console.log(data);
      const idToken = await data?.user.getIdToken();
      const response = login({
        access_token: idToken || "",
        result: data?.result || "",
      });
      console.log(response);
      router.push("/home");
    } catch (error) {}
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <button
          className={
            "w-full py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 w-full bg-black text-white"
          }
          onClick={handleLogin}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

