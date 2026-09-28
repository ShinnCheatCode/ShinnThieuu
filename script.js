/* =========================================
   SHINN WEBSITE
========================================= */


/* =========================
   MOBILE MENU
========================= */

const menuButton =
    document.getElementById("menuButton");

const navMenu =
    document.getElementById("navMenu");


if (menuButton && navMenu) {

    menuButton.addEventListener(
        "click",
        () => {

            navMenu.classList.toggle("active");

        }
    );


    navMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navMenu.classList.remove(
                        "active"
                    );

                }
            );

        });

}


/* =========================
   CURRENT YEAR
========================= */

const year =
    document.getElementById("year");


if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "show"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================
   SHINN BACKGROUND MUSIC
========================================= */

const bgMusic =
    document.getElementById("bgMusic");

const musicButton =
    document.getElementById("musicButton");


let musicStarted = false;


/*
    Hàm phát nhạc
*/

async function startMusic() {

    if (!bgMusic || musicStarted) {
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

        console.log(
            "Shinn music started"
        );

    } catch (error) {

        console.log(
            "Safari đang chặn autoplay:",
            error
        );

    }

}


/*
    Xóa listener sau khi nhạc đã chạy
*/

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


/*
    Thử tự phát ngay khi website mở
*/

startMusic();


/*
    iPhone/Safari chặn autoplay:
    lần chạm đầu tiên sẽ tự bật nhạc
*/

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
        async event => {

            /*
                Không để click nút
                kích hoạt startMusic 2 lần
            */

            event.stopPropagation();


            if (!bgMusic) {
                return;
            }


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
                        "Không thể phát nhạc:",
                        error
                    );

                }

            } else {

                bgMusic.pause();

                musicStarted = false;

                musicButton.textContent =
                    "🎵 Bật nhạc";

            }

        }
    );

}


/* =========================
   LOG
========================= */

console.log(
    "Shinn website loaded."
);