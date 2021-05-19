import React, { ReactElement } from "react";
import BookingTable from "../../../../components/tables/BookingTable";
import Layout from "../../../../components/adminDashboardLayout/layout";

interface Props {}

export default function BookingList(props: Props): ReactElement {
  return (
    <Layout>
      <BookingTable />
    </Layout>
  );
}
