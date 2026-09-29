/* =====================================================
   GIT ARENA
   Global Application Logic
===================================================== */


/* ================= THEME ================= */

const themeToggle =
    document.getElementById("themeToggle");


function loadTheme() {

    const savedTheme =
        localStorage.getItem("gitArenaTheme");

    if (savedTheme === "light") {

        document.body.classList.add("light");

    }

}


function toggleTheme() {

    document.body.classList.toggle("light");

    const isLight =
        document.body.classList.contains("light");

    localStorage.setItem(
        "gitArenaTheme",
        isLight ? "light" : "dark"
    );

}


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        toggleTheme
    );

}


/* ================= INITIALIZE ================= */

loadTheme();


/* ================= USER DATA ================= */

const defaultUser = {

    name: "Siddhi",

    xp: 1980,

    level: 4,

    streak: 7,

    completed: 8,

    inProgress: 2

};


function getUserData() {

    const savedUser =
        localStorage.getItem("gitArenaUser");

    if (savedUser) {

        return JSON.parse(savedUser);

    }

    localStorage.setItem(
        "gitArenaUser",
        JSON.stringify(defaultUser)
    );

    return defaultUser;

}


/* ================= XP SYSTEM ================= */

function addXP(amount) {

    const user = getUserData();

    user.xp += amount;

    localStorage.setItem(
        "gitArenaUser",
        JSON.stringify(user)
    );

}


/* ================= CHALLENGE STATUS ================= */

function getChallengeStatus(id) {

    const statuses =
        JSON.parse(
            localStorage.getItem(
                "gitArenaChallengeStatus"
            )
        ) || {};

    return statuses[id] || "Not Started";

}


function setChallengeStatus(id, status) {

    const statuses =
        JSON.parse(
            localStorage.getItem(
                "gitArenaChallengeStatus"
            )
        ) || {};

    statuses[id] = status;

    localStorage.setItem(
        "gitArenaChallengeStatus",
        JSON.stringify(statuses)
    );

}


/* ================= CONSOLE EFFECT ================= */

const consoleBox =
    document.querySelector(".hero-console");


if (consoleBox) {

    consoleBox.addEventListener(
        "mouseenter",
        () => {

            consoleBox.style.boxShadow =
                "0 35px 100px rgba(183,255,74,.10)";

        }
    );

    consoleBox.addEventListener(
        "mouseleave",
        () => {

            consoleBox.style.boxShadow =
                "0 35px 100px rgba(0,0,0,.35)";

        }
    );

}


/* ================= BUTTON FEEDBACK ================= */

document.querySelectorAll(
    ".primary-btn, .secondary-btn"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            button.style.transform =
                "translateY(-1px)";

            setTimeout(() => {

                button.style.transform = "";

            }, 180);

        }
    );

});