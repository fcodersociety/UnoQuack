// UnoQuack by CipherusPrime.

#include <HIDKeyboard.h>
HIDKeyboard keyboard;

void setup() {
	keyboard.begin();
	delay(1000);
}

void loop() {

	// Fake Windows Update

	keyboard.pressKey(GUI, 'r');
	keyboard.releaseKey();

	delay(500);

	keyboard.print("iexplore -k http://fakeupdate.net/win10/index.html");

	keyboard.pressSpecialKey(ENTER);
	keyboard.releaseKey();

	// [#] Github: name-is-cipher

	while(1);

}