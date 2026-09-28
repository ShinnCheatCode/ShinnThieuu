/* =========================================
   SHINN WEBSITE
========================================= */
/* =========================================
   MOBILE MENU
========================================= */
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
}
/* =========================================
   CLOSE MENU AFTER CLICK
========================================= */
const navLinks =
    document.querySelectorAll(
        "#navMenu a"
    );
navLinks.forEach(
    link => {
        link.addEventListener(
            "click",
            () => {
                navMenu.classList.remove(
                    "active"
                );
            }
        );
    }
);
/* =========================================
   CURRENT YEAR
========================================= */
const year =
    document.getElementById("year");
if (year) {
    year.textContent =
        new Date().getFullYear();
}
/* =========================================
   SMOOTH SCROLL
========================================= */
document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        link => {
            link.addEventListener(
                "click",
                function(event) {
                    const target =
                        document.querySelector(
                            this.getAttribute("href")
                        );
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
        }
    );
/* =========================================
   SCROLL REVEAL
========================================= */
const revealElements =
    document.querySelectorAll(
        ".stat-card, " +
        ".repository-card, " +
        ".download-card, " +
        ".about-card"
    );
const observer =
    new IntersectionObserver(
        entries => {
            entries.forEach(
                entry => {
                    if (
                        entry.isIntersecting
                    ) {
                        entry.target.style.opacity =
                            "1";
                        entry.target.style.transform =
                            "translateY(0)";
                        observer.unobserve(
                            entry.target
                        );
                    }
                }
            );
        },
        {
            threshold: 0.12
        }
    );
revealElements.forEach(
    element => {
        element.style.opacity = "0";
        element.style.transform =
            "translateY(20px)";
        element.style.transition =
            "opacity .7s ease, " +
            "transform .7s ease";
        observer.observe(element);
    }
);
/* =========================================
   CLOSE MENU WHEN CLICK OUTSIDE
========================================= */
document.addEventListener(
    "click",
    event => {
        if (
            navMenu &&
            menuButton &&
            navMenu.classList.contains("active")
        ) {
            if (
                !navMenu.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {
                navMenu.classList.remove(
                    "active"
                );
            }
        }
    }
);