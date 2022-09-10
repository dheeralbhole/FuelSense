import React from 'react';
import Plot from 'react-plotly.js';

class PlotApp extends React.Component {
    constructor(props){
        super(props);
        this.state = { revisionNo: 1 };
        this.getId = this.getId.bind(this);
    }

    getId = (data) =>{
        var pts = '';
        for(var i=0; i < data.points.length; i++){
            pts = data.points[i].x +'/'+
                data.points[i].y;
            this.props.getId(data.points[i].x);
        }
    }

    componentWillReceiveProps(nextProps) {
      this.setState((prevState, props) => {
        return { revisionNo: prevState.revisionNo + 1 };
      });
    }

  
    render(){
        return (
            <Plot
                className = "GraphClass"
                data={this.props.data}
                layout={this.props.layout}
                onHover = {this.getId}
            />
        );
    }
}

export default PlotApp;