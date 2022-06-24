import type { NextPage } from "next";
import { useRouter } from "next/router";
import AdminHOC from "../../components/hoc/AdminHOC";
import { trpc } from "../../utils/trpc";

const AdminPage: NextPage = () => {
  return (
    <AdminHOC>
      <div>ok</div>
    </AdminHOC>
  );
};

export default AdminPage;
