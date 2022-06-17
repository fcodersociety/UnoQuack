// UnoQuack by CipherusPrime.

#include <HIDKeyboard.h>
HIDKeyboard keyboard;

void setup() {
	keyboard.begin();
	delay(1000);
}

void loop() {

	// Fake Apple Update

	keyboard.pressKey(GUI, 'space');
	keyboard.releaseKey();

	delay(300);

	keyboard.print("safari");

	keyboard.pressSpecialKey(ENTER);
	keyboard.releaseKey();

	delay(800);

	keyboard.print("https://fakeupdate.net/apple/");

	keyboard.pressSpecialKey(ENTER);
	keyboard.releaseKey();

	delay(600);

	keyboard.pressKey((CTRL | GUI), 'f');
	keyboard.releaseKey();

	// [#] Github: name-is-cipher

	while(1);

}