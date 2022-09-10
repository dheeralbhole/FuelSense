import React from "react";
import PlotApp6D from "./GraphData6D";

class MainContainer extends React.Component {
  SelectPlot = () => {
    var x = this.props.filterValueTicked.OutLiersPlots;
    console.log(this.props.filterValueTicked.OutLiersPlots);
    return <PlotApp6D filterValueTicked={this.props.filterValueTicked} />;
  };

  render() {
    return this.SelectPlot();
  }
}

export default MainContainer;
