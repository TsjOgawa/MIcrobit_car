def my_function():
    pass
maqueen.lt_event(maqueen.Patrol1.PATROL_RIGHT,
    maqueen.Voltage.HIGH,
    my_function)

def my_function2():
    pass
maqueen.lt_event(maqueen.Patrol1.PATROL_LEFT,
    maqueen.Voltage.HIGH,
    my_function2)

Mode = 0
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
    userID = 0
    maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, 300)
    radio.send_string("A" + "," + ("" + str(userID)) + "," + ("" + str(input.acceleration(Dimension.X))) + "," + ("" + str(input.acceleration(Dimension.Y))) + "," + ("" + str(input.acceleration(Dimension.Z))))
    radio.send_string("N" + "," + ("" + str(userID)) + "," + ("" + str(input.compass_heading())))
basic.forever(on_forever)
