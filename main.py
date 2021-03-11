def on_received_string(receivedString):
    global Mode
    Mode = 1
radio.on_received_string(on_received_string)

Mode = 0
Mode = 0
userID = 0
radio.set_group(1)
radio.set_transmit_power(7)
basic.show_leds("""
    # # # # #
    # . . . #
    # . # . #
    # . . . #
    # # # # #
    """)

def on_forever():
    if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 0 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0:
        maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, 255)
    elif maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 0 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 1:
        maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 0)
        maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 255)
        if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 1 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 1:
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 0)
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 255)
    elif maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 1 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0:
        maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 255)
        maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 0)
        if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 1 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 1:
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 255)
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 0)
            if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 1 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0:
                maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 255)
            else:
                maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 0)
    if Mode == 1:
        radio.send_string("A" + "," + ("" + str(userID)) + "," + ("" + str(input.acceleration(Dimension.X))) + "," + ("" + str(input.acceleration(Dimension.Y))) + "," + ("" + str(input.acceleration(Dimension.Z))))
        radio.send_string("N" + "," + ("" + str(userID)) + "," + ("" + str(input.compass_heading())))
basic.forever(on_forever)
