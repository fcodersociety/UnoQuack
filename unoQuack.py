import sys
import os

# Banner
print("\t##########################")
print("\t#    _      _      _     #")
print("\t#  >(.)__ <(.)__ =(.)__  #")
print("\t#   (___/  (___/  (___/  #")
print("\t#                        #")
print("\t#------- UnoQuack -------#")
print("\t# Ducky to Uno Converter #")
print("    ##################################")
print("")

# Counter Variable initiations
DebugMode = 0
LineError  = 1
MainError = 0
DefaultDelay = 0
LineNum = 0

# Instruntion on how to use UnoQuack.py
def instructions():
   print("\nERROR: Ducky script not passed")
   print("Usage of UnoQauck:", end=" ")
   print("$ python3 UnoQauck.py ducky_script.txt\n")
   exit()

# To check if ducky script is passed or not
sys.argv.append('')
if sys.argv[1] == "":
   if DebugMode == 1:
      print("Debug Mode activated:")
      print("")
   else:
      instructions()

# Assining Object pipes to input and output file.
if DebugMode == 1:
   # Debug MODE
   file_in = open("examples/Test_Script_Dev/Ducky_Test_Script.txt", "r")
   file_out = open(r"examples/Test_Script_Dev/Uno_Payload.txt", "w")
else:
   # Normal MODE
   file_in = open(sys.argv[1], "r")
   if sys.argv[2] != "":
      file_out = open(sys.argv[2], "w")
   else:
      file_out = open(r"Uno_Payload.ino", "w")

# Modifers key list
modifiers = [
   "GUI", "SHIFT", "ALT", "CTRL"
]

# Speacial keys list
speacial_keys = [
   "ENTER",
   "ESCAPE",
   "BACKSPACE",
   "TAB",
   "SPACEBAR",
   "CAPSLOCK",
   "PRINTSCREEN",
   "SCROLLLOCK",
   "PAUSE",
   "INSERT",
   "HOME",
   "PAGEUP",
   "DELETE",
   "END",
   "PAGEDOWN",
   "RIGHTARROW",
   "LEFTARROW",
   "DOWNARROW",
   "UPARROW",
   # Keypad Keys
   "NUMLOCK",
   "KEYPADSLASH",
   "KEYPADSTAR",
   "KEYPADMINUS",
   "KEYPADPLUS",
   "KEYPADENTER",
   "KEYPAD1",
   "KEYPAD2",
   "KEYPAD3",
   "KEYPAD4",
   "KEYPAD5",
   "KEYPAD6",
   "KEYPAD7",
   "KEYPAD8",
   "KEYPAD9",
   "KEYPAD0",
   "KEYPADPERIOD",
   # System Keys
   "KEYBOARDAPPLICATION",
   "KEYBOARDPOWER",
   "VOLUMEMUTE",
   "VOLUMEUP",
   "VOLUMEDOWN"
   # Function Keys
   "F1",
   "F2",
   "F3",
   "F4",
   "F5",
   "F6",
   "F7",
   "F8",
   "F9",
   "F10",
   "F11",
   "F12",
   # Modifers as Speacial keys
   "GUI",
   "SHIFT",
   "ALT",
   "CTRL",
]

# Writing UNO HID Pre initilization
file_out.write("// UnoQuack by fCoderSociety.\n")
file_out.write("\n")
file_out.writelines("#include <HIDKeyboard.h>\n")
file_out.write("HIDKeyboard keyboard;\n")
file_out.write("\n")

# Writing UNO HID Setup
file_out.write("void setup() {\n")
file_out.write("	keyboard.begin();\n")
file_out.write("	delay(1000);\n")
file_out.write("}\n")
file_out.write("\n")

# Writing UNO HID Main Loop
file_out.write("void loop() {\n")

for line in file_in.readlines():
   # Loop Line Pre initiations
   LineNum += 1
   Rem = 0
   LineError = 1
   line = line.strip("\n")
   LineList = line.split()
   # Multiple name convertions
   if line == '':
      continue
   if LineList[0] == "WINDOWS":
      line = line.replace("WINDOWS", "GUI")
   if LineList[0] == "BREAK":
      line = line.replace("BREAK", "PAUSE")
   if LineList[0] == "SPACE":
      line = line.replace("SPACE", "SPACEBAR")
   if LineList[0] == "CONTROL":
      line = line.replace("CONTROL", "CTRL")
   if LineList[0] == "MENU" or LineList[0] == "APP":
      line = "SHIFT F10"
   if LineList[0] == "UP":
      line = line.replace("UP", "UPARROW")
   if LineList[0] == "DOWN":
      line = line.replace("DOWN", "DOWNARROW")
   if LineList[0] == "LEFT":
      line = line.replace("LEFT", "LEFTARROW")
   if LineList[0] == "RIGHT":
      line = line.replace("RIGHT", "RIGHTARROW")
   if (LineList[0] in modifiers and "ESC" in LineList) or (LineList[0] == "ESC"):
      line = line.replace("ESC", "ESCAPE")
   LineList = line.split()
   # Loop Main Functions  
   if LineNum == 1:
      # Check for Default Delay
      if LineList[0] == "DEFAULT_DELAY" or LineList[0] == "DEFAULTDELAY":
         delay = int(LineList[1])*10
         delay = str(delay)
         DefaultDelay = 1
      continue 
   if LineList[0] == "REM":
      # REM This is a comment.
      line = line.replace("REM", '\n\t//')
      line = line + "\n"
      file_out.writelines(line)
      continue
   if LineList[0] == "STRING":
      # STRING hello World !!!
      line = line[7:]
      if "\"" in line:
         line = line.replace("\"", "\\\"")
      line = "\n\tkeyboard.print(\"" + line + "\");\n"
      file_out.writelines(line)
      LineError = 0
   if LineList[0] == "DELAY":
      # DELAY 1000
      line = "\n\tdelay(" + str(LineList[1]) + ");\n"
      file_out.writelines(line)
      continue
   if line in speacial_keys:
         # ENTER, DEL, F1, VOLUMEMUTE, etc
         line = "\n\tkeyboard.pressSpecialKey(" + line + ");\n"
         line += "\tkeyboard.releaseKey();\n"
         file_out.writelines(line)
         LineError = 0
   if LineList[0] in modifiers:
      if len(LineList) == 2:
         if LineList[1] not in speacial_keys:
            # 1. GUI r
            line = LineList[0] + ", " + "\'" + LineList[1].lower() + "\'"
            line = "\n\tkeyboard.pressKey(" + line + ");\n"
            line += "\tkeyboard.releaseKey();\n"
            file_out.writelines(line)
            LineError = 0
         elif LineList[1] in speacial_keys:
            # 2. ALT TAB
            line = LineList[0] + ", " + LineList[1]
            line = "\n\tkeyboard.pressSpecialKey(" + line + ");\n"
            line += "\tkeyboard.releaseKey();\n"
            file_out.writelines(line)
            LineError = 0 
      if len(LineList) == 3:
         if LineList[2] not in speacial_keys:
            # 3. CTRL SHIFT v
            line = "(" + LineList[0] + " | " + LineList[1] + ")"
            line += ", " + "\'" + LineList[2].lower() + "\'"
            line = "\n\tkeyboard.pressKey(" + line + ");\n"
            line += "\tkeyboard.releaseKey();\n"
            file_out.writelines(line)
            LineError = 0   
         elif LineList[2] in speacial_keys:
            # 4. CTRL ALT DEL
            line = "(" + LineList[0] + " | " + LineList[1] + ")"
            line += ", " + LineList[2]
            line = "\n\tkeyboard.pressSpecialKey(" + line + ");\n"
            line += "\tkeyboard.releaseKey();\n"
            file_out.writelines(line)
            LineError = 0
   # Default Delay execution
   if DefaultDelay == 1:
      line = "\n"
      line += "\tdelay(" + delay + ");\n"
      file_out.writelines(line)
   # Print if there is any line Error
   if LineError == 1:
      print("[UnoQuack] : Error at line " + str(LineNum))
      MainError = 1

# Writing UNO HID closing lines
file_out.write("\n\twhile(1);\n\n")
file_out.write("}")

# cleaning
file_in.close()
file_out.close()

# Function to print on success
def OutSucess():
   if DebugMode == 1:
      print("[UnoQuack] : Convertion Successful !!!")
      print("")
   else:
      # Print success status
      print("[UnoQuack] : Convertion Successful !!!")
      print("")
      # Check for external name for output file
      if sys.argv[2] != "":
         print("[UnoQuack] : Converted file is named as " + sys.argv[2])
      else:
         print("[UnoQuack] : Converted file is named as Uno_Paload.ini,")
      # Print success status
      print("[UnoQuack] : and placed in the same directory.")
      print("")
      print("[#] : Give the repo a star, if it was helpful.")
      print("")

# Function to print on failure
def OutFail():
   print("")
   print("[UnoQuack] : Convertion Failed !!!")
   print("")
   if DebugMode == 1:
      os.remove("examples/Test_Script_Dev/Uno_Payload.txt")
   else:
      if sys.argv[2] != "":
         os.remove(sys.argv[2])
      else:
         os.remove("Uno_Payload.ini")
   print("")

# Command line status info
if MainError == 0:
   OutSucess()
else:
   OutFail()

# REMINDER: OFF the Debug Mode after testing you moron.