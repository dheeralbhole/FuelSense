import React from "react";
import TopNav from "./NavBar/top-nav";
import SideNav from "./NavBar/side-nav";
import FilterContainer from "./Filter/FilterContainer";
import Plotly from "./Graphs/GraphMain.js";

class App extends React.Component {
  state = { sideBar: false, filterId: 4, filterValueTicked: "" };

  onSideBarClose = (boolval) => {
    this.setState({ sideBar: boolval });
  };

  onSideBarOpen = (boolval) => {
    this.setState({ sideBar: boolval });
  };

  onSideBarCloseOverLay = (e) => {
    this.setState({ sideBar: false });
  };

  getFilterId = (idArray) => {
    this.setState({ filterId: idArray });
  };

  getFilterToggle = (filterData) => {
    this.setState({ filterValueTicked: filterData });
  };

  render() {
    console.log(this.state.filterValueTicked);
    return (
      <div>
        <SideNav
          sideBar={this.state.sideBar}
          getFilterId={this.getFilterId}
          onClick={this.onSideBarClose}
        />
        <div id='content container'>
          <TopNav onClick={this.onSideBarOpen} />
          <div className='container-fluid row space-t-40'>
            <FilterContainer
              filterId={this.state.filterId}
              getFilterToggle={this.getFilterToggle}
            />
            <Plotly
              filterId={this.state.filterId}
              filterValueTicked={this.state.filterValueTicked}
            />
          </div>
          <footer class='page-footer page-footer-custom font-small blue'>
            <div class='footer-copyright text-center py-3'>
              © 2020 Copyright:
              <a href='#' style={{ color: "#FFF" }}>
                FuelSense
              </a>
            </div>
          </footer>
        </div>
        <div
          className={`overlay ${this.state.sideBar ? "active" : ""}`}
          onClick={this.onSideBarCloseOverLay}
        ></div>
      </div>
    );
  }
}

export default App;
