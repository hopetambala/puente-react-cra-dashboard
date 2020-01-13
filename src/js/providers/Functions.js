
function get_age(time, start_date){
    var MILLISECONDS_IN_A_YEAR = 1000*60*60*24*365;
    var date_array = time.split('-')
    var years_elapsed = (start_date - new Date(date_array[0],date_array[1],date_array[2]))/(MILLISECONDS_IN_A_YEAR);
    return parseInt(years_elapsed); 
}

export function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

export function sum(obj) {
    var sum = 0;
    for( var el in obj ) {
      if( obj.hasOwnProperty( el ) ) {
        sum += parseFloat( obj[el] );
      }
    }
    return sum;
  }

export function removeBlanksByKey(arrObjects, key) {
    for (let i =0; i< arrObjects.length; i++){
        if (arrObjects[i][key] === "" || arrObjects[i][key] === " ") {
            delete arrObjects[i];
        }    
    };
    return arrObjects
}
/*
* Acts as range like in python
*
*/ 
export function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

/*
* Acts as range like in python with characters
*
*/ 
export function characterRange(startChar, endChar) {
    return String.fromCharCode(...range(endChar.charCodeAt(0) -
            startChar.charCodeAt(0), startChar.charCodeAt(0)))
}

export {get_age}