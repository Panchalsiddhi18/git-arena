(function () {

    const PROFILE_KEY = "arenaProfile";
    const ONBOARDING_KEY = "arenaOnboardingComplete";

    /* =========================================
       CREATE NEW PROFILE
    ========================================= */

    function createFreshProfile(name) {

        return {
            id: "builder-" + Date.now(),
            name: name,
            xp: 0,
            level: 1,
            streak: 0,
            missions: 0,
            badges: [],
            completedMissionIds: []
        };

    }


    /* =========================================
       GET SAVED PROFILE
    ========================================= */

    function getSavedProfile() {

        const saved =
            localStorage.getItem(PROFILE_KEY);

        if (!saved) {
            return null;
        }

        try {

            return JSON.parse(saved);

        } catch (error) {

            console.error(
                "Invalid arena profile:",
                error
            );

            localStorage.removeItem(PROFILE_KEY);

            return null;

        }

    }


    /* =========================================
       CREATE ONBOARDING
    ========================================= */

    function createOnboarding() {

        /* Prevent duplicate onboarding */

        if (
            document.getElementById(
                "arenaOnboarding"
            )
        ) {
            return;
        }


        /* ================= OVERLAY ================= */

        const overlay =
            document.createElement("div");

        overlay.id =
            "arenaOnboarding";


        overlay.innerHTML = `

            <div class="onboarding-box">

                <div class="onboarding-logo">
                    &lt;/&gt;
                </div>

                <div class="onboarding-label">
                    GIT CLUB • CHALLENGE ARENA
                </div>

                <h1>
                    Welcome to
                    <span>GIT Arena</span>
                </h1>

                <p>
                    Build projects, earn XP,
                    complete missions and climb
                    the leaderboard.
                </p>

                <label for="builderName">
                    Enter your builder name
                </label>

                <input
                    type="text"
                    id="builderName"
                    placeholder="e.g. Siddhi"
                    maxlength="30"
                    autocomplete="off"
                >

                <div
                    class="onboarding-error"
                    id="onboardingError">
                </div>

                <button
                    id="startArenaBtn"
                    class="onboarding-btn">

                    Start Building
                    <span>→</span>

                </button>

                <small>
                    No account • No password •
                    Your progress stays on this browser
                </small>

            </div>

        `;


        document.body.appendChild(overlay);


        /* ================= CSS ================= */

        const style =
            document.createElement("style");

        style.textContent = `

            #arenaOnboarding {

                position: fixed;

                inset: 0;

                z-index: 99999;

                display: flex;

                align-items: center;

                justify-content: center;

                padding: 20px;

                background:
                    rgba(5, 7, 11, .96);

                backdrop-filter:
                    blur(12px);

            }


            .onboarding-box {

                width: min(460px, 100%);

                padding: 42px 34px;

                text-align: center;

                background: #0d1017;

                border: 1px solid #2b323d;

                border-radius: 18px;

                box-shadow:
                    0 30px 100px
                    rgba(0,0,0,.55);

            }


            .onboarding-logo {

                width: 62px;

                height: 62px;

                margin: 0 auto 18px;

                display: flex;

                align-items: center;

                justify-content: center;

                border-radius: 16px;

                background: #b8ff3d;

                color: #0d0f15;

                font-size: 24px;

                font-weight: 800;

            }


            .onboarding-label {

                margin-bottom: 12px;

                color: #8d96a5;

                font-family: "DM Mono",
                    monospace;

                font-size: 11px;

                letter-spacing: 1.5px;

            }


            .onboarding-box h1 {

                margin: 0;

                color: #ffffff;

                font-size: 32px;

                line-height: 1.2;

            }


            .onboarding-box h1 span {

                color: #b8ff3d;

            }


            .onboarding-box p {

                margin: 16px 0 26px;

                color: #a9afb9;

                line-height: 1.6;

                font-size: 14px;

            }


            .onboarding-box label {

                display: block;

                margin-bottom: 8px;

                text-align: left;

                color: #d8dde5;

                font-size: 13px;

                font-weight: 600;

            }


            #builderName {

                width: 100%;

                box-sizing: border-box;

                padding: 14px 15px;

                border: 1px solid #303743;

                border-radius: 10px;

                outline: none;

                background: #151920;

                color: #ffffff;

                font-family: inherit;

                font-size: 14px;

            }


            #builderName:focus {

                border-color: #b8ff3d;

                box-shadow:
                    0 0 0 3px
                    rgba(184,255,61,.10);

            }


            .onboarding-error {

                min-height: 18px;

                margin-top: 7px;

                color: #ff7272;

                text-align: left;

                font-size: 12px;

            }


            .onboarding-btn {

                width: 100%;

                margin-top: 5px;

                padding: 14px 18px;

                border: 0;

                border-radius: 10px;

                background: #b8ff3d;

                color: #0d0f15;

                cursor: pointer;

                font-family: inherit;

                font-size: 14px;

                font-weight: 800;

                transition:
                    transform .2s ease,
                    box-shadow .2s ease;

            }


            .onboarding-btn:hover {

                transform:
                    translateY(-2px);

                box-shadow:
                    0 10px 30px
                    rgba(184,255,61,.18);

            }


            .onboarding-btn span {

                margin-left: 8px;

            }


            .onboarding-box small {

                display: block;

                margin-top: 18px;

                color: #69717f;

                font-size: 11px;

                line-height: 1.5;

            }


            @media(max-width:500px) {

                .onboarding-box {

                    padding: 32px 22px;

                }

                .onboarding-box h1 {

                    font-size: 27px;

                }

            }

        `;

        document.head.appendChild(style);


        /* ================= ELEMENTS ================= */

        const input =
            document.getElementById(
                "builderName"
            );

        const button =
            document.getElementById(
                "startArenaBtn"
            );

        const error =
            document.getElementById(
                "onboardingError"
            );


        /* ================= START ARENA ================= */

        function startArena() {

            const name =
                input.value.trim();


            /* Empty name */

            if (!name) {

                error.textContent =
                    "Please enter your builder name.";

                input.focus();

                return;

            }


            /* Minimum length */

            if (name.length < 2) {

                error.textContent =
                    "Name must contain at least 2 characters.";

                input.focus();

                return;

            }


            /* Create new profile */

            const profile =
                createFreshProfile(name);


            localStorage.setItem(
                PROFILE_KEY,
                JSON.stringify(profile)
            );


            localStorage.setItem(
                ONBOARDING_KEY,
                "true"
            );


            /* Close animation */

            overlay.style.opacity = "0";

            overlay.style.transition =
                "opacity .25s ease";


            /* Reload page */

            setTimeout(() => {

                window.location.reload();

            }, 250);

        }


        /* ================= EVENTS ================= */

        button.addEventListener(
            "click",
            startArena
        );


        input.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {

                    startArena();

                }

            }
        );


        /* ================= AUTO FOCUS ================= */

        setTimeout(() => {

            input.focus();

        }, 100);

    }


    /* =========================================
       CHECK ONBOARDING STATUS
    ========================================= */

    const onboardingComplete =
        localStorage.getItem(
            ONBOARDING_KEY
        );


    const existingProfile =
        getSavedProfile();


    /* =========================================
       FIRST-TIME VISITOR
    ========================================= */

    if (
        !existingProfile &&
        onboardingComplete !== "true"
    ) {

        if (document.body) {

            createOnboarding();

        } else {

            document.addEventListener(
                "DOMContentLoaded",
                createOnboarding,
                { once: true }
            );

        }

        return;

    }


    /* =========================================
       EXISTING PROFILE
    ========================================= */

    if (
        existingProfile &&
        onboardingComplete !== "true"
    ) {

        /*
           This handles an older profile
           created before onboarding was added.
        */

        localStorage.setItem(
            ONBOARDING_KEY,
            "true"
        );

    }


})();