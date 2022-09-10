import React from 'react';
import PlotApp from './GraphDataTime';
import GraphData from '../csvjson1.json';

class MainContainer extends React.Component{
    state = {
        Date: 0, Draft_Mean: 0, Trim: 0 , Speed: 0, Distance: 0, Beufort: 0, Wind_Speed: 0, Wave_Height: 0,
        data: [], 
          layout: [{
            title: "Data-Outliers Time Trending",
            yaxis: {domain: [0, 0.20], title: 'RPM'},
            legend: {traceorder: 'reversed'},
            yaxis2: {domain: [0.20, 0.40], title: 'Speed'},
            yaxis3: {domain: [0.40, 0.60], title:'Beufort'},
            yaxis4: {domain: [0.60, 0.80], title: 'Slip'},
            yaxis5: {domain: [0.80, 1], title: 'Fuel'},
            xaxis: {showspikes: true, dtick: 5, title: 'Time', tickformat: '%_d %m %Y'}
          }], frames: [], config: {}
    }

    getId = (id) => {
        var x = id;
        //console.log(x);
        GraphData.root.map(({fuel_per_dst, speed, rep_dt, draft_mean, trim, dst_last, w_force, swell}) => {
            if(rep_dt == x){
                //console.log(x + " " + y);
                this.setState({
                    Date: rep_dt, 
                    Draft_Mean: draft_mean, 
                    Trim: trim, 
                    Speed: speed, 
                    Distance: dst_last, 
                    Wind_Speed: w_force,
                    Beufort: w_force,
                    Wave_Height: swell
                })    
            }
        });
    }

    getDataX = (props) => {
        var axisPoints = [];
        var flag = 0; 
        var OutliersDuration = props.filterValueTicked.OutliersDuration; 
        var date;
        if(OutliersDuration == "90 Days/DOUTPDCS" || OutliersDuration == undefined)
          date = "9/12/2016 12:00";
        if(OutliersDuration == "30 Days/DOUTPDCS")
          date = "11/12/2016 12:00";
        GraphData.root.map(({imo_no, rep_dt}) => {
            if(flag == 0){
              if(imo_no == 9591351){
                axisPoints.push(rep_dt);
                if(rep_dt == date){
                  flag = 1;
                }
              }  
            }
        }); 
        return axisPoints;
    }
      
    getDataY = (props, val) => {
        var val1;
        var axisPoints1 = [], axisPoints2 = [], axisPoints3 = [], axisPoints4 = [], axisPoints5 = [], 
        axisPoints6 = [], axisPoints7 = [] ,axisPoints8 = [], axisPoints9 = [], axisPoints10 = [], axisPoints11 = [], axisPoints12 = [];
        var flag = 0; 
        var OutliersDuration = props.filterValueTicked.OutliersDuration;
        var OutliersBeuSwe = props.filterValueTicked.OutliersBeuSwe; 
        var date;
        if(OutliersDuration == "90 Days/DOUTPDCS" || OutliersDuration == undefined)
          date = "9/12/2016 12:00";
        if(OutliersDuration == "30 Days/DOUTPDCS")
          date = "11/12/2016 12:00";
        if(OutliersBeuSwe == "Beufort/DOUTBS" || OutliersBeuSwe == undefined)
          val1 = 1;
        if(OutliersBeuSwe == "Swell/DOUTBS")
          val1 = 2;
        GraphData.root.map(({imo_no, rpm, rpm_outlier, speed, speed_outlier, w_force, w_force_outlier, slip, 
          slip_outlier, slip_pred_current, fuel_per_dst, fuel_per_dst_outlier, 
          fuel_per_dst_pred_current, swell, rep_dt}) => {
          if(flag == 0){
            if(imo_no == 9591351){
                axisPoints1.push(speed);  
                if(speed_outlier == "1")
                  axisPoints6.push(1);
                else
                  axisPoints6.push(0);
                if(val1 == 1)
                  axisPoints2.push(w_force);
                else
                  axisPoints2.push(swell);
                if(w_force_outlier == "1")
                  axisPoints8.push(1);
                else
                  axisPoints8.push(0);
                axisPoints3.push(slip_pred_current);
                axisPoints9.push(slip);
                if(slip_outlier == "1")
                  axisPoints10.push(1);
                else
                  axisPoints10.push(0);
                 axisPoints11.push(fuel_per_dst_pred_current);
                axisPoints4.push(fuel_per_dst);
                if(fuel_per_dst_outlier == "1")
                  axisPoints12.push(1);
                else
                  axisPoints12.push(0);
                axisPoints5.push(rpm);
                if(rpm_outlier == "1")
                  axisPoints7.push(1);
                else
                  axisPoints7.push(0);
                if(rep_dt == date){
                  flag = 1;
                }
            }
          }
          
        }); 
        switch(val){
          case 1: return axisPoints1;
          case 2: return axisPoints2;
          case 3: return axisPoints3;
          case 4: return axisPoints4;
          case 5: return axisPoints5;
          case 6: return axisPoints6;
          case 7: return axisPoints7;
          case 8: return axisPoints8;
          case 9: return axisPoints9;
          case 10: return axisPoints10;
          case 11: return axisPoints11;
          case 12: return axisPoints12;
        }
    }

    componentWillReceiveProps(nextProps) {
        var BSLabel;
        var OutliersDuration = nextProps.filterValueTicked.OutliersDuration;
        var OutliersBeuSwe = nextProps.filterValueTicked.OutliersBeuSwe;
        if(OutliersDuration == "90 Days/DOUTPDCS" || OutliersDuration == undefined){
          const newLayout = Object.assign({}, this.state.layout);
          newLayout.datarevision++;
          this.setState({ layout: newLayout });
        }
        if(OutliersDuration == "30 Days/DOUTPDCS"){
          const newLayout = Object.assign({}, this.state.layout);
          newLayout.datarevision++;
          this.setState({ layout: newLayout });
        }
        if(OutliersBeuSwe == "Beufort/DOUTBS" || OutliersBeuSwe == undefined){
          const newLayout = Object.assign({}, this.state.layout);
          newLayout.datarevision++;
          newLayout[0].yaxis3.title ='Beufort';
          this.setState({ layout: newLayout }); 
          BSLabel = "Beufort";
        }
        if(OutliersBeuSwe == "Swell/DOUTBS"){
          const newLayout = Object.assign({}, this.state.layout);
          newLayout.datarevision++;
          newLayout[0].yaxis3.title = "Swell";
          this.setState({ layout: newLayout });
          BSLabel = "Swell";
        }
        this.setState({
            data : [
                {
                  x: this.getDataX(nextProps),
                  y: this.getDataY(nextProps, 5),
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'RPM',
                  marker: {color: 'red',opacity: this.getDataY(nextProps, 7)}
                },
                {
                  x: this.getDataX(nextProps),
                  y: this.getDataY(nextProps,1),
                  type: 'scatter',
                  yaxis: 'y2',
                  mode: 'lines+markers',
                  name: 'Speed',
                  line: {color: '#ed6109'},
                  marker: {color: 'red',opacity: this.getDataY(nextProps,6)}
                },
                {
                  x: this.getDataX(nextProps),
                  y: this.getDataY(nextProps,2),
                  type: 'scatter',
                  yaxis: 'y3',
                  mode: 'lines+markers',
                  name: BSLabel,
                  line: {color: '#1111d6'},
                  marker: {color: 'red',opacity: this.getDataY(nextProps,8)}
                },
                {
                  x: this.getDataX(nextProps),
                  y: this.getDataY(nextProps,3),
                  type: 'scatter',
                  yaxis: 'y4',
                  mode: 'lines',
                  name: 'Slip Prediction'
                },
                {
                  x: this.getDataX(nextProps),
                  y: this.getDataY(nextProps, 4),
                  type: 'scatter',
                  yaxis: 'y5',
                  mode: 'lines',
                  name: 'Fuel'
                },
                {
                  x: this.getDataX(nextProps),
                  y: this.getDataY(nextProps,9),
                  type: 'scatter',
                  yaxis: 'y4',
                  mode: 'lines+markers',
                  name: 'Slip',
                  line: {color: '#14cc24'},
                  marker: {color: 'red',opacity: this.getDataY(nextProps,10)}
                },
                {
                  x: this.getDataX(nextProps),
                  y: this.getDataY(nextProps, 11),
                  type: 'scatter',
                  yaxis: 'y5',
                  mode: 'lines+markers',
                  name: 'fuelprediction',
                  line: {color: '#ebd834'},
                  marker: {color: 'red',opacity: this.getDataY(nextProps,12)}
                }
            ],
        })
    }

    componentDidMount(){
        this.setState({
            data : [
                {
                  x: this.getDataX(this.props),
                  y: this.getDataY(this.props, 5),
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: 'RPM',
                  marker: {color: 'red',opacity: this.getDataY(this.props, 7)}
                },
                {
                  x: this.getDataX(this.props),
                  y: this.getDataY(this.props, 1),
                  type: 'scatter',
                  yaxis: 'y2',
                  mode: 'lines+markers',
                  name: 'Speed',
                  line: {color: '#ed6109'},
                  marker: {color: 'red',opacity: this.getDataY(this.props, 6)}
                },
                {
                  x: this.getDataX(this.props),
                  y: this.getDataY(this.props, 2),
                  type: 'scatter',
                  yaxis: 'y3',
                  mode: 'lines+markers',
                  name: 'Beufort',
                  line: {color: '#1111d6'},
                  marker: {color: 'red',opacity: this.getDataY(this.props, 8)}
                },
                {
                  x: this.getDataX(this.props),
                  y: this.getDataY(this.props, 3),
                  type: 'scatter',
                  yaxis: 'y4',
                  mode: 'lines',
                  name: 'Slip Prediction'
                },
                {
                  x: this.getDataX(this.props),
                  y: this.getDataY(this.props, 4),
                  type: 'scatter',
                  yaxis: 'y5',
                  mode: 'lines',
                  name: 'Fuel'
                },
                {
                  x: this.getDataX(this.props),
                  y: this.getDataY(this.props, 9),
                  type: 'scatter',
                  yaxis: 'y4',
                  mode: 'lines+markers',
                  name: 'Slip',
                  line: {color: '#14cc24'},
                  marker: {color: 'red',opacity: this.getDataY(this.props, 10)}
                },
                {
                  x: this.getDataX(this.props),
                  y: this.getDataY(this.props,11),
                  type: 'scatter',
                  yaxis: 'y5',
                  mode: 'lines+markers',
                  name: 'Fuel Prediction',
                  line: {color: '#ebd834'},
                  marker: {color: 'red',opacity: this.getDataY(this.props,12)}
                }
            ],
        })
    }

    render(){
        return(
            <div className="col-lg-10 col-md-9 col-sm-12 col-xs-12" id="">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 PointDetailsXAxis">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <p><span className="blue-color">DHFOC:</span> 0</p>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <p><span className="blue-color">DLFOC:</span> 0</p>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <p><span className="blue-color">DDO:</span> 0</p>
                            </div>  
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <p><span className="blue-color">HFOC:</span> 0</p>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <p><span className="blue-color">LFOC:</span> 0</p>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <p><span className="blue-color">DO:</span> 0</p>
                            </div>  
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-9 col-md-8 col-sm-12 col-xs-12 GraphClassExt" id="">
                        <PlotApp data = {this.state.data} layout = {this.state.layout[0]} getId = {this.getId}/>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 PointDetailsYAxis" id="">
                        <p><span className="blue-color">Date:</span> {this.state.Date} </p>
                        <p><span className="blue-color">Latitude:</span> 0 </p>
                        <p><span className="blue-color">Longitude:</span> 0 </p>
                        <p><span className="blue-color">Draft Mean:</span> {this.state.Draft_Mean} </p>
                        <p><span className="blue-color">Trim:</span> {this.state.Trim} </p>
                        <p><span className="blue-color">Speed:</span> {this.state.Speed} </p>
                        <p><span className="blue-color">Distance:</span> {this.state.Distance} </p>
                        <p><span className="blue-color">Course:</span> 0 </p>
                        <p><span className="blue-color">Beufort:</span> {this.state.Beufort} </p>
                        <p><span className="blue-color">Wind Speed:</span> {this.state.Wind_Speed} </p>
                        <p><span className="blue-color">Wave Height:</span> {this.state.Wave_Height} </p>
                        <p><span className="blue-color">Ballast:</span> 0 </p>
                    </div>
                </div>
                <div className="row" style={{paddingBottom:'10px'}}>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 TableClassExt" id="">
                        <table class="table">
                            <thead class="thead-light">
                            <tr>
                                <th>Message</th>
                                <th>Feedback</th>
                                <th>Comment</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>RPM is higher than expected</td>
                                <td>
                                    <input name = "Correct" type = "radio" />
                                    <label for = "Correct">Correct</label><br/>
                                    <input name = "Correct" type = "radio" />
                                    <label for = "Correct">Incorrect</label>
                                </td>
                                <td>
                                    <textarea>

                                    </textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>Fuel Consumption is higher than expected</td>
                                <td>
                                    <input name = "Correct" type = "radio" />
                                    <label for = "Correct">Correct</label><br/>
                                    <input name = "Correct" type = "radio" />
                                    <label for = "Correct">Incorrect</label>
                                </td>
                                <td>
                                    <textarea>
                                        
                                    </textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>Slip is lower than expected</td>
                                <td>
                                    <input name = "Correct" type = "radio" />
                                    <label for = "Correct">Correct</label><br/>
                                    <input name = "Correct" type = "radio" />
                                    <label for = "Correct">Incorrect</label>
                                </td>
                                <td>
                                    <textarea>
                                        
                                    </textarea>
                                </td>
                            </tr>                            
                            </tbody>
                            
                        </table>
                    </div> 
                </div>    
            </div>
        );
    }
}

export default MainContainer;