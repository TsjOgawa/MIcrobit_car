input.onButtonPressed(Button.A, function () {
    serial.writeLine("B" + "," + userID)
})
radio.onReceivedString(function (receivedString) {
    if (Mode == 1) {
        serial.writeLine(receivedString)
    }
})
input.onButtonPressed(Button.B, function () {
    if (Mode == 0) {
        Mode = 1
        basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            # . . . #
            # # # # #
            `)
    } else {
        Mode = 0
        basic.showLeds(`
            . . . . .
            . # . # .
            . . # . .
            . # . # .
            . . . . .
            `)
    }
})
let userID = 0
let Mode = 0
radio.setGroup(1)
basic.showLeds(`
    # . . . #
    # # . # #
    # # # # #
    . # # # .
    . . # . .
    `)
Mode = 0
userID = 1
