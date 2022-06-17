function convert(data) {
    var result = ``;

    var lines = data.split(/[\n]+/);

    var modifiers = [
        "GUI", 
        "SHIFT", 
        "ALT", 
        "CTRL",
        "CONTROL"
    ];

    var specialKeys = [
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
        "GUI",
        "SHIFT",
        "ALT",
        "CTRL",
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
        "KEYBOARDAPPLICATION",
        "KEYBOARDPOWER",
        "VOLUMEMUTE",
        "VOLUMEUP",
        "VOLUMEDOWN",
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
        "F12"
    ]

    var init = `// UnoQuack by CipherusPrime.\n\n#include <HIDKeyboard.h>\nHIDKeyboard keyboard;\n\nvoid setup() {\n	keyboard.begin();\n	delay(1000);\n}\n\nvoid loop() {\n`;
    result = result.concat(init);
    // console.log(init);

    var actual_lines = data.split(/\n/);
    var exit = false;
    var error_code = [];
    var def_delay = false;
    let def_delay_t;

    lines.forEach(line => {
        if (line === ``) {return};
        var line_sep = line.split(/\W+/).filter(x => x != "");
        var cur_line_a = actual_lines.indexOf(line);
        var cur_line = lines.indexOf(line);
        for (var i = 0; i < line_sep.length; i++) {
            var check = word_handle(line_sep[i], i, line_sep, line, cur_line);
            if (check === `error`) {
                error_code.push([line_sep[i], i, line, cur_line_a])
                exit = true;
            };
        }
    });

    function word_handle(word, pos, line_sep, line, cur_line) {

        if (word == "DEFAULT_DELAY" || word == "DEFAULTDELAY") {
            if(cur_line === 0 && line.trim().replace(word, ``) !== ``) {
                def_delay = true;
                def_delay_t = line_sep[pos + 1] * 10;
                return;
            }
        };

        if (line_sep.length === 1 && specialKeys.includes(word.replaceAll("WINDOWS", "GUI"))) {
            var new_line = `\n\tkeyboard.pressSpecialKey(`+ word.replaceAll("WINDOWS", "GUI") +`);\n\tkeyboard.releaseKey();\n`;
            if (def_delay === true) {
                new_line += `\n\tdelay(` + def_delay_t + `);\n`;
            };
            result = result.concat(new_line);
            // console.log(new_line);
            return;
        };

        if (pos === 0 && word == "REM") {
            var new_line = line.replace("REM ", "\n\t// ");
            new_line = new_line + `\n`;
            result = result.concat(new_line);
            // console.log(new_line);
            return;
        };

        if (pos === 0 && word == "STRING") {
            var new_line = `\n\tkeyboard.print("` + line.replace("STRING ", "").replace("string ", "").replaceAll(`"`, `\\"`).replaceAll(`'`, `\\'`) + `");\n`;
            if (def_delay === true) {
                new_line += `\n\tdelay(` + def_delay_t + `);\n`;
            };
            result = result.concat(new_line);
            // console.log(new_line);
            return;
        };

        if (pos === 0 && word == "DELAY") {
            var new_line = `\n\tdelay(` + line.replace("DELAY ", "") + `);\n`;
            if (def_delay === true) {
                new_line += `\n\tdelay(` + def_delay_t + `);\n`;
            };
            result = result.concat(new_line);
            // console.log(new_line);
            return;
        };

        if (pos === 0 && modifiers.includes(word.replaceAll("WINDOWS", "GUI"))) {
            if (pos === 0 && line_sep.length === 2) {
                if (specialKeys.includes(line_sep[pos + 1].replaceAll("WINDOWS", "GUI"))) {
                    var new_line = `\n\tkeyboard.pressSpecialKey(` + line_sep[pos].replaceAll("WINDOWS", "GUI") + `, ` + line_sep[pos + 1].replace("WINDOWS", "GUI") + `);\n\tkeyboard.releaseKey();\n`;
                    if (def_delay === true) {
                        new_line += `\n\tdelay(` + def_delay_t + `);\n`;
                    };
                    result = result.concat(new_line);
                    // console.log(new_line);
                    return;
                } else {
                    var new_line = `\n\tkeyboard.pressKey(` + line_sep[pos].replaceAll("WINDOWS", "GUI") + `, '` + line_sep[pos + 1].replace("WINDOWS", "GUI").toLowerCase() + `');\n\tkeyboard.releaseKey();\n`;
                    if (def_delay === true) {
                        new_line += `\n\tdelay(` + def_delay_t + `);\n`;
                    };
                    result = result.concat(new_line);
                    // console.log(new_line);
                    return;
                };
            };

            if (pos === 0 && line_sep.length === 3) {
                if (specialKeys.includes(line_sep[pos + 2].replaceAll("WINDOWS", "GUI"))) {
                    var new_line = `\n\tkeyboard.pressKey((` + line_sep[pos].replaceAll("WINDOWS", "GUI") + ` | ` + line_sep[pos + 1].replace("WINDOWS", "GUI") + `), '` + line_sep[pos + 2].replace("WINDOWS", "GUI") + `');\n\tkeyboard.releaseKey();\n`;
                    if (def_delay === true) {
                        new_line += `\n\tdelay(` + def_delay_t + `);\n`;
                    };
                    result = result.concat(new_line);
                    // console.log(new_line);
                    return;
                } else {
                    var new_line = `\n\tkeyboard.pressKey((` + line_sep[pos].replaceAll("WINDOWS", "GUI") + ` | ` + line_sep[pos + 1].replace("WINDOWS", "GUI") + `), ` + line_sep[pos + 2].replace("WINDOWS", "GUI") + `);\n\tkeyboard.releaseKey();\n`;
                    if (def_delay === true) {
                        new_line += `\n\tdelay(` + def_delay_t + `);\n`;
                    };
                    result = result.concat(new_line);
                    // console.log(new_line);
                    return;
                };
            };
        };
        if (pos === 0) {
            var error = `error`;
            return error;
        };
    };
    result = result.concat(`\n\twhile(1);\n\n}`);
    // console.log(`\n\twhile(1);\n\n}`);
    if (exit === false) {
        var test_out = [result, error_code];
        return test_out;
    } else {
        return [``, error_code];
    }
    
};

var test_data = `REM The ducky script is made by cipherusprime, for testing purposes.
REM This Script opens notepad and types "Hello World!" in it.
GUI r
STRING notepad.exe
DELAY 1000
ENTER
STRING Hello "World"!
ENTER
REM [#] Github: name-is-cipher
`;

export {convert}