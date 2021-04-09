input.onButtonPressed(Button.A, function () {
    radio.sendString("OK")
})
function BLEmode () {
    if (Mode == 1) {
        radio.sendString("A" + "," + Mode + "," + input.acceleration(Dimension.X) + "," + input.acceleration(Dimension.Y) + "," + input.acceleration(Dimension.Z))
        radio.sendString("N" + "," + Old_mode + "," + input.compassHeading())
    }
}
input.onButtonPressed(Button.B, function () {
    if (Mode == 0) {
        Old_mode = 1
        basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            # . . . #
            # # # # #
            `)
    } else {
        Old_mode = 0
        basic.showLeds(`
            . . . . .
            . # . # .
            . . # . .
            . # . # .
            . . . . .
            `)
    }
})
let Mode = 0
let Old_mode = 0
radio.setGroup(1)
basic.showLeds(`
    # . . . #
    # # . # #
    # # # # #
    . # # # .
    . . # . .
    `)
let Black = 0
let White = 1
let straight = 0
let Right = 1
let Left = 2
Old_mode = 0
Mode = 0
basic.forever(function () {
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == Black && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == Black) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 255)
        Old_mode = 0
        BLEmode()
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == Black && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == White) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 255)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 255)
        Old_mode = Left
        BLEmode()
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == White && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == Black) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 255)
        Old_mode = Right
        BLEmode()
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == White && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == White) {
        if (Old_mode == straight) {
            BLEmode()
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 255)
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 30)
        } else if (Old_mode == Right) {
            BLEmode()
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 255)
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
        } else if (Old_mode == Left) {
            BLEmode()
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 255)
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 255)
        }
    }
})
