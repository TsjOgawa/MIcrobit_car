radio.setGroup(1)
radio.setTransmitPower(7)
basic.showLeds(`
    # # # # #
    # . . . #
    # . # . #
    # . . . #
    # # # # #
    `)
let Mode = 0
let userID = 0
basic.forever(function () {
    radio.sendString("A" + "," + userID + "," + input.acceleration(Dimension.X) + "," + input.acceleration(Dimension.Y) + "," + input.acceleration(Dimension.Z))
    radio.sendString("N" + "," + userID + "," + input.compassHeading())
})
