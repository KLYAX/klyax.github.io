import React, { Component } from "react";
import UseCasesStatisticTable from "./UseCasesStatisticTable";
import UseCasesStatisticAccordions from "./UseCasesStatisticAccordions";

const UseCasesStatistic = ({ data }) => {
  return (
    <div className="products-use-cases-statistic">
      <UseCasesStatisticTable data={data} />
      <UseCasesStatisticAccordions data={data} />
    </div>
  );
};

export default UseCasesStatistic;
