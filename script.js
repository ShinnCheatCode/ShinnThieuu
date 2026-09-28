"use strict";

/* =========================
   MOBILE MENU
========================= */

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

if (menuButton && navMenu) {

    menuButton.addEventListener("click", function () {

        navMenu.classList.toggle("active");

        if (navMenu.classList.contains("active")) {
            menuButton.textContent = "✕";
        } else {
            menuButton.textContent = "☰";
        }

    });

    document.querySelectorAll("#navMenu a").forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");

            menuButton.textContent = "☰";

        });

    });
}


/* =========================
   CURRENT YEAR
========================= */

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");

const observer =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

revealElements.forEach(function (element) {

    observer.observe(element);

});


/* =========================
   BACKGROUND MUSIC
========================= */

const bgMusic =
    document.getElementById("bgMusic");

const musicButton =
    document.getElementById("musicButton");

let musicStarted = false;


/* Start music */

async function startMusic() {

    if (!bgMusic) {
        return;
    }

    if (musicStarted) {
        return;
    }

    try {

        bgMusic.volume = 0.45;

        await bgMusic.play();

        musicStarted = true;

        if (musicButton) {

            musicButton.textContent =
                "🔊 Đang phát";

        }

        removeMusicListeners();

    } catch (error) {

        console.log(
            "Autoplay bị trình duyệt chặn. Chờ người dùng tương tác."
        );

    }

}


/* Remove first interaction listeners */

function removeMusicListeners() {

    document.removeEventListener(
        "click",
        startMusic
    );

    document.removeEventListener(
        "touchstart",
        startMusic
    );

    document.removeEventListener(
        "pointerdown",
        startMusic
    );

}


/* Try autoplay */

startMusic();


/* iPhone/Safari fallback */

document.addEventListener(
    "click",
    startMusic,
    {
        passive: true
    }
);

document.addEventListener(
    "touchstart",
    startMusic,
    {
        passive: true
    }
);

document.addEventListener(
    "pointerdown",
    startMusic,
    {
        passive: true
    }
);


/* =========================
   MUSIC BUTTON
========================= */

if (musicButton) {

    musicButton.addEventListener(
        "click",
        async function (event) {

            event.stopPropagation();

            if (!bgMusic) {
                return;
            }


            /* PAUSED → PLAY */

            if (bgMusic.paused) {

                try {

                    bgMusic.volume = 0.45;

                    await bgMusic.play();

                    musicStarted = true;

                    musicButton.textContent =
                        "🔊 Đang phát";

                    removeMusicListeners();

                } catch (error) {

                    console.log(
                        "Không thể phát nhạc."
                    );

                }

            }

            /* PLAYING → PAUSE */

            else {

                bgMusic.pause();

                musicStarted = false;

                musicButton.textContent =
                    "🎵 Bật nhạc";

            }

        }
    );

}


/* =========================
   MUSIC ERROR CHECK
========================= */

if (bgMusic) {

    bgMusic.addEventListener(
        "error",
        function () {

            console.log(
                "Không tìm thấy ShinnThieuu.MP4"
            );

        }
    );

}


/* =========================
   SMOOTH ANCHOR
========================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(function (link) {

    link.addEventListener(
        "click",
        function (event) {

            const targetId =
                this.getAttribute("href");

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

});


/* =========================
   CONSOLE
========================= */

console.log(
    "%cShinn Website",
    "font-size:20px;font-weight:bold;"
);

console.log(
    "Website loaded successfully."
);