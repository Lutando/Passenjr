import React, { Component, PropTypes } from 'react';
import { secondsTohhmmss } from '../utils/TransitApiUtils' //this is bad, this should not be in a component woops

const icons = {
    walking: 'ion-android-walk',
    bus: 'ion-android-bus',
    rail: 'ion-android-train'
}

class SummaryCardComponent extends Component {

    getIcons()
    {
            const transitIcons = this.props.legs.map((leg) => {
            //console.log(leg)
            var spanStyle = {
                    color: '#d9d9d9',
                    fontSize: '30px'
                }
            const id = "icon/"+ leg.href
            if(leg.type === "Walking")
            {
                
                return <span key={id} className={`icon ${icons.walking}`} style={spanStyle}  />
            }
            else if(leg.line.mode === "Bus")
            {
                spanStyle.color = '#' + leg.line.colour.substring(3);
                return <span key={id} className={`icon ${icons.bus}`} style={spanStyle} />
            }
            else if(leg.line.mode === "Rail")
            {
                spanStyle.color =  '#' + leg.line.colour.substring(3);
                return <span key={id} className={`icon ${icons.rail}`}  style={spanStyle}/>
            }

            //default
            return <span key={id} className={`icon ${icons.bus}`} style={spanStyle} />
        });

        return transitIcons;
    }

    getDuration(duration) {
        var time = secondsTohhmmss(duration)
        //console.log(duration)
        return `${time.hours}h ${time.minutes}m ${time.seconds}s`
    }

    render() {
        var icons = this.getIcons()
        var duration = this.getDuration(this.props.duration)
        return (
            <div style={{color: '#d9d9d9' }} onClick={this.props.onClick}>
              <header className='card-header'>
                <div style={{color: '#d9d9d9' }}>
                    Duration : {duration}
                    <div style={{ float: 'right', color: '#d9d9d9' }}>
                    {icons}
                </div>
                </div>
                
                
              </header>
            </div>
            
        );
    }
}

export default SummaryCardComponent;