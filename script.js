/* ==========================================
   BISHNUTECH - SCRIPT.JS (PART 1)
   ========================================== */

/* ===========================
   SIDEBAR MENU
=========================== */

function toggleMenu() {
    const sidebar = document.getElementById("sidebar");

    if (!sidebar) return;

    sidebar.classList.toggle("active");
}

/* Close sidebar when clicking outside */

document.addEventListener("click", function (e) {

    const sidebar = document.getElementById("sidebar");
    const menuBtn = document.querySelector(".menu-btn");

    if (!sidebar || !menuBtn) return;

    if (
        !sidebar.contains(e.target) &&
        !menuBtn.contains(e.target)
    ) {
        sidebar.classList.remove("active");
    }

});


/* ===========================
   DARK / LIGHT MODE
=========================== */

const themeBtn = document.getElementById("themeBtn");

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark-mode");

}

if (themeBtn) {

    updateThemeText();

    themeBtn.addEventListener("click", function (e) {

        e.preventDefault();

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            localStorage.setItem("theme", "dark");

        } else {

            localStorage.setItem("theme", "light");

        }

        updateThemeText();

    });

}

function updateThemeText() {

    if (!themeBtn) return;

    if (document.body.classList.contains("dark-mode")) {

        themeBtn.innerHTML = "☀ Light Mode";

    } else {

        themeBtn.innerHTML = "🌙 Dark Mode";

    }

}


/* ===========================
   LOADING SCREEN
=========================== */

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    if (!loader) return;

    setTimeout(function () {

        loader.classList.add("loaded");

    }, 1800);

});


/* ===========================
   LIVE CLOCK
=========================== */

const clock = document.getElementById("clock");

if (clock) {

    function updateClock() {

        const now = new Date();

        clock.innerHTML = now.toLocaleTimeString();

    }

    updateClock();

    setInterval(updateClock, 1000);

}


/* ===========================
   SCROLL TO TOP
=========================== */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function () {

    if (!topBtn) return;

    if (window.scrollY > 300) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

if (topBtn) {

    topBtn.onclick = function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };

}


/* ==========================================
   END OF PART 1
========================================== *
/* ==========================================
   BISHNUTECH - SCRIPT.JS (PART 2)
   ========================================== */


/* ===========================
   PARTICLE BACKGROUND
=========================== */

const particleContainer = document.getElementById("particles");

if (particleContainer) {

    function createParticle() {

        const particle = document.createElement("div");

        particle.className = "particle";

        const size = Math.random() * 8 + 4;

        particle.style.width = size + "px";
        particle.style.height = size + "px";

        particle.style.left = Math.random() * 100 + "%";

        particle.style.animationDuration =
            (6 + Math.random() * 8) + "s";

        particle.style.animationDelay =
            Math.random() * 5 + "s";

        particleContainer.appendChild(particle);

        particle.addEventListener("animationend", function () {

            particle.remove();

            createParticle();

        });

    }

    for (let i = 0; i < 50; i++) {

        createParticle();

    }

}


/* ===========================
   TYPING ANIMATION
=========================== */

const typingElement = document.getElementById("typing");

if (typingElement) {

    const texts = [

        "Building Future Technology.",

        "Professional Web Development.",

        "Artificial Intelligence Solutions.",

        "Cloud & Software Services.",

        "Creative UI & UX Design.",

        "Innovation Starts Here."

    ];

    let textIndex = 0;

    let charIndex = 0;

    let deleting = false;

    function typeWriter() {

        const current = texts[textIndex];

        if (!deleting) {

            typingElement.textContent =
                current.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === current.length) {

                deleting = true;

                setTimeout(typeWriter, 1500);

                return;

            }

        } else {

            typingElement.textContent =
                current.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {

                deleting = false;

                textIndex++;

                if (textIndex >= texts.length) {

                    textIndex = 0;

                }

            }

        }

        setTimeout(typeWriter, deleting ? 40 : 90);

    }

    typeWriter();

}


/* ===========================
   ACCENT COLOR
=========================== */

const savedColor =
localStorage.getItem("accentColor");

if (savedColor) {

    document.documentElement.style
    .setProperty("--accent", savedColor);

}


/* ===========================
   FONT SIZE
=========================== */

const savedFont =
localStorage.getItem("fontSize");

if (savedFont) {

    document.body.style.fontSize =
    savedFont;

}


/* ===========================
   PAGE FADE-IN
=========================== */

document.body.style.opacity = "0";

window.addEventListener("load", function () {

    setTimeout(function () {

        document.body.style.transition =
        "opacity .6s";

        document.body.style.opacity = "1";

    }, 300);

});


/* ===========================
   SMOOTH SCROLL
=========================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        const target =
        document.querySelector(this.getAttribute("href"));

        if (target) {

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});


/* ===========================
   END OF PART 2
=========================== */
/* ==========================================
   BISHNUTECH - SCRIPT.JS (PART 3)
   Notes • To-Do • Notifications • Search
========================================== */


/* ===========================
   NOTES
=========================== */

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNote(){

    const input = document.getElementById("noteInput");

    if(!input) return;

    if(input.value.trim()===""){

        alert("Please write a note.");

        return;

    }

    notes.push(input.value);

    localStorage.setItem("notes",JSON.stringify(notes));

    input.value="";

    displayNotes();

}

function displayNotes(){

    const container=document.getElementById("notesContainer");

    if(!container) return;

    notes=JSON.parse(localStorage.getItem("notes"))||[];

    container.innerHTML="";

    notes.forEach(function(note,index){

        container.innerHTML+=`

        <div class="card">

            <p>${note}</p>

            <button onclick="deleteNote(${index})">

            Delete

            </button>

        </div>

        `;

    });

}

function deleteNote(index){

    notes.splice(index,1);

    localStorage.setItem("notes",JSON.stringify(notes));

    displayNotes();

}


/* ===========================
   TODO LIST
=========================== */

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask(){

    const input=document.getElementById("taskInput");

    if(!input) return;

    if(input.value.trim()===""){

        alert("Enter a task.");

        return;

    }

    tasks.push({

        text:input.value,

        done:false

    });

    input.value="";

    saveTasks();

    renderTasks();

}

function saveTasks(){

    localStorage.setItem("tasks",JSON.stringify(tasks));

}

function renderTasks(){

    const list=document.getElementById("taskList");

    if(!list) return;

    list.innerHTML="";

    tasks.forEach(function(task,index){

        list.innerHTML+=`

<li>

<input

type="checkbox"

${task.done?"checked":""}

onchange="toggleTask(${index})">

<span style="${task.done?"text-decoration:line-through;color:gray;":""}">

${task.text}

</span>

<button onclick="deleteTask(${index})">

🗑

</button>

</li>

`;

    });

    updateCounter();

}

function toggleTask(index){

    tasks[index].done=!tasks[index].done;

    saveTasks();

    renderTasks();

}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();

    renderTasks();

}

function updateCounter(){

    const counter=document.getElementById("taskCount");

    if(!counter) return;

    const completed=tasks.filter(t=>t.done).length;

    counter.innerHTML=

    completed+" / "+tasks.length+" Tasks Completed";

}


/* ===========================
   NOTIFICATIONS
=========================== */

let notifications=

JSON.parse(localStorage.getItem("notifications"))||

[];

function renderNotifications(){

const box=document.getElementById("notificationList");

if(!box) return;

box.innerHTML="";

notifications.forEach(function(item,index){

box.innerHTML+=`

<div class="card">

<p>${item}</p>

<button onclick="deleteNotification(${index})">

Delete

</button>

</div>

`;

});

}

function addNotification(){

notifications.unshift(

"🔔 Notification - "+new Date().toLocaleTimeString()

);

localStorage.setItem(

"notifications",

JSON.stringify(notifications)

);

renderNotifications();

}

function deleteNotification(index){

notifications.splice(index,1);

localStorage.setItem(

"notifications",

JSON.stringify(notifications)

);

renderNotifications();

}

function clearNotifications(){

notifications=[];

localStorage.removeItem("notifications");

renderNotifications();

}


/* ===========================
   SEARCH
=========================== */

const pages=[

{name:"Dashboard",link:"dashboard.html"},

{name:"Profile",link:"profile.html"},

{name:"Settings",link:"settings.html"},

{name:"Notes",link:"notes.html"},

{name:"To-Do",link:"todo.html"},

{name:"Calculator",link:"calculator.html"},

{name:"Calendar",link:"calendar.html"},

{name:"Search",link:"search.html"},

{name:"Notifications",link:"notifications.html"},

{name:"Music",link:"music.html"},

{name:"Analytics",link:"analytics.html"},

{name:"Services",link:"services.html"},

{name:"Portfolio",link:"portfolio.html"},

{name:"Contact",link:"contact.html"}

];

function searchPages(){

const input=document.getElementById("searchBox");

const results=document.getElementById("results");

if(!input||!results) return;

const keyword=input.value.toLowerCase();

results.innerHTML="";

pages

.filter(page=>page.name.toLowerCase().includes(keyword))

.forEach(function(page){

results.innerHTML+=`

<div class="card">

<h3>${page.name}</h3>

<button onclick="location.href='${page.link}'">

Open

</button>

</div>

`;

});

}


/* ===========================
   AUTO INITIALIZE
=========================== */

displayNotes();

renderTasks();

renderNotifications();

searchPages();
/* ==========================================
   BISHNUTECH - SCRIPT.JS (PART 4)
   Music • Analytics • Calendar • Utilities
========================================== */


/* ===========================
   MUSIC PLAYER
=========================== */

const player = document.getElementById("player");

if (player) {

const songs = [

"music/song1.mp3",
"music/song2.mp3",
"music/song3.mp3"

];

const names = [

"Song 1",
"Song 2",
"Song 3"

];

let currentSong = 0;

const title = document.getElementById("songTitle");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

function loadSong(index){

player.src = songs[index];

if(title){

title.textContent = names[index];

}

}

window.playPause = function(){

if(player.paused){

player.play();

}else{

player.pause();

}

}

window.nextSong = function(){

currentSong++;

if(currentSong >= songs.length){

currentSong = 0;

}

loadSong(currentSong);

player.play();

}

window.previousSong = function(){

currentSong--;

if(currentSong < 0){

currentSong = songs.length - 1;

}

loadSong(currentSong);

player.play();

}

if(volume){

volume.oninput = function(){

player.volume = this.value;

};

}

if(progress){

player.addEventListener("timeupdate",function(){

progress.max = player.duration || 0;

progress.value = player.currentTime;

});

progress.oninput = function(){

player.currentTime = this.value;

};

}

player.addEventListener("ended",function(){

nextSong();

});

loadSong(currentSong);

}


/* ===========================
   ANALYTICS
=========================== */

let visits = Number(localStorage.getItem("visits") || 0);

visits++;

localStorage.setItem("visits", visits);

const visitBox = document.getElementById("visitCount");

if(visitBox){

visitBox.textContent = visits;

}

const notesCount = document.getElementById("notesCount");

if(notesCount){

notesCount.textContent =
(JSON.parse(localStorage.getItem("notes")) || []).length;

}

const taskCount = document.getElementById("taskCount");

const completedCount = document.getElementById("completedCount");

const storedTasks =
JSON.parse(localStorage.getItem("tasks")) || [];

if(taskCount){

taskCount.textContent = storedTasks.length;

}

if(completedCount){

completedCount.textContent =
storedTasks.filter(t=>t.done).length;

}


/* ===========================
   CALENDAR
=========================== */

const calendar = document.getElementById("calendar");

if(calendar){

const today = new Date();

const month = today.getMonth();

const year = today.getFullYear();

const monthName = document.getElementById("monthYear");

if(monthName){

monthName.textContent =
today.toLocaleString("default",{
month:"long",
year:"numeric"
});

}

}


/* ===========================
   PAGE VISIT TIME
=========================== */

localStorage.setItem(
"lastVisit",
new Date().toLocaleString()
);


/* ===========================
   CONSOLE MESSAGE
=========================== */

console.log(
"%cBISHNUTECH Loaded Successfully",
"color:#2563eb;font-size:18px;font-weight:bold;"
);


/* ===========================
   END
=========================== */

console.log("BISHNUTECH Frontend Ready.");
