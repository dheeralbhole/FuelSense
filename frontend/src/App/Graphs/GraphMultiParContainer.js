import React from "react";
import InputRange from "react-input-range";
import axios from "axios";
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
      valueSpeed: 10,
      valueDistance: 10,
      valueTemp: 10,
      valueAC: 1,
      valueRain: 1,
      valueSun: 1,
      valueType: 1,
      boolSpeed: true,
      boolDistance: true,
      boolTemp: true,
      boolAC: true,
      boolRain: true,
      boolSun: true,
      boolType: true,
      MultiPDuration: "90 Days/MPDCS",
      MultiPRelation: "Distance vs Consume/MPRV",
      param_list: [],
    };

    this.onRadioClick = this.onRadioClick.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    var xlabel, ylabel, model;
    if (
      this.state.MultiPRelation == "Distance vs Consume/MPRV" ||
      this.state.MultiPRelation == undefined
    ) {
      xlabel = "Distance";
      ylabel = "Consume";
      model = "distcons";
    }
    if (this.state.MultiPRelation == "Speed vs Consume/MPRV") {
      xlabel = "Speed";
      ylabel = "Consume";
      model = "speedcons";
    }
    if (this.state.MultiPRelation == "Temp vs Consume/MPRV") {
      xlabel = "Temp";
      ylabel = "Consume";
      model = "tempcons";
    }
    var string = "http://184.172.252.83:32374/addroute?";
    string =
      string +
      "model=" +
      model +
      "&distance=" +
      this.state.valueDistance +
      "&rain=" +
      this.state.valueRain;
    string =
      string +
      "&speed=" +
      this.state.valueSpeed +
      "&temp_inside=" +
      "" +
      "&temp_outside=" +
      this.state.valueTemp +
      "&gas_type=" +
      this.state.valueType;
    string =
      string +
      "&AC=" +
      this.state.valueAC +
      "&param_list=[" +
      this.state.param_list +
      "]&sun=" +
      this.state.valueSun +
      "&consume=" +
      this.state.valueSun;
    axios.get(string).then((res) => {
      console.log(res.data);

      if (res.data.status == 201) {
        console.log(res.data.x);
        const x = res.data.x;
        const y_org = res.data.y_org;
        const y_pred_hr = res.data.y;
        const newLayout = Object.assign({}, this.state.layout);
        newLayout.datarevision++;
        this.setState({ layout: newLayout });
        this.setState({
          data: [
            {
              x: x,
              y: y_org,
              type: "scatter",
              mode: "markers",
              name: "Original Data",
            },
            {
              x: x,
              y: y_pred_hr,
              type: "scatter",
              mode: "markers",
              name: "Predicted Data",
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
        console.log(x);
        console.log(y_org);
      } else {
        alert(res.data.message);
      }
    });
  };

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
    var TTrendDuration = props.filterValueTicked.TTrendDuration;
    var date1;
    if (TTrendDuration === "90 Days/MPDCS" || TTrendDuration === undefined)
      date1 = "10-23-2018";
    if (TTrendDuration === "30 Days/MPDCS") date1 = "12-23-2018";
    if (TTrendDuration === "1 Year/MPDCS") date1 = "1-23-2018";

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

  getDataY = (props, val) => {
    var MultiPPeriod = props.filterValueTicked.MultiPPeriod;
    var date,
      flag = 0;
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
    var MultiPDuration = props.filterValueTicked.MultiPDuration;
    var date1;
    if (MultiPDuration === "90 Days/MPDCS" || MultiPDuration === undefined)
      date1 = "10-23-2018";
    if (MultiPDuration === "30 Days/MPDCS") date1 = "12-23-2018";
    if (MultiPDuration === "1 Year/MPDCS") date1 = "1-23-2018";

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
    var xlabel, ylabel, x, y, dot, title;
    var MultiPDuration = nextProps.filterValueTicked.MultiPDuration;
    var MultiPRelation = nextProps.filterValueTicked.MultiPRelation;
    var MultiPPeriod = nextProps.filterValueTicked.MultiPPeriod;
    this.setState({ MultiPDuration: MultiPDuration });
    this.setState({ MultiPRelation: MultiPRelation });
    this.setState({ MultiPPeriod: MultiPPeriod });
    if (MultiPDuration == "90 Days/MPDCS" || MultiPDuration == undefined) {
      const newLayout = Object.assign({}, this.state.layout);
      newLayout.datarevision++;
      this.setState({ layout: newLayout });
    }
    if (MultiPDuration == "30 Days/MPDCS") {
      const newLayout = Object.assign({}, this.state.layout);
      newLayout.datarevision++;
      this.setState({ layout: newLayout });
    }
    if (MultiPDuration == "1 Year/MPDCS") {
      const newLayout = Object.assign({}, this.state.layout);
      newLayout.datarevision++;
      this.setState({ layout: newLayout });
    }
    if (MultiPPeriod == "AC or Non AC/MPCP" || MultiPPeriod == undefined) {
      const newLayout = Object.assign({}, this.state.layout);
      newLayout.datarevision++;
      this.setState({ layout: newLayout });
      dot = 7;
      title = "Blue: AC; Red: Non-AC";
    }
    if (MultiPPeriod == "Fuel Type/MPCP") {
      const newLayout = Object.assign({}, this.state.layout);
      newLayout.datarevision++;
      this.setState({ layout: newLayout });
      dot = 6;
      title = "Blue: SP 95 E10; Red: SP 98";
    }
    if (MultiPPeriod == "Rain/MPCP") {
      const newLayout = Object.assign({}, this.state.layout);
      newLayout.datarevision++;
      this.setState({ layout: newLayout });
      dot = 8;
      title = "Blue: Rain; Red: No-Rain";
    }
    if (MultiPPeriod == "Sun/MPCP") {
      const newLayout = Object.assign({}, this.state.layout);
      newLayout.datarevision++;
      this.setState({ layout: newLayout });
      dot = 9;
      title = "Blue: Sun; Red: No-Sun";
    }
    if (
      MultiPRelation == "Distance vs Consume/MPRV" ||
      MultiPRelation == undefined
    ) {
      const newLayout = Object.assign({}, this.state.layout);
      newLayout.datarevision++;
      this.setState({ layout: newLayout });
      x = 1;
      y = 3;
      xlabel = "Distance";
      ylabel = "Consume";
    }
    if (MultiPRelation == "Speed vs Consume/MPRV") {
      const newLayout = Object.assign({}, this.state.layout);
      newLayout.datarevision++;
      this.setState({ layout: newLayout });
      x = 2;
      y = 3;
      xlabel = "Speed";
      ylabel = "Consume";
    }
    if (MultiPRelation == "Temp vs Consume/MPRV") {
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
          marker: { color: this.getDataY(nextProps, dot) },
        },
      ],
      layout: [
        {
          title: xlabel + " vs " + ylabel + "<br>" + title,
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
          x: this.getDataX(this.props, 1),
          y: this.getDataY(this.props, 3),
          type: "scatter",
          mode: "markers",
          marker: { color: this.getDataY(this.props, 6) },
        },
      ],
      layout: [
        {
          title: "Distance vs Consume <br> Blue: SP 95 E10; Red: SP 98",
          xaxis: { title: "Distance" },
          yaxis: { title: "Consume" },
        },
      ],
    });
  }

  disablenable = (e) => {
    console.log(e.currentTarget.value);
    switch (e.currentTarget.value) {
      case "speed":
        this.setState({
          boolSpeed: this.checkTrueFalse(
            this.state.boolSpeed,
            e.currentTarget.value
          ),
        });
        break;
      case "distance":
        this.setState({
          boolDistance: this.checkTrueFalse(
            this.state.boolDistance,
            e.currentTarget.value
          ),
        });
        break;
      case "temp_outside":
        this.setState({
          boolTemp: this.checkTrueFalse(
            this.state.boolTemp,
            e.currentTarget.value
          ),
        });
        break;
      case "gas_type":
        this.setState({
          boolType: this.checkTrueFalse(
            this.state.boolType,
            e.currentTarget.value
          ),
        });
        break;
      case "AC":
        this.setState({
          boolAC: this.checkTrueFalse(this.state.boolAC, e.currentTarget.value),
        });
        break;
      case "rain":
        this.setState({
          boolRain: this.checkTrueFalse(
            this.state.boolRain,
            e.currentTarget.value
          ),
        });
        break;
      case "sun":
        this.setState({
          boolSun: this.checkTrueFalse(
            this.state.boolSun,
            e.currentTarget.value
          ),
        });
        break;
    }
  };

  checkTrueFalse = (val, param) => {
    if (val == true) {
      var param_list = this.state.param_list;
      param_list.push(param);
      this.setState({ param_list: param_list });
      return false;
    }
    if (val == false) {
      var param_list = this.state.param_list;
      for (var i = 0; i < param_list.length; i++) {
        if (param_list[i] === param) {
          param_list.splice(i, 1);
        }
      }
      this.setState({ param_list: param_list });
      return true;
    }
  };

  onRadioClick = (e) => {
    this.setState({ valueType: e.currentTarget.value });
  };

  onRadioClick1 = (e) => {
    this.setState({ valueAC: e.currentTarget.value });
  };

  onRadioClick2 = (e) => {
    this.setState({ valueRain: e.currentTarget.value });
  };

  onRadioClick3 = (e) => {
    this.setState({ valueSun: e.currentTarget.value });
  };

  render() {
    return (
      <div className='col-lg-10 col-md-9 col-sm-12 col-xs-12' id=''>
        <div className='row'>
          <div
            className='col-lg-8 col-md-7 col-sm-12 col-xs-12 GraphClassExt'
            id=''
          >
            <PlotApp
              data={this.state.data}
              layout={this.state.layout[0]}
              getId={this.getId}
            />
          </div>
          <div
            className='col-lg-4 col-md-5 col-sm-12 col-xs-12 PointDetailsYAxis'
            id=''
          >
            <h4 style={{ paddingBottom: "20px" }}>Advanced Analysis</h4>
            <form action='' onSubmit={this.handleSubmit}>
              <div className='form-control '>
                <h5>Select parameters to analyze</h5>
                <div class='form-check form-check-inline'>
                  <input
                    class='form-check-input'
                    type='checkbox'
                    id='inlineCheckbox1'
                    value='speed'
                    onClick={this.disablenable}
                  />
                  <label class='form-check-label' for='inlineCheckbox1'>
                    Speed
                  </label>
                </div>
                <div class='form-check form-check-inline'>
                  <input
                    class='form-check-input'
                    type='checkbox'
                    id='inlineCheckbox2'
                    value='distance'
                    onClick={this.disablenable}
                  />
                  <label class='form-check-label' for='inlineCheckbox2'>
                    Distance
                  </label>
                </div>
                <div class='form-check form-check-inline'>
                  <input
                    class='form-check-input'
                    type='checkbox'
                    id='inlineCheckbox3'
                    value='temp_outside'
                    onClick={this.disablenable}
                  />
                  <label class='form-check-label' for='inlineCheckbox3'>
                    Outside Temp
                  </label>
                </div>
                <div class='form-check form-check-inline'>
                  <input
                    class='form-check-input'
                    type='checkbox'
                    id='inlineCheckbox4'
                    value='gas_type'
                    onClick={this.disablenable}
                  />
                  <label class='form-check-label' for='inlineCheckbox3'>
                    Fuel Type
                  </label>
                </div>
                <div class='form-check form-check-inline'>
                  <input
                    class='form-check-input'
                    type='checkbox'
                    id='inlineCheckbox5'
                    value='AC'
                    onClick={this.disablenable}
                  />
                  <label class='form-check-label' for='inlineCheckbox3'>
                    AC
                  </label>
                </div>
                <div class='form-check form-check-inline'>
                  <input
                    class='form-check-input'
                    type='checkbox'
                    id='inlineCheckbox6'
                    value='rain'
                    onClick={this.disablenable}
                  />
                  <label class='form-check-label' for='inlineCheckbox3'>
                    Rain
                  </label>
                </div>
                <div class='form-check form-check-inline'>
                  <input
                    class='form-check-input'
                    type='checkbox'
                    id='inlineCheckbox6'
                    value='sun'
                    onClick={this.disablenable}
                  />
                  <label class='form-check-label' for='inlineCheckbox3'>
                    Sun
                  </label>
                </div>
              </div>

              <div className='form-control'>
                <h5>Speed</h5>
                <InputRange
                  className='inputRange'
                  //formatLabel={value => `${value}cm`}
                  maxValue={100}
                  minValue={10}
                  value={this.state.valueSpeed}
                  onChange={(valueSpeed) => this.setState({ valueSpeed })}
                  name='speed'
                  disabled={this.state.boolSpeed}
                />
              </div>
              <div className='form-control'>
                <h5>Distance</h5>
                <InputRange
                  className='inputRange'
                  //formatLabel={value => `${value}cm`}
                  maxValue={216}
                  minValue={10}
                  value={this.state.valueDistance}
                  onChange={(valueDistance) => this.setState({ valueDistance })}
                  name='beaufort'
                  disabled={this.state.boolDistance}
                />
              </div>
              <div className='form-control'>
                <h5>Outside Temperature</h5>
                <InputRange
                  className='inputRange'
                  //formatLabel={value => `${value}cm`}
                  maxValue={40}
                  minValue={-10}
                  value={this.state.valueTemp}
                  onChange={(valueTemp) => this.setState({ valueTemp })}
                  name='Temp'
                  disabled={this.state.boolTemp}
                />
              </div>
              <div className='form-control' style={{ paddingTop: "10px" }}>
                <h5>Fuel Type</h5>
                <div class='form-check form-check-inline'>
                  <input
                    class='form-check-input'
                    name='TypeOptions'
                    type='radio'
                    id='inlineRadio5'
                    value={0}
                    disabled={this.state.boolType}
                    onClick={this.onRadioClick}
                  />
                  <label class='form-check-label' for='inlineRadio5'>
                    SP 98
                  </label>
                </div>
                <div class='form-check form-check-inline'>
                  <input
                    class='form-check-input'
                    name='TypeOptions'
                    type='radio'
                    id='inlineRadio6'
                    value={1}
                    disabled={this.state.boolType}
                    onClick={this.onRadioClick}
                  />
                  <label class='form-check-label' for='inlineRadio6'>
                    SP 95 E10
                  </label>
                </div>
              </div>
              <div className='form-control' style={{ paddingTop: "10px" }}>
                <h5>AC or Non-AC</h5>
                <div class='form-check form-check-inline'>
                  <input
                    class='form-check-input'
                    name='ACOptions'
                    type='radio'
                    id='inlineRadio7'
                    value={1}
                    disabled={this.state.boolAC}
                    onClick={this.onRadioClick1}
                  />
                  <label class='form-check-label' for='inlineRadio5'>
                    AC
                  </label>
                </div>
                <div class='form-check form-check-inline'>
                  <input
                    class='form-check-input'
                    name='ACOptions'
                    type='radio'
                    id='inlineRadio6'
                    value={0}
                    disabled={this.state.boolAC}
                    onClick={this.onRadioClick1}
                  />
                  <label class='form-check-label' for='inlineRadio6'>
                    Non AC
                  </label>
                </div>
              </div>
              <div className='form-control' style={{ paddingTop: "10px" }}>
                <h5>Rain</h5>
                <div class='form-check form-check-inline'>
                  <input
                    class='form-check-input'
                    name='RainOptions'
                    type='radio'
                    id='inlineRadio5'
                    value={1}
                    disabled={this.state.boolRain}
                    onClick={this.onRadioClick2}
                  />
                  <label class='form-check-label' for='inlineRadio5'>
                    Rain
                  </label>
                </div>
                <div class='form-check form-check-inline'>
                  <input
                    class='form-check-input'
                    name='RainOptions'
                    type='radio'
                    id='inlineRadio6'
                    value={0}
                    disabled={this.state.boolRain}
                    onClick={this.onRadioClick2}
                  />
                  <label class='form-check-label' for='inlineRadio6'>
                    No Rain
                  </label>
                </div>
              </div>
              <div className='form-control' style={{ paddingTop: "10px" }}>
                <h5>Sunny</h5>
                <div class='form-check form-check-inline'>
                  <input
                    class='form-check-input'
                    name='SunOptions'
                    type='radio'
                    id='inlineRadio5'
                    value={1}
                    disabled={this.state.boolSun}
                    onClick={this.onRadioClick3}
                  />
                  <label class='form-check-label' for='inlineRadio5'>
                    Sun
                  </label>
                </div>
                <div class='form-check form-check-inline'>
                  <input
                    class='form-check-input'
                    name='SunOptions'
                    type='radio'
                    id='inlineRadio6'
                    value={0}
                    disabled={this.state.boolSun}
                    onClick={this.onRadioClick3}
                  />
                  <label class='form-check-label' for='inlineRadio6'>
                    No Sun
                  </label>
                </div>
              </div>
              <button
                type='submit'
                class='btn btn-primary'
                style={{ marginTop: "20px" }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
