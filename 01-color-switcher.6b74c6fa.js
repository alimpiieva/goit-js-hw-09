!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=null;function a(){var t=document.body,e="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,"0"));t.style.backgroundColor=e}t.addEventListener("click",(function(){t.disabled=!0,n=setInterval(a,1e3)})),e.addEventListener("click",(function(){t.disabled=!1,clearInterval(n),n=null}))}();
//# sourceMappingURL=01-color-switcher.6b74c6fa.js.map