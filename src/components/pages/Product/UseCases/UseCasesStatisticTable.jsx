import React, { Component, createRef } from "react";
import UseCasesStatisticChartBar from "./UseCasesStatisticChartBar";
import { withTranslation } from "react-i18next";
import gsap from "gsap/gsap-core";

class UseCasesStatisticTable extends Component {
  constructor(props) {
    super(props);

    this.tableRef = createRef();
  }

  componentDidMount() {
    const tableEl = this.tableRef.current;
    const headEl = tableEl.querySelector(
      ".products-use-cases-statistic-table__head"
    );

    const bodyEl = tableEl.querySelector(
      ".products-use-cases-statistic-table__body"
    );

    const bodyLabels = bodyEl.querySelectorAll(
      ".products-use-cases-statistic-table__cell:nth-child(1) .products-use-cases-statistic-table__cell-body-label"
    );

    const headLabels = headEl.querySelectorAll(
      ".products-use-cases-statistic-table__cell-head-label"
    );

    const bars = tableEl.querySelectorAll(
      ".products-use-cases-statistic-chart-bar"
    );

    const makeDefaultVars = (trigger, stagger = 0.1) => {
      return {
        scrollTrigger: {
          trigger,
          toggleActions: "play reset play reset",
        },
        yPercent: 100,
        stagger,
      };
    };

    this.headLabelsTween = gsap.from(headLabels, makeDefaultVars(headEl));
    this.bodyLabelsTween = gsap.from(bodyLabels, makeDefaultVars(bodyEl));
    this.barsTween = gsap.from(bars, makeDefaultVars(bodyEl, 0.05));
  }

  componentWillUnmount() {
    this.headLabelsTween.kill();
    this.bodyLabelsTween.kill();
    this.barsTween.kill();
  }

  render() {
    const { data, t } = this.props;

    return (
      <table
        ref={this.tableRef}
        className="products-use-cases-statistic-table products-use-cases-statistic__table"
      >
        <thead className="products-use-cases-statistic-table__head">
          <tr className="products-use-cases-statistic-table__row">
            {/* Рендерим пустую ячейку в первой колонке шапки таблицы для последующего перечисления названий продукции в этой колонке */}
            <td className="products-use-cases-statistic-table__cell products-use-cases-statistic-table__cell_head"></td>
            {data.head.map((headLabel, i) => (
              <td
                key={i}
                className="products-use-cases-statistic-table__cell products-use-cases-statistic-table__cell_head"
              >
                <div className="products-use-cases-statistic-table__cell-inner">
                  <p className="products-use-cases-statistic-table__cell-head-label">
                    {t(headLabel)}
                  </p>
                </div>
              </td>
            ))}
          </tr>
        </thead>

        <tbody className="products-use-cases-statistic-table__body">
          {data.body.map(({ label, data }, i) => (
            <tr key={i} className="products-use-cases-statistic-table__row">
              {/* Рендерим первую колонку с названием продукта */}
              <td className="products-use-cases-statistic-table__cell products-use-cases-statistic-table__cell_body">
                <div className="products-use-cases-statistic-table__cell-inner">
                  <p className="products-use-cases-statistic-table__cell-body-label">
                    {t(label)}
                  </p>
                </div>
              </td>
              {/* Рендерим остальные данные по продукту */}
              {data.map((dataItem, i) => (
                <td
                  key={i}
                  className="products-use-cases-statistic-table__cell products-use-cases-statistic-table__cell_body"
                >
                  <div className="products-use-cases-statistic-table__cell-inner">
                    <UseCasesStatisticChartBar percentage={dataItem} />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

UseCasesStatisticTable.propTypes = {};

export default withTranslation()(UseCasesStatisticTable);
