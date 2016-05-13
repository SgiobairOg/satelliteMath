# satelliteMath
A few utility functions to calculate a satellite's footprint and coverage rate.

You can view a demo of the object with Jasmine Framework tests at http://jsfiddle.net/gh/get/library/pure/SgiobairOg/satelliteMath/tree/master/Demo

Satellite(<i>altitude</i>, <i>period</i>)

##Parameters
#####altitude
> A number between 0 and 1.5 million representing the satellite's altitude above the earth in kilometers. Will throw 'Altitude must be a number between 0 and 1500000' in presented with non-numeric or out of range value.
  
#####period
> A number greater than 0 representing the satellite's orbital period, the time to complete one orbit, in minutes. Will throw 'Period must be a number greater than 0' if presented with a non-numeric or negative value
  
##Properties of Satellite
#####Satellite.horizon
> Returns the radius of the circle describing the satellite's horizon.

##Methods of Satellite
#####Satellite.area([<i>transit</i>])
> Returns the surface area of the Earth encompassed by the satellite's horizon. If the parameter is left blank the method will return the instantaneous area seen by the satellite. If the optional 'transit' parameter is supplied a number representing a span of minutes the method will return the area seen by the satellite through that duration.

