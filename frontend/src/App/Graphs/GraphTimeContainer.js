import React from "react";
import PlotApp from "./GraphTime";
import GraphData from "./Data.json";

class MainContainer extends React.Component {
  state = {
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
        title: "Time Trending <br> Red markers - Refuel Day",
        legend: { traceorder: "reversed" },
        yaxis: { domain: [0, 0.25], title: "Outside Temp" },
        yaxis2: { domain: [0.25, 0.5], title: "Speed" },
        yaxis3: { domain: [0.5, 0.75], title: "Distance" },
        yaxis4: { domain: [0.75, 1], title: "Consume" },
        xaxis: {
          showspikes: true,
          dtick: 5,
          title: "Time",
          tickformat: "%_d %m %Y",
        },
      },
    ],
    frames: [],
    config: {},
  };

  getId = (id) => {
    //console.log(x);
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

  getDataX = (props) => {
    var axisPoints = [];
    var flag = 0;
    var TTrendDuration = props.filterValueTicked.TTrendDuration;
    var date1;
    if (TTrendDuration === "90 Days/TTDCS" || TTrendDuration === undefined)
      date1 = "10-23-2018";
    if (TTrendDuration === "30 Days/TTDCS") date1 = "12-23-2018";
    if (TTrendDuration === "1 Year/TTDCS") date1 = "1-23-2018";
    GraphData.root.map(({ date }) => {
      if (flag === 0) {
        axisPoints.push(date);
        if (date1 === date) {
          flag = 1;
        }
      }
    });
    return axisPoints;
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
    var TTrendDuration = props.filterValueTicked.TTrendDuration;
    var date1;
    if (TTrendDuration === "90 Days/TTDCS" || TTrendDuration === undefined)
      date1 = "10-23-2018";
    if (TTrendDuration === "30 Days/TTDCS") date1 = "12-23-2018";
    if (TTrendDuration === "1 Year/TTDCS") date1 = "1-23-2018";

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
    var TTrendDuration = nextProps.filterValueTicked.TTrendDuration;
    var TTrendComparision = nextProps.filterValueTicked.TTrendComparision;
    if (TTrendDuration == "90 Days/TTDCS" || TTrendDuration == undefined) {
      const newLayout = Object.assign({}, this.state.layout);
      newLayout.datarevision++;
      this.setState({ layout: newLayout });
    }
    if (TTrendDuration == "30 Days/TTDCS") {
      const newLayout = Object.assign({}, this.state.layout);
      newLayout.datarevision++;
      this.setState({ layout: newLayout });
    }
    if (TTrendDuration == "1 Years/TTDCS") {
      const newLayout = Object.assign({}, this.state.layout);
      newLayout.datarevision++;
      this.setState({ layout: newLayout });
    }
    this.setState({
      data: [
        {
          x: this.getDataX(nextProps),
          y: this.getDataY(nextProps, 5),
          type: "scatter",
          yaxis: "y",
          mode: "lines",
          name: "Outside Temp",
          line: { color: "#ed6109" },
        },
        {
          x: this.getDataX(nextProps),
          y: this.getDataY(nextProps, 1),
          type: "scatter",
          yaxis: "y2",
          mode: "lines",
          name: "Speed",
          line: { color: "#1111d6" },
        },
        {
          x: this.getDataX(nextProps),
          y: this.getDataY(nextProps, 2),
          type: "scatter",
          yaxis: "y3",
          mode: "lines",
          name: "Distance",
          line: { color: "#14cc24" },
        },
        {
          x: this.getDataX(nextProps),
          y: this.getDataY(nextProps, 3),
          type: "scatter",
          yaxis: "y4",
          mode: "lines+markers",
          name: "Consumption",
          line: { color: "#ebd834" },
          marker: { color: "red", opacity: this.getDataY(nextProps, 11) },
        },
      ],
    });
  }

  componentDidMount() {
    this.setState({
      data: [
        {
          x: this.getDataX(this.props),
          y: this.getDataY(this.props, 5),
          type: "scatter",
          yaxis: "y",
          mode: "lines",
          name: "Outside Temp",
          line: { color: "#ed6109" },
        },
        {
          x: this.getDataX(this.props),
          y: this.getDataY(this.props, 1),
          type: "scatter",
          yaxis: "y2",
          mode: "lines",
          name: "Speed",
          line: { color: "#1111d6" },
        },
        {
          x: this.getDataX(this.props),
          y: this.getDataY(this.props, 2),
          type: "scatter",
          yaxis: "y3",
          mode: "lines",
          name: "Distance",
          line: { color: "#14cc24" },
        },
        {
          x: this.getDataX(this.props),
          y: this.getDataY(this.props, 3),
          type: "scatter",
          yaxis: "y4",
          mode: "lines+markers",
          name: "Consume",
          line: { color: "#ebd834" },
          marker: { color: "red", opacity: this.getDataY(this.props, 11) },
        },
      ],
    });
  }

  render() {
    return (
      <div className='col-lg-10 col-md-9 col-sm-12 col-xs-12' id=''>
        <div className='row'>
          <div
            className='col-lg-9 col-md-8 col-sm-12 col-xs-12 GraphClassExt'
            id=''
          >
            <PlotApp
              data={this.state.data}
              layout={this.state.layout[0]}
              getId={this.getId}
            />
          </div>
          <div
            className='col-lg-3 col-md-4 col-sm-12 col-xs-12 PointDetailsYAxis'
            id=''
          >
            <p>
              <span className='blue-color'>Date:</span> {this.state.date}{" "}
            </p>
            <p>
              <span className='blue-color'>Distance:</span>{" "}
              {this.state.distance}{" "}
            </p>
            <p>
              <span className='blue-color'>Consume:</span> {this.state.consume}{" "}
            </p>
            <p>
              <span className='blue-color'>Speed:</span> {this.state.speed}{" "}
            </p>
            <p>
              <span className='blue-color'>Temp Inside:</span>{" "}
              {this.state.temp_inside}{" "}
            </p>
            <p>
              <span className='blue-color'>Temp Outside:</span>{" "}
              {this.state.temp_outside}{" "}
            </p>
            <p>
              <span className='blue-color'>Gas Type:</span>{" "}
              {this.state.gas_type}{" "}
            </p>
            <p>
              <span className='blue-color'>AC:</span> {this.state.AC}{" "}
            </p>
            <p>
              <span className='blue-color'>Rain:</span> {this.state.rain}{" "}
            </p>
            <p>
              <span className='blue-color'>Sun:</span> {this.state.sun}{" "}
            </p>
            <p>
              <span className='blue-color'>Refill Liters:</span>{" "}
              {this.state.refill_liters}{" "}
            </p>
            <p>
              <span className='blue-color'>Refill Gas:</span>{" "}
              {this.state.refill_gas}{" "}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
