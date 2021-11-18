import { useSession } from "next-auth/react";
import Loading from "../UI/Loading";
import { useRouter } from "next/router";

function AuthGuard(props) {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <Loading />;
  } else if (status === "authenticated") {
    return <>{props.children} </>;
  } else if (status === "unauthenticated") {
    router.push("/signin");
    return null;
  }
}

export default AuthGuard;
