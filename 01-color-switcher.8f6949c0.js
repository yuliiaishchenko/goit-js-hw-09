!function(){var t=null,e={body:document.querySelector("body"),btnStart:document.querySelector("button[data-start]"),btnStop:document.querySelector("button[data-stop]")};e.btnStart.addEventListener("click",(function(){e.btnStart.toggleAttribute("disabled"),t=setInterval((function(){e.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3)})),e.btnStop.addEventListener("click",(function(){clearInterval(t),e.btnStart.removeAttribute("disabled")}))}();
//# sourceMappingURL=01-color-switcher.8f6949c0.js.map
