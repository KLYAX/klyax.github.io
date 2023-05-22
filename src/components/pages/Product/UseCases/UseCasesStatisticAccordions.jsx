import React, { Component, createRef } from "react";
import { Accordion } from "components/common";
import UseCasesStatisticChartBar from "./UseCasesStatisticChartBar";
import { withTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

class UseCasesStatisticAccordions extends Component {
  constructor(props) {
    super(props);

    this.accordionsRef = createRef();
  }

  componentDidMount() {}

  render() {
    const { data, t } = this.props;

    return (
      <div
        ref={this.accordionsRef}
        className="products-use-cases-statistic__accordions products-use-cases-statistic-accordions accordions"
      >
        {data.body.map(({ label, data: dataItem }, i) => (
          <Accordion
            key={i}
            summary={t(label)}
            className="products-use-cases-statistic-accordion"
          >
            <table className="products-use-cases-statistic-table_mobile products-use-cases-statistic-table">
              <tbody className="products-use-cases-statistic-table__body">
                {dataItem.map((percentage, l) => (
                  <tr
                    key={l}
                    className="products-use-cases-statistic-table__row"
                  >
                    <td className="products-use-cases-statistic-table__cell products-use-cases-statistic-table__cell_body">
                      <div className="products-use-cases-statistic-table__cell-inner">
                        <p>{t(data.head[l])}</p>
                      </div>
                    </td>
                    <td className="products-use-cases-statistic-table__cell products-use-cases-statistic-table__cell_body">
                      <div className="products-use-cases-statistic-table__cell-inner">
                        <UseCasesStatisticChartBar percentage={percentage} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Accordion>
        ))}
      </div>
    );
  }
}

UseCasesStatisticAccordions.propTypes = {};

export default withTranslation()(UseCasesStatisticAccordions);
