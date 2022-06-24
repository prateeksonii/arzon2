import type { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

const AdminPage: NextPage = () => {
  const hasLocalStorage = typeof window !== "undefined";
  const router = useRouter();

  const { data, isLoading, isError } = trpc.useQuery(
    [
      "admin.me",
      {
        Authorization: hasLocalStorage
          ? `Bearer ${localStorage.getItem("arzon-token")}` ?? ""
          : "",
      },
    ],
    {
      enabled: hasLocalStorage,
      retry: false,
    }
  );

  if (isLoading) {
    return <div suppressHydrationWarning>Loading...</div>;
  }

  if (isError) {
    router.replace("/admin/login");
  }

  if (data?.ok) {
    return <div suppressHydrationWarning>admin</div>;
  }

  return <div></div>;
};

export default AdminPage;
