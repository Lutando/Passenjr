
export function formatHeader (jwt) {
    const header = {
        Authorization: `Bearer ${jwt}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }

    return header;
}

export function reverseCoordinates (data) {

    if(data instanceof Array) {
        for(var i = 0; i < data.length; i++) {
            reverseCoordinates(data[i])
        }
    }
    else {
        for(var prop in data) {

            if(prop === 'coordinates') {
                if(data.type === 'Point')
                {
                    data[prop].reverse()
                }
                if(data.type === 'MultiPoint' || data.type === 'LineString' )
                {
                    data[prop].map(function(coordinate) {
                        coordinate.reverse()
                    })
                }
            }
            if(data[prop] instanceof Object || data[prop] instanceof Array) {
                reverseCoordinates(data[prop])
            }
        }
    }

}

export function secondsTohhmmss(totalSeconds) {
  
  var hours   = Math.floor(totalSeconds / 3600);
  var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
  var seconds = totalSeconds - (hours * 3600) - (minutes * 60);
  // round seconds
  seconds = Math.round(seconds * 100) / 100
  var result = {
      hours:0,
      minutes:0,
      seconds:0,
  }
      result.hours = (hours < 10 ? "0" + hours : hours);
      result.minutes= (minutes < 10 ? "0" + minutes : minutes);
      result.seconds= (seconds  < 10 ? "0" + seconds : seconds);
  return result;
}