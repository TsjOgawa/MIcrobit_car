maqueen.ltEvent(maqueen.Patrol1.PatrolRight, maqueen.Voltage.High, function () {
	
})
maqueen.ltEvent(maqueen.Patrol1.PatrolLeft, maqueen.Voltage.High, function () {
	
})
let Mode = 0
radio.setGroup(1)
radio.setTransmitPower(7)
basic.showLeds(`
    # # # # #
    # . . . #
    # . # . #
    # . . . #
    # # # # #
    `)
basic.forever(function () {
    let userID = 0
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 0)
    radio.sendString("A" + "," + ("" + userID) + "," + ("" + input.acceleration(Dimension.X)) + "," + ("" + input.acceleration(Dimension.Y)) + "," + ("" + input.acceleration(Dimension.Z)))
    radio.sendString("N" + "," + ("" + userID) + "," + ("" + input.compassHeading()))
})
