
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
                if(data.type === 'MultiPoint')
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