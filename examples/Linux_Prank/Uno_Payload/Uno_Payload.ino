// UnoQuack by CipherusPrime.

#include <HIDKeyboard.h>
HIDKeyboard keyboard;

void setup() {
	keyboard.begin();
	delay(1000);
}

void loop() {

	// Fake Linux Steam Update

	keyboard.pressKey((CTRL | ALT), 't');
	keyboard.releaseKey();

	delay(1000);

	keyboard.print("xdg-open https://fakeupdate.net/steam/");

	keyboard.pressSpecialKey(ENTER);
	keyboard.releaseKey();

	delay(300);

	keyboard.pressSpecialKey(F11);
	keyboard.releaseKey();

	// [#] Github: name-is-cipher

	while(1);

}