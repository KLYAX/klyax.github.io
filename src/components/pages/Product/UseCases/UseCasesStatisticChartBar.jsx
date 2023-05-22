import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export const ChartBarLvl = {
  Unacceptable: 20,
  Acceptable: 40,
  Good: 60,
  Well: 80,
  Excellent: 100,
};

/**
 * Компонент создает столбчатую диаграмму с данными равными percentage
 *
 * @param {Object} props
 * @param {Object} props.percentage - Процент заполненности столбчатой диаграммы
 */
const UseCasesStatisticChartBar = ({ percentage }) => {
  let classNameSuffix;

  if (percentage <= ChartBarLvl.Unacceptable) {
    classNameSuffix = "unacceptable";
  } else if (percentage <= ChartBarLvl.Acceptable) {
    classNameSuffix = "acceptable";
  } else if (percentage <= ChartBarLvl.Good) {
    classNameSuffix = "good";
  } else if (percentage <= ChartBarLvl.Well) {
    classNameSuffix = "well";
  } else {
    classNameSuffix = "excellent";
  }

  return (
    <div
      className={classNames(
        "products-use-cases-statistic-chart-bar",
        `products-use-cases-statistic-chart-bar_${classNameSuffix}`
      )}
    />
  );
};

UseCasesStatisticChartBar.propTypes = {
  percentage: PropTypes.number,
};

export default UseCasesStatisticChartBar;
