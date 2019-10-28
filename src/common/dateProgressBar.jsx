import React, { Component } from "react";
import ProgressBar from './progressBar';

class DateProgressBar extends Component {
  calculateProgress = () => {
    const { startDate, endDate } = this.props;
    // const startDate = new Date("2019-05-05T00:00:00");
    // const date = new Date();
    // const endDate = new Date("2019-08-18T00:00:00");
    const date = new Date();

    let percent = ((date - startDate) / (endDate - startDate)) * 100;

    percent = percent < 0 ? 0 : percent;
    percent = percent > 100 ? 100 : percent;

    percent = Math.ceil(percent).toString() + "%";

    return percent;
  };

  render() {
    return <ProgressBar progress={this.calculateProgress()} />;
  }
}

export default DateProgressBar;
