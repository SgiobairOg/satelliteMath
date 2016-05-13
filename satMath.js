// SATMATH.js
//
// A collection of functions to determine footprint, coverage time and some other properties of a
// satellite in orbit around Earth. Written in javascript because it's all I have available
// at the moment (long story).
//
// Jason Wilson
// wilsonsofoxford.com
// https://github.com/SgiobairOg/satelliteMath/
//
// MIT license

//Creates Object.create if it doesn't already exist
if (typeof Object.create !== 'function') {
  Object.create = function(o) {
    function F() {}
    F.prototype = o;
    return new F();
  };
}

function Satellite(altitude, period) { //(number, number)
  //Make sure Object.create exists
  if (typeof Object.create !== 'function') {
    Object.create = function(o) {
      function F() {}
      F.prototype = o;
      return new F();
    };
  }

  //Verify a valid altitude and period were sent
  if (typeof altitude === 'number' && altitude >= 0 && altitude <= 1500000)
    null;
  else
    throw 'Altitude must be a number between 0 and 1500000';

  if (typeof period === 'number' && period > 0)
    null;
  else
    throw 'Period must be a number greater than 0';

  //Set constants for the earth
  const earthRadius = 6378.1; //kilometers
  const earthArea = 510100000; //kilometers

  //Calculate private properties
  var innerAngle = Math.acos(earthRadius / (altitude + earthRadius)); //Calculate inner angle of the triangle tangent to the surface of the Earth
  var capHeight = earthRadius - (earthRadius * Math.cos(innerAngle)); //Calculate the height of the spherical cap in the satellite horizon

	//Calculate public properties
  this.horizon = (earthRadius * Math.sin(innerAngle)); //Calculate the radius of the visible horizon


  //Helper functions
  this.area = function() { //([number]) optional transit duration
    //Capture the transit time or set it to zero
    transit = typeof arguments[0] === 'number' ? arguments[0] : 0;
    if (transit < 0)
      throw 'Transit time must be greater than or equal to 0';

    return (2 * Math.PI * earthRadius * capHeight) + ((earthRadius * 2 * innerAngle) * ((2 * Math.PI * earthRadius) * (transit / period)));
  };

  //Hand off the object
  return self
}
