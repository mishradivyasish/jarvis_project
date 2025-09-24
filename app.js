<script>
// ========== ELEMENT REFERENCES ==========
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const speakBtn = document.querySelector("#speak");
const time = document.querySelector("#time");
const battery = document.querySelector("#battery");
const internet = document.querySelector('#internet');
const setup = document.querySelector(".jarvis_setup");

// ========== SPEECH RECOGNITION ==========
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

//sr start
recognition.onstart = function () {
  console.log("vr active");
};

//sr result
let windowsB = [];
let openedTab = null; // fix: defined globally

recognition.onresult = function (event) {
  console.log(event);
  let current = event.resultIndex;
  let transcript = event.results[current][0].transcript.toLowerCase();

  let userdata = localStorage.getItem("jarvis_setup");
  console.log(`my words: ${transcript}`);

  // greetings
  if (transcript.includes("hello jarvis") || transcript.includes("hi jarvis") || transcript.includes("hey jarvis")) {
    readOut("hello sir");
  }

  // open youtube
  if (transcript.includes("open youtube")) {
    readOut("Opening youtube sir");
    let a = window.open("https://www.youtube.com/");
    windowsB.push(a);
  }

  // open google
  if (transcript.includes("open google")) {
    readOut("Opening google sir");
    let b = window.open("https://www.google.com/");
    windowsB.push(b);
  }

  // open firebase
  if (transcript.includes("open firebase") || transcript.includes("firebase") || transcript.includes("fire base")) {
    readOut("Opening firebase console sir");
    window.open("https://console.firebase.google.com/?pli=1");
  }

  // google search
  if (transcript.includes("search") || transcript.includes("how") || transcript.includes("where") || transcript.includes("when") || transcript.includes("will you")) {
    readOut("Here are results");
    let input = transcript.replace("play", "").trim();

    if (transcript.includes("on youtube")) {
      window.open(`https://www.youtube.com/results?search_query=${input}`);
    } else {
      window.open(`https://www.google.com/search?q=${input}`);
    }
    console.log(input);
  }

  // time
  if (transcript.includes("what is the time") || transcript.includes("time jarvis")) {
    var day = new Date();
    let hours = day.getHours();
    let minute = day.getMinutes();
    let second = day.getSeconds();

    if (hours >= 0 && hours < 12) {
      if (hours == 0) readOut(`Sir time is ${hours + 12} Am, ${minute} minutes and ${second} seconds sir`);
    } else if (hours >= 12) {
      if (hours == 12) readOut(`Sir time is ${hours} Pm, ${minute} minutes and ${second} seconds sir`);
      else readOut(`Sir time is ${hours - 12} pm ${minute} minutes and ${second} seconds sir`);
    }
  }

  // open github
  if (transcript.includes("open github")) {
    readOut("opening github sir");
    window.open("https://github.com");
  }

  // open github profile
  if (transcript.includes("open my github profile") || transcript.includes("my github profile")) {
    readOut("Opening github profile sir");
    let e = window.open(`https://github.com/${JSON.parse(userdata).github}`);
  }

  // open instagram profile
  if (transcript.includes("open my instagram profile")) {
    readOut("opening instagram profile sir");
    window.open(`https://www.instagram.com/${JSON.parse(userdata).instagram}/`);
  }

  // close all tabs
  if (transcript.includes("close all tabs")) {
    readOut("Closing all tabs sir");
    windowsB.forEach(g => {
      if (g && !g.closed) g.close();
    });
    windowsB = [];
  }

  // open instagram
  if (transcript.includes("open instagram")) {
    readOut("opening instagram Sir");
    window.open("https://www.instagram.com/");
  }

  // open whatsapp
  if (transcript.includes("open whatsapp") || transcript.includes("whatsapp")) {
    readOut("Opening whatsapp sir");
    window.open("https://web.whatsapp.com/");
  }

  // play video
  if (transcript.startsWith("play")) {
    let query = transcript.replace("play", "").trim();
    playOnYouTube(query);
  }

  // open chatgpt
  if (transcript.includes("chatgpt")) {
    readOut("Opening ChatGPT boss");
    window.open("https://chatgpt.com/");
  }

  // close tab
  if (transcript.includes("close tab")) {
    if (windowsB.length > 0) {
      let lastTab = windowsB.pop();
      if (lastTab && !lastTab.closed) lastTab.close();
    } else if (openedTab && !openedTab.closed) {
      openedTab.close();
      openedTab = null;
    } else {
      window.close();
    }
  }
};

//sr stop
recognition.onend = function () {
  console.log("vr deactive");
};

// Buttons
startBtn.addEventListener("click", () => recognition.start());
stopBtn.addEventListener("click", () => recognition.stop());

// ========== SPEECH SYNTHESIS ==========
function readOut(message) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = message;
  speech.volume = 1;
  speech.rate = 0.8;
  window.speechSynthesis.speak(speech);
  console.log("speaking out");
}

// ========== WEATHER ==========
function weather(location) {
  const weatherCont = document.querySelector(".temp").querySelectorAll("*");
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=48ddfe8c9cf29f95b7d0e54d6e171008`;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (this.status === 200) {
      let data = JSON.parse(this.responseText);
      weatherCont[0].textContent = `Location : ${data.name}`;
      weatherCont[1].textContent = `Country : ${data.sys.country}`;
      weatherCont[2].textContent = `Weather type : ${data.weather[0].main}`;
      weatherCont[3].textContent = `Weather description : ${data.weather[0].description}`;
      weatherCont[4].src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; // FIX: https
      weatherCont[5].textContent = `Original Temperature : ${ktc(data.main.temp)}`;
      weatherCont[6].textContent = `Feels like ${ktc(data.main.feels_like)}`;
      weatherCont[7].textContent = `Min temperature ${ktc(data.main.temp_min)}`;
      weatherCont[8].textContent = `Max temperature ${ktc(data.main.temp_max)}`;
      let weatherStatement = `sir the weather in ${data.name} is ${data.weather[0].description} and the temperature feels like ${ktc(data.main.feels_like)}`;
    } else {
      weatherCont[0].textContent = "Weather Info Not Found";
    }
  };
  xhr.send();
}

// Kelvin to Celsius
function ktc(k) {
  return (k - 273.15).toFixed(2);
}

// ========== USER SETUP ==========
setup.style.display = "none";
if (localStorage.getItem("jarvis_setup") === null) {
  setup.style.display = "block";
  setup.querySelector("button").addEventListener("click", userInfo);
} else {
  weather(JSON.parse(localStorage.getItem("jarvis_setup")).location);
}

function userInfo() {
  let setupInfo = {
    name: setup.querySelectorAll("input")[0].value,
    bio: setup.querySelectorAll("input")[1].value,
    location: setup.querySelectorAll("input")[2].value,
    instagram: setup.querySelectorAll("input")[3].value,
    github: setup.querySelectorAll("input")[4].value,
    university: setup.querySelectorAll("input")[5].value,
  };

  let testArr = [];
  setup.querySelectorAll("input").forEach((e) => testArr.push(e.value));

  if (testArr.includes("")) {
    readOut("Please, fill the required information");
  } else {
    localStorage.setItem("jarvis_setup", JSON.stringify(setupInfo));
    setup.style.display = "none";
    weather(setupInfo.location);
  }
}

// ========== YOUTUBE PLAY ==========
async function playOnYouTube(query) {
  const apiKey = "AIzaSyBqBD0v9FJcmDrQRNfzXG-CkwIIJpIeE4I"; // replace with your key
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(query)}&key=${apiKey}`;

  try {
    let response = await fetch(url);
    let data = await response.json();

    if (data.items && data.items.length > 0) {
      let videoId = data.items[0].id.videoId;
      window.open(`https://www.youtube.com/watch?v=${videoId}&autoplay=1`, "_blank");
    } else {
      console.log("No video found for:", query);
    }
  } catch (error) {
    console.error("Error fetching video:", error);
  }
}

// ========== AUTO JARVIS ==========
function autojarvis() {
  setTimeout(() => {
    recognition.start();
  }, 1000);
}

// ========== ONLOAD ==========
window.addEventListener("load", () => {
  const turn_on = document.querySelector("#turn_on");
  const sub_btn = document.querySelector("#sub_btn");

  // start jarvis function
  function startJarvis() {
    turn_on.play().then(() => {
      turn_on.onended = () => {
        setTimeout(() => {
          autojarvis();
          readOut("Ready To Go Sir");
          if (localStorage.getItem("jarvis_setup") === null) {
            readOut("Sir, Kindly fill out the form");
          }
        }, 200);
      };
    }).catch(err => {
      console.log("Play blocked:", err);
    });
  }

  // when user clicks submit for the first time
  sub_btn.addEventListener("click", () => {
    localStorage.setItem("jarvis_autoplay", "enabled");
    startJarvis();
  });

  // live time
  setInterval(() => {
    let date = new Date();
    let hours = date.getHours();
    let minute = date.getMinutes();
    let sec = date.getSeconds();
    time.textContent = `${hours}:${minute}:${sec}`;
  }, 1000);
});

// ========== BATTERY + INTERNET ==========
let batteryPromise = navigator.getBattery();
batteryPromise.then(batteryCallback);

function batteryCallback(batteryObject) {
  printBatteryStatus(batteryObject);
  setInterval(() => {
    navigator.onLine ? internet.textContent = "Online" : internet.textContent = "Offline";
    printBatteryStatus(batteryObject);
  }, 1000);
}

function printBatteryStatus(batteryObject) {
  battery.textContent = `${batteryObject.level * 100} %`;
  if (batteryObject.charging === true) {
    battery.textContent = `${batteryObject.level * 100} % Charging`;
    document.querySelector(".battery").style.boxShadow = "0 0 25px red";
  } else {
    document.querySelector(".battery").style.boxShadow = "0 0 18px rgba(0,255,255,0.35)";
  }
}

// ========== MANUAL START BUTTON ==========
document.querySelector("#start_jarvis_btn").addEventListener("click", () => {
  recognition.start();
});
</script>
