input.onButtonPressed(Button.A, function () {
    radio.sendString("OK")
})
function BLEmode () {
    if (Mode == 1) {
        radio.sendString("A" + "," + coner + "," + input.acceleration(Dimension.X) + "," + input.acceleration(Dimension.Y) + "," + input.acceleration(Dimension.Z))
        radio.sendString("N" + "," + coner + "," + input.compassHeading())
    }
}
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
let Mode = 0
let coner = 0
radio.setGroup(1)
basic.showLeds(`
    # . . . #
    # # . # #
    # # # # #
    . # # # .
    . . # . .
    `)
coner = 0
Mode = 0
let userID = 1
basic.forever(function () {
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        if (coner != 0) {
            coner = 0
            BLEmode()
        }
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 255)
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
        if (coner != 1) {
            coner = 1
            BLEmode()
        }
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 255)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 255)
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
            if (coner != 3) {
                coner = 3
                BLEmode()
            }
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 255)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 255)
        }
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        if (coner != 2) {
            coner = 2
            BLEmode()
        }
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 255)
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
            if (coner != 3) {
                coner = 3
                BLEmode()
            }
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 255)
            if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
                if (coner != 2) {
                    coner = 2
                    BLEmode()
                }
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
            } else {
                if (coner != 7) {
                    coner = 7
                    BLEmode()
                }
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 255)
            }
        }
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
        if (coner != 3) {
            coner = 3
            BLEmode()
        }
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 255)
    }
})
