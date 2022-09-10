import React from "react";
import GraphTimeCon from "./GraphTimeContainer.js";
import GraphMultiCon from "./GraphMultiParContainer.js";
import GraphDataCon from "./GraphsDataOut/GraphDataOutContainer";
import GraphSP95Con from "./GraphSP95Container";
import GraphSP98Con from "./GraphSP98Container";

class GraphContainer extends React.Component {
  render() {
    if (this.props.filterId == 2) {
      return <GraphDataCon filterValueTicked={this.props.filterValueTicked} />;
    } else if (this.props.filterId == 0) {
      return <GraphTimeCon filterValueTicked={this.props.filterValueTicked} />;
    } else if (this.props.filterId == 1) {
      return <GraphMultiCon filterValueTicked={this.props.filterValueTicked} />;
    } else if (this.props.filterId == 3) {
      return <GraphSP98Con filterValueTicked={this.props.filterValueTicked} />;
    } else if (this.props.filterId == 4) {
      return <GraphSP95Con filterValueTicked={this.props.filterValueTicked} />;
    } else return <div className='coming-soon'></div>;
  }
}

export default GraphContainer;
