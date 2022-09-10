import React from "react";
import PlotApp from "./GraphMulti";
import GraphData from "./Data.json";
import "react-input-range/lib/css/index.css";

class MainContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "",
      distance: 0,
      consume: 0,
      speed: 0,
      temp_inside: 0,
      temp_outside: 0,
      gas_type: 0,
      AC: 0,
      rain: 0,
      sun: 0,
      refill_liters: 0,
      refill_gas: 0,
      data: [],
      layout: [
        {
          title: "Distance vs Consume",
          xaxis: { title: "Distance" },
          yaxis: { title: "Consume" },
        },
      ],
      frames: [],
      config: {},
      MultiPDuration: "90 Days/DCS95",
      MultiPRelation: "Distance vs Consume/RV95",
      param_list: [],
    };
  }

  getId = (id) => {
    GraphData.root.map(
      ({
        date,
        distance,
        consume,
        speed,
        temp_inside,
        temp_outside,
        gas_type,
        AC,
        rain,
        sun,
        refill_liters,
        refill_gas,
      }) => {
        if (date === id) {
          //console.log(x + " " + y);
          this.setState({
            date: date,
            distance: distance,
            consume: consume,
            speed: speed,
            temp_inside: temp_inside,
            temp_outside: temp_outside,
            gas_type: gas_type,
            AC: AC,
            rain: rain,
            sun: sun,
            refill_liters: refill_liters,
            refill_gas: refill_gas,
          });
        }
      }
    );
  };

  getDataX = (props, val) => {
    var axisPoints1 = [],
      axisPoints2 = [],
      axisPoints3 = [],
      axisPoints4 = [],
      axisPoints5 = [],
      axisPoints6 = [],
      axisPoints7 = [],
      axisPoints8 = [],
      axisPoints9 = [],
      axisPoints10 = [],
      axisPoints11 = [],
      axisPoints12 = [];
    var flag = 0;
    var TTrendDuration = props.filterValueTicked.SP98PDuration;
    console.log(TTrendDuration);
    var date1;
    if (TTrendDuration === "90 Days/DCS98" || TTrendDuration === undefined)
      date1 = "10-23-2018";
    if (TTrendDuration === "30 Days/DCS98") date1 = "12-23-2018";
    if (TTrendDuration === "1 Year/DCS98") date1 = "1-23-2018";

    GraphData.root.map(
      ({
        date,
        distance,
        consume,
        speed,
        temp_inside,
        temp_outside,
        gas_type,
        AC,
        rain,
        sun,
        refill_liters,
        refill_gas,
      }) => {
        if (flag == 0) {
          if (gas_type == 1) {
            axisPoints1.push(speed);
            axisPoints2.push(distance);
            axisPoints3.push(consume);
            axisPoints4.push(temp_inside);
            axisPoints5.push(temp_outside);
            axisPoints6.push(gas_type);
            axisPoints7.push(AC);
            axisPoints8.push(rain);
            axisPoints9.push(sun);
            axisPoints10.push(refill_liters);
            axisPoints11.push(refill_gas);
            axisPoints12.push(date);
            if (date == date1) {
              flag = 1;
            }
          }
        }
      }
    );
    switch (val) {
      case 1:
        return axisPoints1;
      case 2:
        return axisPoints2;
      case 3:
        return axisPoints3;
      case 4:
        return axisPoints4;
      case 5:
        return axisPoints5;
      case 6:
        return axisPoints6;
      case 7:
        return axisPoints7;
      case 8:
        return axisPoints8;
      case 9:
        return axisPoints9;
      case 10:
        return axisPoints10;
      case 11:
        return axisPoints11;
      case 12:
        return axisPoints12;
      default:
        return 0;
    }
  };

  getDataY = (props, val) => {
    var axisPoints1 = [],
      axisPoints2 = [],
      axisPoints3 = [],
      axisPoints4 = [],
      axisPoints5 = [],
      axisPoints6 = [],
      axisPoints7 = [],
      axisPoints8 = [],
      axisPoints9 = [],
      axisPoints10 = [],
      axisPoints11 = [],
      axisPoints12 = [];
    var flag = 0;
    var MultiPDuration = props.filterValueTicked.SP98PDuration;
    var date1;
    console.log(MultiPDuration);
    if (MultiPDuration === "90 Days/DCS98" || MultiPDuration === undefined)
      date1 = "10-23-2018";
    if (MultiPDuration === "30 Days/DCS98") date1 = "12-23-2018";
    if (MultiPDuration === "1 Year/DCS98") date1 = "1-23-2018";

    GraphData.root.map(
      ({
        date,
        distance,
        consume,
        speed,
        temp_inside,
        temp_outside,
        gas_type,
        AC,
        rain,
        sun,
        refill_liters,
        refill_gas,
      }) => {
        if (flag == 0) {
          if (gas_type === 0.0) {
            axisPoints1.push(speed);
            axisPoints2.push(distance);
            axisPoints3.push(consume);
            axisPoints4.push(temp_inside);
            axisPoints5.push(temp_outside);
            if (gas_type == 0) axisPoints6.push("red");
            else axisPoints6.push("blue");
            if (AC == 0) axisPoints7.push("red");
            else axisPoints7.push("blue");
            if (rain == 0) axisPoints8.push("red");
            else axisPoints8.push("blue");
            if (sun == 0) axisPoints9.push("red");
            else axisPoints9.push("blue");
            axisPoints10.push(refill_liters);
            axisPoints11.push(refill_gas);
            axisPoints12.push(date);
          }
          if (date == date1) {
            flag = 1;
          }
        }
      }
    );
    switch (val) {
      case 1:
        return axisPoints1;
      case 2:
        return axisPoints2;
      case 3:
        return axisPoints3;
      case 4:
        return axisPoints4;
      case 5:
        return axisPoints5;
      case 6:
        return axisPoints6;
      case 7:
        return axisPoints7;
      case 8:
        return axisPoints8;
      case 9:
        return axisPoints9;
      case 10:
        return axisPoints10;
      case 11:
        return axisPoints11;
      case 12:
        return axisPoints12;
      default:
        return 0;
    }
  };

  componentWillReceiveProps(nextProps) {
    var xlabel, ylabel, x, y;
    var SP95PDuration = nextProps.filterValueTicked.SP98PDuration;
    var SP95PRelation = nextProps.filterValueTicked.SP98PRelation;
    this.setState({ MultiPDuration: SP95PDuration });
    this.setState({ MultiPRelation: SP95PRelation });

    if (SP95PDuration == "90 Days/DCS98" || SP95PDuration == undefined) {
      const newLayout = Object.assign({}, this.state.layout);
      newLayout.datarevision++;
      this.setState({ layout: newLayout });
    }
    if (SP95PDuration == "30 Days/DCS98") {
      const newLayout = Object.assign({}, this.state.layout);
      newLayout.datarevision++;
      this.setState({ layout: newLayout });
    }
    if (SP95PDuration == "1 Year/DCS98") {
      const newLayout = Object.assign({}, this.state.layout);
      newLayout.datarevision++;
      this.setState({ layout: newLayout });
    }
    if (
      SP95PRelation == "Distance vs Consume/RV98" ||
      SP95PRelation == undefined
    ) {
      const newLayout = Object.assign({}, this.state.layout);
      newLayout.datarevision++;
      this.setState({ layout: newLayout });
      x = 1;
      y = 3;
      xlabel = "Distance";
      ylabel = "Consume";
    }
    if (SP95PRelation == "Speed vs Consume/RV98") {
      const newLayout = Object.assign({}, this.state.layout);
      newLayout.datarevision++;
      this.setState({ layout: newLayout });
      x = 2;
      y = 3;
      xlabel = "Speed";
      ylabel = "Consume";
    }
    if (SP95PRelation == "Outside Temp vs Consume/RV98") {
      const newLayout = Object.assign({}, this.state.layout);
      newLayout.datarevision++;
      this.setState({ layout: newLayout });
      x = 5;
      y = 3;
      xlabel = "Outside Temp";
      ylabel = "Consume";
    }
    this.setState({
      data: [
        {
          x: this.getDataX(nextProps, x),
          y: this.getDataY(nextProps, y),
          type: "scatter",
          mode: "markers",
        },
      ],
      layout: [
        {
          title: xlabel + " vs " + ylabel,
          xaxis: { title: xlabel },
          yaxis: { title: ylabel },
        },
      ],
    });
  }

  componentDidMount() {
    this.setState({
      data: [
        {
          x: this.getDataX(this.props, 2),
          y: this.getDataY(this.props, 3),
          type: "scatter",
          mode: "markers",
        },
      ],
      layout: [
        {
          title: "Speed vs Consume",
          xaxis: { title: "Speed" },
          yaxis: { title: "Consume" },
        },
      ],
    });
  }

  render() {
    return (
      <div className='col-lg-10 col-md-9 col-sm-12 col-xs-12' id=''>
        <div className='row' style={{ paddingBottom: "10px" }}>
          <div
            className='col-lg-12 col-md-12 col-sm-12 col-xs-12 GraphClassExt'
            id=''
          >
            <PlotApp
              data={this.state.data}
              layout={this.state.layout[0]}
              getId={this.getId}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
