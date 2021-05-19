import React, { ReactElement } from "react";
import CarTable from "../../../../components/tables/CarTable";
import Layout from "../../../../components/adminDashboardLayout/layout";

interface Props {}

export default function CarList(props: Props): ReactElement {
  return (
    <Layout>
      <CarTable />
    </Layout>
  );
}
