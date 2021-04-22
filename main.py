def on_button_pressed_a():
    radio.send_string("OK")
input.on_button_pressed(Button.A, on_button_pressed_a)

def BLEmode():
    if Mode == 1:
        radio.send_string("A" + "," + str(Mode) + "," + str(input.acceleration(Dimension.X)) + "," + str(input.acceleration(Dimension.Y)) + "," + str(input.acceleration(Dimension.Z)))
        radio.send_string("N" + "," + str(Old_mode) + "," + str(input.compass_heading()))

def on_button_pressed_b():
    global Old_mode
    if Mode == 0:
        Old_mode = 1
        basic.show_leds("""
            . . # . .
            . . # . .
            # . # . #
            # . . . #
            # # # # #
            """)
    else:
        Old_mode = 0
        basic.show_leds("""
            . . . . .
            . # . # .
            . . # . .
            . # . # .
            . . . . .
            """)
input.on_button_pressed(Button.B, on_button_pressed_b)

Mode = 0
Old_mode = 0
radio.set_group(1)
basic.show_leds("""
    # . . . #
    # # . # #
    # # # # #
    . # # # .
    . . # . .
    """)
Black = 0
White = 1
straight = 0
Right = 1
Left = 2
Old_mode = 0
Mode = 0

def on_forever():
    global Old_mode
    if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == Black and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == Black:
        maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, 255)
        Old_mode = 0
        BLEmode()
    elif maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == Black and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == White:
        maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 30)
        maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 255)
        Old_mode = Left
        BLEmode()
    elif maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == White and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == Black:
        maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 255)
        maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 30)
        Old_mode = Right
        BLEmode()
    elif maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == White and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == White:
        if Old_mode == straight:
            BLEmode()
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CCW, 255)
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CCW, 30)
        elif Old_mode == Right:
            BLEmode()
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CCW, 255)
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 255)
        elif Old_mode == Left:
            BLEmode()
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 255)
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CCW, 255)
basic.forever(on_forever)
