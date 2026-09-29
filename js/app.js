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

/* ================= USER DATA ================= */

const defaultUser = {

    name: "Builder",
    xp: 0,
    level: 1,
    streak: 0,
    completed: 0,
    inProgress: 0

};


function getUserData() {

    const savedUser =
        localStorage.getItem(
            "gitArenaUser"
        );

    if (savedUser) {

        return JSON.parse(savedUser);

    }


    /*
       If arenaProfile already exists,
       use the same builder identity.
    */

    const arenaProfile =
        localStorage.getItem(
            "arenaProfile"
        );


    if (arenaProfile) {

        const profile =
            JSON.parse(arenaProfile);

        const user = {

            name:
                profile.name,

            xp:
                profile.xp,

            level:
                profile.level,

            streak:
                profile.streak,

            completed:
                profile.missions,

            inProgress:
                0

        };

        localStorage.setItem(
            "gitArenaUser",
            JSON.stringify(user)
        );

        return user;

    }


    return defaultUser;

}


//* ================= XP SYSTEM ================= */

function addXP(amount) {

    const user =
        getUserData();

    user.xp += amount;

    user.level =
        Math.floor(
            user.xp / 500
        ) + 1;


    localStorage.setItem(
        "gitArenaUser",
        JSON.stringify(user)
    );


    /*
       Keep arenaProfile synchronized.
    */

    const savedProfile =
        localStorage.getItem(
            "arenaProfile"
        );


    if (savedProfile) {

        const profile =
            JSON.parse(savedProfile);

        profile.xp =
            user.xp;

        profile.level =
            user.level;

        localStorage.setItem(
            "arenaProfile",
            JSON.stringify(profile)
        );

    }

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