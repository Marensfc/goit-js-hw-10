import"./assets/modulepreload-polyfill-3cfb730f.js";import{f as m,i as h}from"./assets/vendor-77e16229.js";const f="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAQhJREFUWEfNl40KwyAMhNOHXB9yfclxw2xh+HOXKVYolGpzXxJM9LDveJgZnjN8W/H6NLOrPHYUBQhjAgOTqyCgAS0MaFwAiOLu8QqIKO46JwBqE7Mj0dTwFKyE6Np2AHi8AmJoMwLMhhiKQ/AXYBYEJd4C+BeCFu8BZCEk8RGACiGLMwAsREqcBRhBYN7La+wdVDWt7YJWA2p5WVtPiSsRcBEGghbPAPTSkeofSgqYKEjeZyKwNQWMuHyeYFPQ2+fLtyFTZJg11e09ioBiWFn7gekBZAzK/7QAZEMhvtK/tzuQSPStplG+U7ZucyilaAceq130XbZvcTHZfjXzUrrtcuq523I9fwHtcW4fuzCszAAAAABJRU5ErkJggg==",g=document.querySelector("input#datetime-picker"),o=document.querySelector(".btn-start"),d=document.querySelectorAll("span.value");o.setAttribute("disabled","disabled");let l,i;const b={message:"Please choose a date in the future",messageColor:"white",backgroundColor:"red",close:!1,iconUrl:f,position:"topRight",progressBar:!1,animateInside:!1,timeout:3e3};m("input#datetime-picker",{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){l=e[0],i=l-new Date,p()}});function p(){Math.sign(i)!==-1?(o.removeAttribute("disabled","disabled"),o.addEventListener("click",y)):(h.show(b),o.setAttribute("disabled","disabled"))}function y(){const e=setInterval(()=>{i-=1e3;let r=w(i);const{days:a,hours:c,minutes:u,seconds:s}=r,n=[a,c,u,s].map(t=>t.toString().padStart(2,"0"));for(let t=0;t<d.length;t++)d[t].textContent=n[t];i<1e3&&clearInterval(e)},1e3);o.setAttribute("disabled","disabled"),g.setAttribute("disabled","disabled")}function w(e){const s=Math.floor(e/864e5),n=Math.floor(e%864e5/36e5),t=Math.floor(e%864e5%36e5/6e4),A=Math.floor(e%864e5%36e5%6e4/1e3);return{days:s,hours:n,minutes:t,seconds:A}}
//# sourceMappingURL=commonHelpers.js.map
