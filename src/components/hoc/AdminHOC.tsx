import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

const AdminHOC: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const hasLocalStorage = typeof window !== "undefined";
  const router = useRouter();

  const { data, isLoading, isError } = trpc.useQuery(
    [
      "admin.me",
      {
        Authorization: hasLocalStorage
          ? `Bearer ${localStorage.getItem("arzon-admin-token")}` ?? ""
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
    return <div suppressHydrationWarning>{children}</div>;
  }

  return <div></div>;
};

export default AdminHOC;
