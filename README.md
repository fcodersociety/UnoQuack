<pre>
  888     888                    .d88888b.                             888      
  888     888                   d88P" "Y88b                            888      
  888     888                   888     888                            888           _      _      _
  888     888 88888b.   .d88b.  888     888 888  888  8888b.   .d8888b 888  888    >(.)__ <(.)__ =(.)__
  888     888 888 "88b d88""88b 888     888 888  888     "88b d88P"    888 .88P     (___/  (___/  (___/ 
  888     888 888  888 888  888 888 Y8b 888 888  888 .d888888 888      888888K    -^------^-------^-----
  Y88b. .d88P 888  888 Y88..88P Y88b.Y8b88P Y88b 888 888  888 Y88b.    888 "88b       fCoderSociety &trade;
   "Y88888P"  888  888  "Y88P"   "Y888888"   "Y88888 "Y888888  "Y8888P 888   88L" 
                                       Y8b                                      
</pre>

# Pre Requisites
- You need to add [UNO-HID Library](https://github.com/SFE-Chris/UNO-HIDKeyboard-Library) to Arduino's IDE (one time thing).
- After uploading the code to Arduino, Atmega16u2 needs to be flashed with [Arduino-keyboard-0.3.hex](https://github.com/coopermaa/USBKeyboard/tree/master/firmware) in order to work as HID device.
- And once the work is done, it needs to be flashed back with orginial [Ardunio-usbserial-uno.hex](https://github.com/arduino/ArduinoCore-avr/blob/master/firmwares/atmegaxxu2/arduino-usbserial/Arduino-usbserial-uno.hex) in order to upload any code agian.
- Intructions for flashing .hex frimware to Arduino can be found [here](https://www.arduino.cc/en/Hacking/DFUProgramming8U2) on official page.  
  
 \[I'm Plannig to write a new frimware to avoid flashing every time\]
 
 # UnoQuack Insturctions
**UnoQuack** is an easy DuckyScript to Arduino Uno payload converter.   
  
## Web converter - online 🌐 (Recommended)
You can use UnoQuack by visiting the <a href="https://cipherusprime.github.io/UnoQuack/" target="_blank">converter website</a> .

## Python converter - Local 💻 or 📱

You can download python file (unoquack.py) from [realeases](https://github.com/cipherusprime/UnoQuack/releases/download/v1.0/unoQuack.py).  
And use it locally.

> **USAGE:**   
- Run: ` python3 unoQuack.py ./duckyscript.txt optional_payload_name.ino`
- **./duckycript.txt** is location to input Ducky script.
- **optional_payload_name.ino** is the optional output file name (if left blank default name is "**Uno_Payload.ino**").
- converted Arduino Uno Payload will be in the same directory.
