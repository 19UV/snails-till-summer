(function(){"use strict";var e={8418:function(e,t,n){var s=n(8935),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"wrapper"},[n("Countdown")],1)])},o=[],r=n(6164),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("div",{class:e.counting_down?"digit-container":"digit-container-large"},[n("div",{class:e.counting_down?"digit":"digit-large"},[e._v(e._s(e.days))]),n("div",{staticClass:"label"},[e._v(e._s(1==e.days?"Day":"Days"))])]),e.counting_down?n("div",{staticClass:"digit-container"},[n("div",{staticClass:"digit"},[e._v(e._s(e.hours))]),n("div",{staticClass:"label"},[e._v("Hours")])]):e._e(),e.counting_down?n("div",{staticClass:"digit-container"},[n("div",{staticClass:"digit"},[e._v(e._s(e.minutes))]),n("div",{staticClass:"label"},[e._v("Minutes")])]):e._e(),e.counting_down?n("div",{staticClass:"digit-container"},[n("div",{staticClass:"digit"},[e._v(e._s(e.seconds))]),n("div",{staticClass:"label"},[e._v("Seconds")])]):e._e()])},c=[],l=n(3796),u=JSON.parse('{"first_day":"7;24","last_day":"5;3","no_school":["8;6","9;8","9;28","9;29","10;24","10;25","10;26","11;23","11;24","11;25","11;26","11;27","11;28","11;29","11;30","11;31","0;14","0;17","1;4","1;25","1;28","2;7","2;8","2;9","2;10","2;11","2;28","3;15","4;30"]}'),d=function(e,t,n,s){var i,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,n):s;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(e,t,n,s);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(r=(o<3?i(r):o>3?i(t,n,r):i(t,n))||r);return o>3&&r&&Object.defineProperty(t,n,r),r};const{first_day:f,last_day:g,no_school:v}=u,h=new Date(2021,parseInt(f.split(";")[0]),parseInt(f.split(";")[1]),8,40),p=new Date(2022,parseInt(g.split(";")[0]),parseInt(g.split(";")[1]),11,40);function w(e){return h.setFullYear(e.getFullYear()-1),p.setFullYear(e.getFullYear()),h.getTime()<=e.getTime()&&e.getTime()<=p.getTime()}function _(e){return!!m(e)&&(!(h.getHours()>e.getHours()||e.getHours()>p.getHours())&&(!(h.getHours()==e.getHours()&&e.getMinutes()<h.getMinutes())&&!(p.getHours()==e.getHours()&&e.getMinutes()>=p.getMinutes())))}function m(e){const t=e.getMonth()+";"+e.getDate();return 0!=e.getDay()&&6!=e.getDay()&&!v.includes(t)}function y(e,t,n){if(_(t)){let s=Math.floor((n.getTime()-t.getTime())/1e3);e.hours+=Math.floor(s/3600),s-=60*e.hours*60,e.minutes+=Math.floor(s/60),s-=60*e.minutes,e.seconds+=s}}function b(e){if(!w(e))return{days:0,hours:0,minutes:0,seconds:0};let t={days:0,hours:0,minutes:0,seconds:0};const n=new Date(e.getFullYear(),e.getMonth(),e.getDate(),h.getHours(),h.getMinutes(),h.getSeconds()),s=new Date(e.getFullYear(),e.getMonth(),e.getDate(),p.getHours(),p.getMinutes(),p.getSeconds());m(e)&&y(t,e,s);const i=Math.ceil((p.getTime()-s.getTime())/864e5);for(let o=1;o<=i;o++){const n=new Date(e.getTime()+864e5*o);m(n)&&t.days++}return n.getTime()>e.getTime()&&t.days++,t}let O=class extends r.w3{constructor(...e){super(...e),(0,l.Z)(this,"days",0),(0,l.Z)(this,"hours",0),(0,l.Z)(this,"minutes",0),(0,l.Z)(this,"seconds",0),(0,l.Z)(this,"counting_down",!0),(0,l.Z)(this,"interval",0)}mounted(){this.days=b(new Date).days,this.update_time(),this.interval=window.setInterval(this.update_time,1e3)}destroyed(){window.clearInterval(this.interval)}update_time(){const e=new Date;this.counting_down=_(e),({days:this.days,hours:this.hours,minutes:this.minutes,seconds:this.seconds}=b(e))}};O=d([r.wA],O);var C=O,D=C,M=n(1001),T=(0,M.Z)(D,a,c,!1,null,"17fbac73",null),j=T.exports,H=function(e,t,n,s){var i,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,n):s;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(e,t,n,s);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(r=(o<3?i(r):o>3?i(t,n,r):i(t,n))||r);return o>3&&r&&Object.defineProperty(t,n,r),r};let k=class extends r.w3{};k=H([(0,r.wA)({components:{Countdown:j}})],k);var Z=k,F=Z,x=(0,M.Z)(F,i,o,!1,null,null,null),I=x.exports,P=n(563);(0,P.z)("/snails-till-summer/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}}),s.Z.config.productionTip=!1,new s.Z({render:e=>e(I)}).$mount("#app")}},t={};function n(s){var i=t[s];if(void 0!==i)return i.exports;var o=t[s]={exports:{}};return e[s](o,o.exports,n),o.exports}n.m=e,function(){var e=[];n.O=function(t,s,i,o){if(!s){var r=1/0;for(u=0;u<e.length;u++){s=e[u][0],i=e[u][1],o=e[u][2];for(var a=!0,c=0;c<s.length;c++)(!1&o||r>=o)&&Object.keys(n.O).every((function(e){return n.O[e](s[c])}))?s.splice(c--,1):(a=!1,o<r&&(r=o));if(a){e.splice(u--,1);var l=i();void 0!==l&&(t=l)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[s,i,o]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,s){var i,o,r=s[0],a=s[1],c=s[2],l=0;if(r.some((function(t){return 0!==e[t]}))){for(i in a)n.o(a,i)&&(n.m[i]=a[i]);if(c)var u=c(n)}for(t&&t(s);l<r.length;l++)o=r[l],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(u)},s=self["webpackChunksnails_till_summer"]=self["webpackChunksnails_till_summer"]||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))}();var s=n.O(void 0,[998],(function(){return n(8418)}));s=n.O(s)})();
//# sourceMappingURL=app.85b1d9a2.js.map