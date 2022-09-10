import React from "react";

class FilterButton extends React.Component {
  state = { display: "block", caret: "down", color: "#2c3576" };

  onDropDownOpen = () => {
    if (this.state.display == "none") {
      this.setState({ display: "block", caret: "down", color: "#2c3576" });
    } else {
      this.setState({ display: "none", caret: "right", color: "#3581df" });
    }
  };

  getFilterFromButton = (e) => {
    //console.log(e.currentTarget.value);
    this.props.getFilterFromButton(e.currentTarget.value);
  };

  render() {
    const x = this.props.x;
    const title = this.props.title;
    const type = this.props.type;
    const defaultFilters = this.props.defaultFilters;
    var i = 0;
    //console.log(defaultFilters);
    //console.log(this.props.filterContent);
    let filterOptions = this.props.filterContent.map(
      ({ name, abbreviation, disabled }) => {
        let abc = defaultFilters[abbreviation];
        //console.log(typeof abc);
        //console.log(abc);
        /*var x = str.length;
        console.log(x);*/
        let y = abc.split("/");
        //console.log(y);
        var agg = y[1];
        var value = y[0];
        i++;
        return (
          <div>
            <li>
              <input
                name={abbreviation}
                class={abbreviation}
                type={type}
                value={name + "/" + abbreviation}
                onClick={this.getFilterFromButton}
                checked={agg == abbreviation && name == value}
                disabled={disabled}
              />
              <label for={abbreviation}>{name}</label>
            </li>
          </div>
        );
      }
    );
    return (
      <div>
        <button
          id={`filter-button${x}`}
          className='filter-button'
          onClick={this.onDropDownOpen}
          style={{ backgroundColor: this.state.color }}
        >
          <p className='inside-filter'>
            <i
              className={`fa fa-caret-${this.state.caret}`}
              id={`x${x}`}
              aria-hidden='true'
            ></i>
            <span className='pad-left-2'>{title}</span>
            <i className='fa fa-filter align-right' aria-hidden='true'></i>
          </p>
        </button>
        <div
          id={`dropdown-list${x}`}
          className='dropdown-list'
          style={{ display: this.state.display }}
        >
          <ul id={`filter-ul${x}`} className='filter-ul'>
            {filterOptions}
          </ul>
        </div>
      </div>
    );
  }
}

export default FilterButton;
