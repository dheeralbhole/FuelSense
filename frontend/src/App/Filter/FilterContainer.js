import React from "react";
import FilterButton from "./FilterButton";
import filterData from "./FilterData.json";

class FilterContainer extends React.Component {
  state = {
    OutLiersPlots: "5D Plots/DOUTPTS",
    OutliersDuration: "Whole Data/DOUTPDCS",
    TTrendDuration: "90 Days/TTDCS",
    TTrendComparision: "None/TTCP",
    MultiPRelation: "Distance vs Consume/MPRV",
    MultiPDuration: "90 Days/MPDCS",
    MultiPPeriod: "Fuel Type/MPCP",
    SP95PRelation: "Speed vs Consume/RV95",
    SP95PDuration: "90 Days/DCS95",
    SP98PRelation: "Speed vs Consume/RV98",
    SP98PDuration: "90 Days/DCS98",
  };

  getFilterFromButton = (val) => {
    var agg = val.split("/")[1];
    var value = val.split("/")[0];
    console.log(agg + " " + value);
    switch (agg) {
      case "DOUTPTS":
        this.setState({ OutLiersPlots: val }, () => {
          this.props.getFilterToggle(this.state);
        });
        break;
      case "DOUTPDCS":
        this.setState({ OutliersDuration: val }, () => {
          this.props.getFilterToggle(this.state);
        });
        break;
      case "TTDCS":
        this.setState({ TTrendDuration: val }, () => {
          this.props.getFilterToggle(this.state);
        });
        break;
      case "TTCP":
        this.setState({ TTrendComparision: val }, () => {
          this.props.getFilterToggle(this.state);
        });
        break;
      case "TTQD":
        this.setState({ TTrendQuant: val }, () => {
          this.props.getFilterToggle(this.state);
        });
        break;
      case "MPRV":
        this.setState({ MultiPRelation: val }, () => {
          this.props.getFilterToggle(this.state);
        });
        break;
      case "MPDCS":
        this.setState({ MultiPDuration: val }, () => {
          this.props.getFilterToggle(this.state);
        });
        break;
      case "MPCP":
        this.setState({ MultiPPeriod: val }, () => {
          this.props.getFilterToggle(this.state);
        });
        break;
      case "RV98":
        this.setState({ SP98PRelation: val }, () => {
          this.props.getFilterToggle(this.state);
        });
        break;
      case "DCS98":
        this.setState({ SP98PDuration: val }, () => {
          this.props.getFilterToggle(this.state);
        });
        break;
      case "RV95":
        this.setState({ SP95PRelation: val }, () => {
          this.props.getFilterToggle(this.state);
        });
        break;
      case "DCS95":
        this.setState({ SP95PDuration: val }, () => {
          this.props.getFilterToggle(this.state);
        });
        break;
    }
  };

  render() {
    var Filter;
    var defaultFilters;
    //console.log(this.state);
    const data = filterData.root[this.props.filterId];
    if (this.props.filterId == 2) {
      defaultFilters = {
        DOUTPTS: this.state.OutLiersPlots,
        DOUTPDCS: this.state.OutliersDuration,
      };
    }
    if (this.props.filterId == 0) {
      defaultFilters = {
        TTDCS: this.state.TTrendDuration,
        TTCP: this.state.TTrendComparision,
      };
    }
    if (this.props.filterId == 1) {
      defaultFilters = {
        MPRV: this.state.MultiPRelation,
        MPDCS: this.state.MultiPDuration,
        MPCP: this.state.MultiPPeriod,
      };
    }
    if (this.props.filterId == 4) {
      defaultFilters = {
        RV95: this.state.SP95PRelation,
        DCS95: this.state.SP95PDuration,
      };
    }
    if (this.props.filterId == 3) {
      defaultFilters = {
        RV98: this.state.SP98PRelation,
        DCS98: this.state.SP98PDuration,
      };
    }
    if (data != undefined) {
      Filter = data.filterx.map(({ id, title, type, filterContent }) => {
        return (
          <div>
            <FilterButton
              x={id}
              title={title}
              type={type}
              filterContent={filterContent}
              getFilterFromButton={this.getFilterFromButton}
              defaultFilters={defaultFilters}
            />
            <div class='space-t-10'></div>
          </div>
        );
      });
      return (
        <div className='col-lg-2 col-md-3 col-sm-12 dropdown-container'>
          <span className='filter-head space-b-20 space-l-20'>Filters</span>
          <div className='space-t-20'></div>
          {Filter}
        </div>
      );
    }
    return <div></div>;
  }
}

export default FilterContainer;
