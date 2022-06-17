import * as converter from "./unoquack.js";

const submit_button = document.querySelector(".submit-button");
const clear_button = document.querySelector(".clear-button");
const in_clear_button = document.querySelector(".in-clear-button");
const copy_button = document.querySelector(".copy-button");
const paste_button = document.querySelector(".paste-button");
const download_button = document.querySelector(".download-button");
const input = document.querySelector("#input");
const output = document.querySelector("#output");
const terminal = document.querySelector(".terminal");
const output_section = document.querySelector(".output_section");
const copy_hint = document.querySelector(".noc");
const site_logo = document.querySelector(".site-logo");
const brand_logo = document.querySelector(".brand-logo");
const site_tag = document.querySelector(".site-tag");

site_tag.addEventListener("click", () => {
    window.open('https://github.com/fcodersociety', '_blank');
});

brand_logo.addEventListener("click", () => {
    window.open('https://github.com/fcodersociety', '_blank');
});

site_logo.addEventListener("click", () => {
    window.open('https://github.com/fcodersociety','_blank');
});

input.addEventListener("focusin", () => {
    if (input.innerHTML.trim() === `<div class="placeholder">Type / Paste Your Text Here...</div>`) {
        input.innerHTML = ``;
        return;
    }
});

input.addEventListener("focusout", () => {
    if (input.innerHTML === ``) {
        input.innerHTML = "<div class='placeholder'>Type / Paste Your Text Here...</div>";
        return;
    }
});

let output_data;
let output_check = false;

submit_button.addEventListener("click", () => {
    var input_data;
    if (input.innerHTML.trim() === `<div class="placeholder">Type / Paste Your Text Here...</div>`) {
        return;
    }
    if (input.innerHTML.trim().substr(0,5) === `<div>`) {
        input_data = input.innerHTML.replace(`</div>`, `<br>`).replace(`<div>`, ``);
    } else {
        input_data = input.innerHTML;
    }
    input_data = input_data.replaceAll(`<div>`, `\n`).replaceAll(`</div>`, `\n`).replaceAll(`<font color="#ff0000">`, ``).replaceAll(`</font>`, ``).replaceAll(`<b>`, ``).replaceAll(`</b>`, ``);
    if (input_data === ``) {output.value = ``; return}
    output_data = converter.convert(input_data.replaceAll(`<br>`, `\n`).replaceAll(`<p class="error-element">`, ``).replaceAll(`</p>`, ``).replaceAll(`<font color="#ff0000">`, ``).replaceAll(`</font>`, ``).replaceAll(`<b>`, ``).replaceAll(`</b>`, ``).replaceAll(`&lt;`, `<`).replaceAll(`&gt;`, `>`).replaceAll(`&amp;`, `&`));
    if (output_data[1].length === 0) {
        input.innerHTML = input.innerHTML.replaceAll(`<p class="error-element">`, ``).replaceAll(`</p>`, ``).replaceAll(`<font color="#ff0000">`, ``).replaceAll(`</font>`, ``).replaceAll(`<b>`, ``).replaceAll(`</b>`, ``);
        output.value = output_data[0];
        terminal.innerHTML = `<p class="success">Convertion Successfull!</p>`;
        output_check = true;
        download_button.classList.remove("not");
        return;
    } else {
        terminal.innerHTML = ``;
        var terminal_error = `<p class="error">[UnoQuack]: Conversion Failed !!!<br><br>`;
        input_data = input_data.replaceAll(`<p class="error-element">`, ``).replaceAll(`</p>`, ``);
        input.innerHTML = input_data;
        input.style.color = "#ffffff66";
        setTimeout(() => {input.style.color = "#ffffff"}, 1000);
        var split_dat = input_data.split(/(\W+)/);
        console.log(split_dat);
        output_data[1].forEach(err_elmnt => {
            if (split_dat.includes(err_elmnt[0])) {
                split_dat[split_dat.indexOf(err_elmnt[0])] = `<p class="error-element">` + err_elmnt[0] + `</p>`;
                var join_dat = split_dat.join('').replaceAll(`<br>\n`, ``);
                input.innerHTML = join_dat;
                var error_element = document.querySelector(".error-element");
                error_element.scrollIntoView({block: "nearest", behavior: "smooth"});
            }
            terminal_error += `[UnoQuack]: "` + err_elmnt[0] + `" is not a valid command.<br><br>`;
        });
        terminal_error += `</p>`;
        terminal.innerHTML = terminal_error;
        return;
    }
    
});

clear_button.addEventListener("click", () => {
    output.value = "";
    output_check = false;
    download_button.classList.add("not");
});

in_clear_button.addEventListener("click", () => {
    input.innerHTML = `<div class="placeholder">Type / Paste Your Text Here...</div>`;
    terminal.innerHTML = `<div class="placeholder-t">
    _      _      _
  >(.)__ <(.)__ =(.)__
   (___/  (___/  (___/

------- UnoQuack -------

 Ducky To Uno Converter</div>
            <div class="title-t"><br>
             <br>
                <div>
                    Check our <a href="https://github.com/fcodersociety/UnoQuack" target="_blank">Repo</a> for Python3 version of UnoQuack.
                    <br> <br>
                    And Give it a star, if it was helpful.
                </div>             
            </div>
            <div class="logo">
                fCoderSociety &trade;
            </div>  `;
});

copy_button.addEventListener("click", (e) => {
    if (output.value === "") {return};
    navigator.clipboard.writeText(output.value);
    copy_hint.classList.add("yec");
    setTimeout(() => {copy_hint.classList.remove("yec")}, 1000)
});

paste_button.addEventListener("mousedown", (e) => {
    navigator.clipboard.readText()
    .then(clipText => {
        if (clipText !== ``) {
            if (input.innerHTML.trim() === `<div class="placeholder">Type / Paste Your Text Here...</div>`) {
                input.innerHTML = ``;
            }
            input.innerHTML = input.innerHTML.replace(`<div><br></div>`, `\n`) + clipText;
        };
    });
});

document.addEventListener("keydown", (e) => {
    if (e.key == "F4") {
        submit_button.click();
    };
});

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

download_button.addEventListener("click", () => {
    if (output_check === true) {
        download("Uno_Payload.ino", output_data[0]);
    }
});
