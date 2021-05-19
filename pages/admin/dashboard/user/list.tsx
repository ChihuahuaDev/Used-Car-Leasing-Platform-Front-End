import React, { ReactElement } from "react";
import UserTable from "../../../../components/tables/UserTable";
import Layout from "../../../../components/adminDashboardLayout/layout";

interface Props {}

export default function UserList(props: Props): ReactElement {
  return (
    <Layout>
      <UserTable />
    </Layout>
  );
}
