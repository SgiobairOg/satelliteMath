// demo.js
//
// Demo version of satMath for use in jsFiddle
//
// A collection of functions to determine footprint, coverage time and some other properties of a
// satellite in orbit around Earth. Written in javascript because it's all I have available
// at the moment (long story).
//
// Jason Wilson
// wilsonsofoxford.com
//
// MIT license
//
// If you're on https you may need to re-add the external resource https://searls.github.io/jasmine-all/jasmine-all-min.js


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


//Test cases with Jasmine
describe("Satellite", function() {
  //Checking the properties are all accessible
  it("hides its inner angle", function() {
    n18 = Object.create(Satellite(854, 102.12))
    expect(n18.innerAngle).toBeUndefined();
  });

  it("hides its cap height", function() {
    n18 = Object.create(Satellite(854, 102.12))
    expect(n18.capHeight).toBeUndefined();
  });

  it("has a horizon", function() {
    n18 = Object.create(Satellite(854, 102.12))
    expect(n18.horizon).toBeDefined();
  });

  //Traps too few arguments and altitude/period errors
  it("likes its altitude", function() {
    expect(function() {
      var n18 = Object.create(Satellite());
    }).toThrow();
  });

  it("isn't buried", function() {
    expect(function() {
      var n18 = Object.create(Satellite(-1, 102.12));
    }).toThrow();
  });

  it("didn't fly into space", function() {
    expect(function() {
      var n18 = Object.create(Satellite(2000000, 102.12));
    }).toThrow();
  });

  it("isn't trying to time travel", function() {
    expect(function() {
      var n18 = Object.create(Satellite(854, -102.12));
    }).toThrow();
  });

  //Makes sure it returns an object
  it("returns itself", function() {
    var n18 = Object.create(Satellite(854, 102.12))
    expect(typeof n18).toBe('object');
  });

  //Makes sure it returns an area
  it("can see an area", function() {
    var n18 = Object.create(Satellite(854, 102.12));
    expect(typeof n18.area()).toBe('number');
  });

  //Makes sure it returns an area in the ballpark
  it("can see an appropriate area", function() {
    var n18 = Object.create(Satellite(854, 102.12));
    expect(n18.area()).toBeGreaterThan(30000000, 0);
  });

  //Can it see in swaths
  it("can see continuously", function() {
    var n18 = Object.create(Satellite(854, 102.12));
    expect(n18.area(10)).toBeGreaterThan(54000000, 0);
  });

  //Tests the extremes
  it("can see up close", function() {
    var n18 = Object.create(Satellite(0, 102.12));
    expect(n18.area()).not.toBeGreaterThan(0);
  });
  it("can see far away", function() {
    var n18 = Object.create(Satellite(1500000, 102.12));
    expect(n18.area()).toBeGreaterThan(0);
  });
});
