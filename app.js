//speech recognition start
const startBtn=document.querySelector("#start");
const stopBtn=document.querySelector("#stop");
const speakBtn=document.querySelector("#speak");

const SpeechRecognition=
window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition=new SpeechRecognition();
//sr start
recognition.onstart=function(){
    console.log("vr active");
};
//sr result
recognition.onresult=function(event){
    console.log(event);
    let current=event.resultIndex
    let transcript=event.results[current][0].transcript;
    // console.log(transcript);
    // readOut(transcript);
    
    transcript=transcript.toLowerCase();
    let userdata=localStorage.getItem("jarvis_setup")
    console.log(`my words:${transcript}`);
    if(transcript.includes("hello, jarvis")||transcript.includes("hi, jarvis")||transcript.includes("hey, jarvis")){
        readOut("hello sir");
       
    }
    //opening youtube
    if(transcript.includes("open youtube")){
        readOut("Opening youtube  sir")
        window.open("https://www.youtube.com/");
    }
    //opening google
    if(transcript.includes("open google")||transcript.includes("google")){
        readOut("Opening google  sir")
        window.open("https://www.google.com/");
    }
    //opening firebase
    if(transcript.includes("open firebase")||transcript.includes("firebase")||transcript.includes("fire base")){
        readOut("Opening firebase console  sir")
        window.open("https://console.firebase.google.com/?pli=1");
    }
    //google search
if(transcript.includes("search")||transcript.includes("what is")||transcript.includes("how")||transcript.includes("where")||transcript.includes("when")||transcript.includes("will you")){
    readOut("Here are results");
    let input=transcript.split(" ").join("+");
    if(transcript.includes("on youtube")){
        window.open(`https://www.youtube.com/results?search_query=${input}`)
    }
   else{
    window.open(`https://www.google.com/search?q=${input}`)}
    console.log(input);
}
if(transcript.includes("open github")){
  readOut("opening github sir")
  window.open("https://github.com");
}
if(transcript.includes("open my github profile")||transcript.includes("my github profile")){
  readOut("Opening github profile sir")
  window.open(`https://github.com/${JSON.parse(userdata).github}`)
}
if(transcript.includes("open my instagram profile")){
  readOut("opening instagram profile sir");
  window.open(`https://www.instagram.com/${JSON.parse(userdata).instagram}/`)
}
if(transcript.includes("open instagram")){
  readOut("opening instagram profile")
  window.open("https://www.instagram.com/");
}
if(transcript.includes("open whatsapp")||transcript.includes("whatsapp")){
  readOut("Opening whatsapp sir");
  window.open("https://web.whatsapp.com/");
}
//play video on youtube using youtube
// if(transcript.includes("play")){
//     readOut("Here are results");
//     let input=transcript;
//     input=input.split(" ").join("+");
//     window.open(`https://www.youtube.com/watch?v=${input}`)}
};


//sr stop
recognition.onend=function(event){
   
     console.log("vr  deactive");
};
//sr continuos
//recognition.continuous=true;

startBtn.addEventListener("click",()=>{
    recognition.start();
});
stopBtn.addEventListener("click",()=>{
    recognition.stop();
});

//jarvis speech
function readOut(message){
    

    const speech=new SpeechSynthesisUtterance()
     const voices = speechSynthesis.getVoices();
    speech.text=message;
    
    speech.volume=1;
    speech.rate=.8;
    // const femaleVoice = voices.find(voice =>
    //     /female|woman|aria|zira|samantha|eva|lucia|natasha|microsoft (zira|aria)|google us english/i.test(voice.name)
    // );
    //  if (femaleVoice) {
    //     speech.voice = femaleVoice;
    //     console.log("Using female voice:", femaleVoice.name);
    // } else {
    //     console.warn("Female voice not found, using default.");
    // }


    
    // Pick a "Jarvis-like" voice (British English or deep male)
   
    window.speechSynthesis.speak(speech);
    console.log("speaking out");
}
//example

speakBtn.addEventListener("click",()=>{
    readOut("hi,there my dear lovely subscribers")
});
window.onload=function(){
    readOut("");
    
}
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
      weatherCont[4].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherCont[5].textContent = `Original Temperature : ${ktc(
        data.main.temp
      )}`;
      weatherCont[6].textContent = `Feels like ${ktc(data.main.feels_like)}`;
      weatherCont[7].textContent = `Min temperature ${ktc(data.main.temp_min)}`;
      weatherCont[8].textContent = `Max temperature ${ktc(data.main.temp_max)}`;
      weatherStatement = `sir the weather in ${data.name} is ${
        data.weather[0].description
      } and the temperature feels like ${ktc(data.main.feels_like)}`;
    } else {
      weatherCont[0].textContent = "Weather Info Not Found";
    }
  };

  xhr.send();
}

// convert kelvin to celcius
function ktc(k) {
  k = k - 273.15;
  return k.toFixed(2);
}
//jarvis setup
if(localStorage.getItem("jarvis_setup")!==null){
 
}
//jarvis  information setup
const setup=document.querySelector(".jarvis_setup")
setup.style.display="none";
if(localStorage.getItem("jarvis_setup")===null){
  // setup.style.display="flex";
  setup.style.display="block";
  setup.querySelector("button").addEventListener("click",userInfo)
}
function userInfo(){
  let setupInfo={
    name:setup.querySelectorAll("input")[0].value,
    bio:setup.querySelectorAll("input")[1].value,
    location:setup.querySelectorAll("input")[2].value,
    instagram:setup.querySelectorAll("input")[3].value,
    github:setup.querySelectorAll("input")[4].value,
    university:setup.querySelectorAll("input")[5].value,
  }

  let testArr=[]

  setup.querySelectorAll("input").forEach((e)=>{
    testArr.push(e.value);
  })
  
  if(testArr.includes("")){
    readOut("Please, fill the required  information")
  }
  else{
    localStorage.clear()
    localStorage.setItem("jarvis_setup",JSON.stringify(setupInfo))
    setup.style.display="none";
   weather(JSON.parse(localStorage.getItem("jarvis_setup")).location)
  }
}
/*
a webpage
logged in
logged in info-local storage
session storage -data is cleared as browser is closed
*/