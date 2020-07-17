/*!
 * Dynamic Background  - https://github.com/AlanGPmx/background-change
 * Version - 1.0.0
 * Licensed under the MIT license - http://opensource.org/licenses/MIT
 *
 * Copyright (c) 2020 Alan Garduño Pineda
 */

(function () {
  function easy_background(selector, sld_args) {
    function empty_img(x) {
      if (x)
        return "<img src='" + x + "'>";
      else
        return "";
    }

    //DEFULT VALUE TO DELAY
    var def_del = 10000;

    var p = document.createElement("div");
    p.innerHTML = " ";
    p.classList.add("easy_slider");

    document.body.insertBefore(p, document.body.firstChild);
    sld_args.slide.forEach(function (v, i) {
      if (v) {
        document.querySelector(".easy_slider").innerHTML += empty_img(v);
        if (
          typeof sld_args.delay[i] == "undefined" ||
          typeof sld_args.delay[i] == "" ||
          sld_args.delay[i] == 0
        ) {
          sld_args.delay[i] = def_del;
        }
      }
    });

    document.querySelector(".easy_slider").style.display = "none";
    document.querySelector(selector).style.backgroundSize = "cover";
    document.querySelector(selector).style.backgroundRepeat = "no-repeat";
    document.querySelector(selector).style.backgroundPosition = "center center";

    setTimeout(function () {
      if (typeof sld_args.transition_timing === "undefined") {
        sld_args.transition_timing = "ease-in";
      }
      if (typeof sld_args.transition_duration === "undefined") {
        sld_args.transition_duration = 500;
      }
      var transition =
        "all " +
        sld_args.transition_duration +
        "ms " +
        sld_args.transition_timing;
      document.querySelector(selector).style.WebkitTransition = transition;
      document.querySelector(selector).style.MozTransition = transition;
      document.querySelector(selector).style.MsTransition = transition;
      document.querySelector(selector).style.OTransition = transition;
      document.querySelector(selector).style.transition = transition;
    }, 100);

    var n = 1;
    var li = 0;

    function slider() {
      sld_args.slide.forEach(function (vvv, iii) {
        if (n > 1) {
          var delay = li;
          setTimeout(function () {
            document.querySelector(selector).style.backgroundImage =
              "url('" + vvv + "')";
          }, delay);
          li = li + sld_args.delay[iii];
        } else {
          n++;
          li = sld_args.delay[iii];
          document.querySelector(selector).style.backgroundImage =
            "url('" + vvv + "')";
        }
      });
    }

    slider();

    setInterval(function () {
      slider();
    }, sld_args.delay.length);
  }

  base = "public/assets/backgrounds/"; //PATH TO GET IMAGES
  easy_background("body", { //CONFIG NAME EACH IMAGE
    slide: [
      base + "bg_1.jpg",
      base + "bg_2.jpg",
      base + "bg_3.jpg",
      base + "bg_4.jpg",
      base + "bg_0.png",
    ],
    delay: [],
  });
})();
