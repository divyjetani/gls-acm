// Fill current year
document.getElementById("year").textContent = new Date().getFullYear();

// Smooth scroll for nav links
document.querySelectorAll("a.nav-link").forEach((a) => {
    a.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute("href"));
        if (target)
            target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

//nav link underline
window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

//nav link underline update
function updateActiveLink() {
    let current = "";

    // find last section whose top is <= scroll position
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150; // threshold
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    // fallback to 'home' if nothing matched
    if (!current) current = "home";
    navLinks.forEach((link) => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${current}`
        );
    });
}

// update on scroll
window.addEventListener("scroll", updateActiveLink);

// update when DOM is ready
window.addEventListener("DOMContentLoaded", updateActiveLink);
updateActiveLink();

const header = document.getElementById("home-header");

// header split animation
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        header.classList.add("active");
    } else if (window.scrollY < 50) {
        header.classList.remove("active");
    } else if (window.scrollY > 30) {
        header.classList.remove("active");
    }
    else {
        header.classList.remove("active");
    }
});

// animations on load
window.addEventListener("load", () => {
    document.querySelectorAll(".load-anim").forEach(el => {
        el.classList.add("show");
    });
});

// intro split animation
(function () {
    const intro = document.getElementById('intro');
    const page = document.querySelector('.page-ready') || document.getElementById('pageContent');

    const delayBeforeText = 500;
    const textDuration = 1300;
    const splitDuration = 0;
    const hideDelay = -500;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
        if (intro) intro.remove();
        if (page) page.classList.add('revealed');
        return;
    }

    function revealPage() {
        if (!intro) return;
        intro.classList.add('hidden');
        intro.setAttribute('aria-hidden', 'true');
        if (page) { page.classList.add('revealed'); page.setAttribute('aria-hidden', 'false'); }
        setTimeout(() => { if (intro && intro.parentNode) intro.parentNode.removeChild(intro); }, 800);
    }

    function startSplitSequence() {
        intro.classList.add('split');
        setTimeout(revealPage, splitDuration + hideDelay);
    }

    window.addEventListener('load', () => {
        // show text then split
        setTimeout(() => {
            if (intro) {
                intro.classList.add('show-text');
                if (page) page.classList.add('revealed');
                setTimeout(startSplitSequence, textDuration);
            }
        }, delayBeforeText);
    });
})();

// toggle theme script
(function () {
    const checkbox = document.getElementById('themeToggleCheckbox');
    const body = document.body;
    const LABEL = document.querySelector('label[for="themeToggleCheckbox"]');

    function setAria(checked) {
        if (LABEL) LABEL.setAttribute('aria-checked', checked ? 'true' : 'false');
    }

    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const useDark = saved === 'dark' ? true : saved === 'light' ? false : prefersDark;

    if (useDark) {
        body.classList.add('dark-mode');
        checkbox.checked = true;
        setAria(true);
    } else {
        checkbox.checked = false;
        setAria(false);
    }

    checkbox.addEventListener('change', (e) => {
        const isDark = e.target.checked;
        body.classList.toggle('dark-mode', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        setAria(isDark);
    });
})();

// animated counters
function smoothCounter(element) {
    const target = +element.getAttribute('data-target');
    const suffix = element.getAttribute('data-suffix') || "";

    const duration = 1500; // total animation time (1.5 sec)
    const startTime = performance.now();

    function update(time) {
        const progress = Math.min((time - startTime) / duration, 1);

        // EASING function for smooth animation
        const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic

        const current = Math.floor(target * easedProgress);
        element.textContent = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target + suffix; // final value
        }
    }

    requestAnimationFrame(update);
}

// Observer to trigger animation when visible
const counters = document.querySelectorAll('.counter');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            // delay before starting
            setTimeout(() => {
                smoothCounter(entry.target);
            }, 2300);

            observer.unobserve(entry.target); // run once
        }
    });
}, { threshold: 0.3 });

counters.forEach(counter => observer.observe(counter));

// members card
const members = [
    { id: "shah-het", name: "Shah Het Hardikkumar", img: "assets/shah-het.jpg", role: "Graphics team member", bio: "Graphics contributor.", mail: "#", linkedin: "#" },
    { id: "dashanxi", name: "Dashanxi Bhatt", img: "assets/dashanxi.jpg", role: "Content Writer team member", bio: "Writes content for club.", mail: "#", linkedin: "#" },
    { id: "haya", name: "Haya Sachin", img: "assets/haya.jpg", role: "Content Writer Head", bio: "Leads content team.", mail: "#", linkedin: "#" },
    { id: "jay", name: "Jay Navale", img: "assets/jay.jpg", role: "Event Management team member", bio: "Helps manage events.", mail: "#", linkedin: "#" },
    { id: "hetvi", name: "Hetvi Kalaria", img: "assets/hetvi.jpg", role: "Volunteer team member", bio: "Volunteer support.", mail: "#", linkedin: "#" },
    { id: "krisha", name: "Patel Krisha Keyur", img: "assets/krisha.jpg", role: "Graphics team member", bio: "Graphic design.", mail: "#", linkedin: "#" },
    { id: "manas", name: "Patel Manas", img: "assets/manas.jpg", role: "Graphics team member", bio: "Graphic designer.", mail: "#", linkedin: "#" },
    { id: "diwan", name: "Diwan Megh", img: "assets/diwan.jpg", role: "Event Management Head", bio: "Leads event management.", mail: "#", linkedin: "#" },
    { id: "sami", name: "Shaikh Sami Arif", img: "assets/sami.jpg", role: "Web Development team member", bio: "Web dev contributor.", mail: "#", linkedin: "#" },
    { id: "aryan", name: "Aryan Chauhan", img: "assets/aryan.jpg", role: "President", bio: "Heads the club.", mail: "#", linkedin: "#" },
    { id: "abhinav", name: "Abhinav Gahlaut", img: "assets/abhinav.jpg", role: "Chair", bio: "Club chairperson.", mail: "#", linkedin: "#" },
    { id: "manini", name: "Manini Mudaliar", img: "assets/manini.jpg", role: "Secretary", bio: "Club secretary.", mail: "#", linkedin: "#" },
    { id: "heeren", name: "Heeren Agrawal", img: "assets/heeren.jpg", role: "Vice Chair", bio: "Assists chair duties.", mail: "#", linkedin: "#" },
    { id: "kavya", name: "Kavya Joshi", img: "assets/kavya.jpg", role: "Membership Chair", bio: "Handles membership.", mail: "#", linkedin: "#" },
    { id: "arya", name: "Arya Pandey", img: "assets/arya.jpg", role: "Vice Membership Chair", bio: "Assists membership chair.", mail: "#", linkedin: "#" },
    { id: "vraj", name: "Vraj Amin", img: "assets/vraj.jpg", role: "Treasurer", bio: "Manages finance.", mail: "#", linkedin: "#" },
    { id: "divy", name: "Divy Jetani", img: "assets/divy.jpg", role: "Web Master", bio: "Leads web dev team.", mail: "#", linkedin: "#" },
    { id: "riya", name: "Riya Shah", img: "assets/riya.jpg", role: "Graphics team member", bio: "Graphic support.", mail: "#", linkedin: "#" }
];

const membercontainer = document.getElementById('membersRow');
const tpl = document.getElementById('memberTemplate');

// members rendering
members.forEach(m => {
    const clone = tpl.content.cloneNode(true);

    const col = clone.querySelector('div.col-sm-6');
    if (col) col.id = m.id || "";

    const img = clone.querySelector('.member-photo');
    if (img) { img.src = m.img; img.alt = m.name; }

    const nameEl = clone.querySelector('.member-name');
    if (nameEl) nameEl.textContent = m.name;

    const roleEl = clone.querySelector('.member-role');
    if (roleEl) roleEl.textContent = m.role;

    const bioEl = clone.querySelector('.member-bio');
    if (bioEl) bioEl.textContent = m.bio;

    const mailA = clone.querySelector('.member-mail');
    if (mailA) mailA.href = m.mail || '#';

    const linkedinA = clone.querySelector('.member-linkedin');
    if (linkedinA) linkedinA.href = m.linkedin || '#';

    membercontainer.appendChild(clone);
});

// animation for about section
(function () {
    // Respect reduced motion
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const about = document.getElementById('about');
    if (!about) return;

    // Select all small cards inside about (right column)
    const cards = about.querySelectorAll('.col-6 .card');

    // Prepare cards: add animate class and tilt wrapper
    cards.forEach((card) => {
        const col = card.closest('.col-6');
        if (col) col.classList.add('about-animate');
        // wrap for tilt
        col.classList.add('tilt');
    });

    // IntersectionObserver to trigger staggered reveal
    if (!reduceMotion) {
        const obs = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // stagger animation by index
                    const visibleCards = Array.from(cards);
                    visibleCards.forEach((c, i) => {
                        const parentCol = c.closest('.col-6');
                        setTimeout(() => {
                            parentCol.classList.add('visible');
                        }, i * 120); // 120ms stagger
                    });
                    observer.disconnect();
                }
            });
        }, { threshold: 0.18 });

        obs.observe(about);
    } else {
        // reduced motion fallback: instantly show
        cards.forEach(c => c.closest('.col-6').classList.add('visible'));
    }

    // 3D tilt on mousemove (only when not reduced-motion)
    if (!reduceMotion) {
        cards.forEach((card) => {
            const col = card.closest('.col-6');
            let rect;
            col.addEventListener('pointerenter', () => {
                rect = col.getBoundingClientRect();
                col.style.transition = 'transform 200ms cubic-bezier(.2,.9,.32,1)';
            });

            col.addEventListener('pointermove', (e) => {
                if (!rect) rect = col.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const cx = rect.width / 2;
                const cy = rect.height / 2;
                const dx = (x - cx) / cx;
                const dy = (y - cy) / cy;

                const rotateX = (dy * 6).toFixed(2);
                const rotateY = (dx * -6).toFixed(2);

                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
                card.style.boxShadow = `${-rotateY * 1.5}px ${Math.abs(rotateX) * 2}px 30px rgba(7,17,40,0.12)`;
            });

            const reset = () => {
                card.style.transform = '';
                card.style.boxShadow = '';
            };

            col.addEventListener('pointerleave', () => {
                col.style.transition = '';
                reset();
            });

            // keyboard focus support: small lift on focus
            card.addEventListener('focusin', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });
            card.addEventListener('focusout', () => {
                card.style.transform = '';
            });
        });
    }
})();

// timeline animation
// (function () {
//     const timeline = document.querySelector('#timeline .timeline');
//     if (!timeline) return;

//     const items = Array.from(document.querySelectorAll('#timeline .timeline-item'));
//     const lineFill = document.querySelector('#timeline .timeline-line-fill');

//     // Collect cards
//     const cards = items.map(it => it.querySelector('.card')).filter(Boolean);
//     if (!cards.length) return;

//     // --- IntersectionObserver: make cards reveal only when ~35% visible ---
//     const ioOptions = { threshold: [0, 0.18, 0.35, 0.5], rootMargin: '-5% 0px -20% 0px' };
//     const io = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             const card = entry.target;
//             const item = card.closest('.timeline-item');

//             // require ~35% visibility to add in-view; remove when below
//             if (entry.intersectionRatio >= 0.45) {
//                 card.classList.add('in-view');
//                 if (item) item.classList.add('in-view');
//             } else {
//                 card.classList.remove('in-view');
//                 if (item) item.classList.remove('in-view');
//             }
//         });
//     }, ioOptions);

//     cards.forEach(card => io.observe(card));

//     // --- Line fill: start only after a 'startDelayRatio' portion of section is visible ---
//     // startDelayRatio = fraction of section that must be visible before filling starts
//     const startDelayRatio = 0.30;

//     function updateLineFill() {
//         const rect = timeline.getBoundingClientRect();
//         const sectionTop = rect.top + window.scrollY;
//         const sectionBottom = rect.bottom + window.scrollY;
//         const sectionHeight = Math.max(1, sectionBottom - sectionTop);

//         const viewportTop = window.scrollY;
//         const viewportBottom = viewportTop + window.innerHeight;

//         // visible portion of section in px
//         const visibleTop = Math.max(sectionTop, viewportTop);
//         const visibleBottom = Math.min(sectionBottom, viewportBottom);
//         const visiblePx = Math.max(0, visibleBottom - visibleTop);
//         const visibleRatio = visiblePx / sectionHeight; // 0..1

//         // If visibleRatio is below startDelayRatio -> keep fill at 0
//         if (visibleRatio <= startDelayRatio) {
//             if (lineFill) lineFill.style.height = '0%';
//             return;
//         }

//         // normalize progress from [startDelayRatio .. 1] => [0 .. 1]
//         const normalized = Math.min(1, Math.max(0, (visibleRatio - startDelayRatio) / (1 - startDelayRatio)));
//         if (lineFill) {
//             lineFill.style.height = (normalized * 100) + '%';
//         }
//     }

//     // initial call
//     updateLineFill();

//     // throttle scroll with requestAnimationFrame
//     let ticking = false;
//     function onScroll() {
//         if (!ticking) {
//             ticking = true;
//             requestAnimationFrame(() => {
//                 updateLineFill();
//                 ticking = false;
//             });
//         }
//     }
//     window.addEventListener('scroll', onScroll, { passive: true });
//     window.addEventListener('resize', onScroll);

//     // cleanup on unload
//     window.addEventListener('unload', () => {
//         io.disconnect();
//         window.removeEventListener('scroll', onScroll);
//     });
// })();

// -===== timeline =====
// Intersection Observer to open/close timeline items on scroll
// document.addEventListener("DOMContentLoaded", () => {
//     const items = document.querySelectorAll(".timeline-item");

//     // Add some particles around each card
//     items.forEach((item) => {
//         const card = item.querySelector(".timeline-card");
//         if (!card) return;

//         const PARTICLES = 6;
//         for (let i = 0; i < PARTICLES; i++) {
//             const dot = document.createElement("span");
//             dot.className = "timeline-particle";

//             // position roughly around the card edges
//             const side = Math.random();
//             if (side < 0.25) {
//                 // left edge
//                 dot.style.top = Math.random() * 100 + "%";
//                 dot.style.left = "-6%";
//             } else if (side < 0.5) {
//                 // right edge
//                 dot.style.top = Math.random() * 100 + "%";
//                 dot.style.right = "-6%";
//             } else if (side < 0.75) {
//                 // top edge
//                 dot.style.left = Math.random() * 100 + "%";
//                 dot.style.top = "-6%";
//             } else {
//                 // bottom edge
//                 dot.style.left = Math.random() * 100 + "%";
//                 dot.style.bottom = "-6%";
//             }

//             const duration = 5 + Math.random() * 5;  // 5–10s
//             const delay = Math.random() * -10;       // negative so they're out of sync

//             dot.style.animationDuration = duration + "s";
//             dot.style.animationDelay = delay + "s";

//             item.appendChild(dot);
//         }
//     });

//     const observer = new IntersectionObserver(
//         (entries) => {
//             entries.forEach((entry) => {
//                 if (entry.isIntersecting) {
//                     entry.target.classList.add("is-visible");
//                 } else {
//                     // remove when scrolling back up – closes again
//                     entry.target.classList.remove("is-visible");
//                 }
//             });
//         },
//         {
//             threshold: 0.35, // how much of the item must be visible to "open"
//         }
//     );

//     items.forEach((item) => observer.observe(item));
// });

// glow cursor effect
document.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    // Moves gradient opposite direction for a deeper effect
    const posX = (x * 80);
    const posY = (y * 80);

    document.body.style.backgroundPosition = `${posX}% ${posY}%`;
});

const light = document.getElementById("cursor-light");

document.addEventListener("mousemove", (e) => {
    light.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// show calendar widget
(function () {
    /*** Data: events for the timeline (Nov 2025 → Sep 2026) ***/
    const events = [
        { date: '2025-11-01', title: 'Founding', desc: 'Chapter created by a group of CS students with faculty mentorship.' },
        { date: '2025-12-05', title: 'First Hackathon', desc: 'Hosted our first on-campus hackathon with 100+ participants.' },
        { date: '2026-01-15', title: 'Industry Talk Series', desc: 'Invited alumni and industry speakers for technology & career talks.' },
        { date: '2026-02-10', title: 'Growth & Outreach', desc: 'Expanded membership and collaborations with nearby colleges and clubs.' },
        { date: '2026-03-21', title: 'Algo Workshop', desc: 'A full-day workshop focusing on problem solving and competitive programming basics.' },
        { date: '2026-04-11', title: 'Web Dev Bootcamp', desc: 'Weekend bootcamp: build modern web apps with React and Node (hands-on).' },
        { date: '2026-05-09', title: 'Hackathon 24H', desc: '24-hour hackathon inviting students to form teams and build products.' },
        { date: '2026-06-18', title: 'Community Project Day', desc: 'Students worked on community projects and open-source contributions.' },
        { date: '2026-07-22', title: 'Campus Tech Fair', desc: 'Showcased student projects and demos to industry partners and peers.' },
        { date: '2026-08-12', title: 'Mentorship Program Launch', desc: 'Launched semester-long mentorship pairing juniors with seniors.' },
        { date: '2026-09-01', title: 'Coming Soon', desc: 'Stay tuned for upcoming events.' }
    ];

    // helper: parse ISO date to Date object (local)
    function parseISO(s) { const p = s.split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); }

    // Map events by date string YYYY-MM-DD for quick lookup
    const eventsByDate = {};
    events.forEach(ev => { eventsByDate[ev.date] = ev; });

    // Elements
    const toggleBtn = document.getElementById('toggleCalendar');
    const panel = document.getElementById('calendarPanel');
    const head = document.getElementById('calendarHead');
    const grid = document.getElementById('calendarGrid');
    const monthLabel = document.getElementById('monthLabel');
    const prevMonth = document.getElementById('prevMonth');
    const nextMonth = document.getElementById('nextMonth');
    const todayLabel = document.getElementById('todayLabel');
    const selectedLabel = document.getElementById('selectedLabel');

    const detailEmpty = document.getElementById('detailEmpty');
    const detailCard = document.getElementById('detailCard');
    const detailTitle = document.getElementById('detailTitle');
    const detailDesc = document.getElementById('detailDesc');
    const detailDate = document.getElementById('detailDate');
    const closeDetails = document.getElementById('closeDetails');

    const bg = document.getElementById("blur-background");

    // Start view month/year: show November 2025
    let viewYear = 2025;
    let viewMonth = 10; // 0-based -> 10 = November
    let selectedDate = null;

    // Render day-of-week header
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    function renderHead() {
        head.innerHTML = '';
        dayNames.forEach(d => {
            const el = document.createElement('div');
            el.className = 'dow';
            el.textContent = d;
            head.appendChild(el);
        });
    }

    // Format month/year label
    function formatMonthLabel(y, m) {
        const d = new Date(y, m, 1);
        return d.toLocaleString(undefined, { month: 'long', year: 'numeric' });
    }

    // Utility to format date nicely for details
    function prettyDate(d) {
        return d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
    }

    // Render calendar grid for viewMonth/viewYear
    function renderCalendar() {
        grid.innerHTML = '';
        monthLabel.textContent = formatMonthLabel(viewYear, viewMonth);

        const firstOfMonth = new Date(viewYear, viewMonth, 1);
        const startDay = firstOfMonth.getDay();
        const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
        const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();

        // follow 6-week grid (42 cells)
        const totalCells = 42;
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div');
            cell.className = 'date-cell';
            // compute date number
            const dateIndex = i - startDay + 1;
            let cellDate, inMonth = true;
            if (dateIndex <= 0) {
                const dayNum = prevMonthDays + dateIndex;
                cellDate = new Date(viewYear, viewMonth - 1, dayNum);
                inMonth = false;
                cell.classList.add('muted');
            } else if (dateIndex > daysInMonth) {
                const dayNum = dateIndex - daysInMonth;
                cellDate = new Date(viewYear, viewMonth + 1, dayNum);
                inMonth = false;
                cell.classList.add('muted');
            } else {
                cellDate = new Date(viewYear, viewMonth, dateIndex);
            }

            // date number
            const num = document.createElement('div');
            num.className = 'date-num';
            num.textContent = cellDate.getDate();
            cell.appendChild(num);

            // mark today
            const today = new Date();
            if (cellDate.getFullYear() === today.getFullYear() && cellDate.getMonth() === today.getMonth() && cellDate.getDate() === today.getDate()) {
                cell.classList.add('today');
            }

            // check if there's an event on that ISO date
            const iso = cellDate.getFullYear().toString().padStart(4, '0') + '-' +
                String(cellDate.getMonth() + 1).padStart(2, '0') + '-' +
                String(cellDate.getDate()).padStart(2, '0');
            const ev = eventsByDate[iso];
            if (ev) {
                // add badge
                const badge = document.createElement('span');
                badge.className = 'evt-badge';
                badge.title = ev.title;
                cell.appendChild(badge);
                // small preview label (optional)
                const label = document.createElement('div');
                label.className = 'evt-label';
                label.textContent = ev.title;
                cell.appendChild(label);
            }

            // highlight selected
            if (selectedDate && cellDate.getFullYear() === selectedDate.getFullYear() && cellDate.getMonth() === selectedDate.getMonth() && cellDate.getDate() === selectedDate.getDate()) {
                cell.classList.add('selected');
                selectedLabel.textContent = prettyDate(selectedDate);
            }

            // click handler
            cell.addEventListener('click', (e) => {
                e.stopPropagation();
                // if clicked day has event show in details, else show "no event"
                selectedDate = new Date(cellDate.getFullYear(), cellDate.getMonth(), cellDate.getDate());
                selectedLabel.textContent = prettyDate(selectedDate);
                // show details area
                if (eventsByDate[iso]) {
                    showDetails(eventsByDate[iso]);
                } else {
                    showDetails({ title: 'No Event', desc: 'No scheduled event on this day.', date: iso });
                }
                // visually mark selected cell
                grid.querySelectorAll('.date-cell').forEach(c => c.classList.remove('selected'));
                cell.classList.add('selected');
            });

            grid.appendChild(cell);
        }
    }

    // Show details in right panel
    function showDetails(ev) {
        detailEmpty.style.display = 'none';
        detailCard.style.display = 'block';
        detailTitle.textContent = ev.title || 'Event';
        detailDesc.textContent = ev.desc || '';
        // date formatting
        let d = ev.date ? parseISO(ev.date) : selectedDate;
        detailDate.textContent = prettyDate(d);
    }

    function hideDetails() {
        detailEmpty.style.display = 'block';
        detailCard.style.display = 'none';
    }

    // parse ISO date string to Date
    function parseISO(s) { const p = s.split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); }

    // Toggle panel open/close
    function openPanel() {
        panel.style.display = 'block';
        panel.setAttribute('aria-hidden', 'false');
        toggleBtn.setAttribute('aria-expanded', 'true');
        // initial render/update
        renderHead();

        // bg.classList.add("blur"); 
        renderCalendar();
        const today = new Date();
        todayLabel.textContent = prettyDate(today);
        // listen for outside clicks to close
        setTimeout(() => document.addEventListener('click', onDocClick));
    }
    function closePanel() {
        panel.style.display = 'none';
        panel.setAttribute('aria-hidden', 'true');
        toggleBtn.setAttribute('aria-expanded', 'false');
        hideDetails();

        // bg.classList.remove("blur"); 
        document.removeEventListener('click', onDocClick);
    }

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (panel.style.display === 'block') closePanel();
        else openPanel();
    });

    // Prev / next month
    prevMonth.addEventListener('click', (e) => {
        e.stopPropagation();
        viewMonth--;
        if (viewMonth < 0) { viewMonth = 11; viewYear--; }
        renderCalendar();
        hideDetails();
    });
    nextMonth.addEventListener('click', (e) => {
        e.stopPropagation();
        viewMonth++;
        if (viewMonth > 11) { viewMonth = 0; viewYear++; }
        renderCalendar();
        hideDetails();
    });

    // Close details button
    closeDetails.addEventListener('click', (e) => {
        e.stopPropagation();
        hideDetails();
    });

    // Click outside should close panel
    function onDocClick(e) {
        if (!panel.contains(e.target) && e.target !== toggleBtn) {
            closePanel();
        }
    }

    // Show initial data but panel closed
    renderHead();
    renderCalendar();
    // put today's label at footer (will update on open)
    todayLabel.textContent = new Date().toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

    // Ensure panel position stays under button even on resize
    window.addEventListener('resize', () => {
        // panel is centered via transform; no repositioning required
    });

    // expose for debugging
    window.__inlineCalendar = { open: openPanel, close: closePanel, goToMonth: (y, m) => { viewYear = y; viewMonth = m; renderCalendar(); } };

})();

// prevent code copy
document.addEventListener("copy", (e) => {
    const selectedData = window.getSelection().toString();
    e.clipboardData.setData(
        "text/plain",
        "Mat kr lala mt kr, copy nhi hoga! 😂😭"
    )
    e.preventDefault();
});

// diable right click
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

// For flying dots and tilt effect on cards
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".my-glass-card2");
    const TILT_STRENGTH = 16;

    cards.forEach((card) => {
        const inner = card.querySelector(".my-glass-card2-inner");
        if (!inner) return;

        // 1) Make 11 dots *inside* inner, not card
        for (let i = 0; i < 11; i++) {
            const dot = document.createElement("span");
            dot.classList.add("floating-dot");

            const top = Math.random() * 100;
            const left = Math.random() * 100;

            dot.style.top = top + "%";
            dot.style.left = left + "%";

            const duration = 6 + Math.random() * 5; // 6–11s
            const delay = Math.random() * -10;

            dot.style.animationDuration = duration + "s";
            dot.style.animationDelay = delay + "s";

            inner.appendChild(dot);
        }

        // 2) Tilt only the inner section, not image
        card.addEventListener("mousemove", (e) => {
            const rect = inner.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const normX = (x - centerX) / centerX;
            const normY = (y - centerY) / centerY;

            const rotateY = normX * TILT_STRENGTH;
            const rotateX = normY * TILT_STRENGTH;

            inner.style.transform =
                `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            inner.classList.add("tilting");
        });

        card.addEventListener("mouseleave", () => {
            inner.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
            inner.classList.remove("tilting");
        });
    });
});

// ========= event card render =========
// Array of card data
const cardsData = [
    {
        title: "Algo Workshop",
        description: "A full-day workshop focusing on problem solving and competitive programming basics.",
        date: "May 10, 2025",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder",
        link: "#"
    },
    {
        title: "Web Dev Bootcamp",
        description: "Build modern web apps with React and Node in this weekend bootcamp.",
        date: "June 1, 2025",
        imageUrl: "https://blog.bishopmccann.com/hubfs/event%20tech%20main_%20AdobeStock_352613171.jpeg",
        link: "#"
    },
    {
        title: "Hackathon 24H",
        description: "A 24 hour hackathon inviting all students to build something useful and ship it.",
        date: "July 15, 2025",
        imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder",
        link: "#"
    },
    {
        title: "Algo Workshop",
        description: "A full-day workshop focusing on problem solving and competitive programming basics.",
        date: "May 10, 2025",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1400&auto=format&fit=crop",
        link: "#"
    }
];

// Function to generate a single card
function createCard(card) {
    // Create elements
    const colDiv = document.createElement('div');
    colDiv.classList.add('col-md-3');

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'my-glass-card2', 'h-100');

    const img = document.createElement('img');
    img.src = card.imageUrl;
    img.classList.add('card-img-top', 'floating-img');
    img.alt = 'event';

    const innerDiv = document.createElement('div');
    innerDiv.classList.add('my-glass-card2-inner');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = card.title;

    const cardText = document.createElement('p');
    cardText.classList.add('card-text', 'text-muted');
    cardText.textContent = card.description;

    const footerDiv = document.createElement('div');
    footerDiv.classList.add('d-flex', 'justify-content-between', 'align-items-center');

    const small = document.createElement('small');
    small.classList.add('text-muted');
    small.textContent = card.date;

    const registerBtn = document.createElement('a');
    registerBtn.href = card.link;
    registerBtn.classList.add('btn', 'btn-sm', 'btn-primary');
    registerBtn.textContent = 'Register';

    // Append elements to each other
    footerDiv.appendChild(small);
    footerDiv.appendChild(registerBtn);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(footerDiv);

    innerDiv.appendChild(cardBody);

    cardDiv.appendChild(img);
    cardDiv.appendChild(innerDiv);

    colDiv.appendChild(cardDiv);

    return colDiv;
}

// Function to render all cards
function renderCards(cards) {
    const container = document.getElementById('event-cards-container');

    cards.forEach(card => {
        container.appendChild(createCard(card));
    });
}

// Call render function
renderCards(cardsData);


// first card anim
document.addEventListener("DOMContentLoaded", () => {
    const card = document.getElementById("recent-hackathon-card");
    if (!card) return;

    const TILT_STRENGTH = 12; // change for more/less tilt

    // --- 1) Add the shine layer ---
    const shine = document.createElement("div");
    shine.className = "hackathon-shine";
    card.appendChild(shine);

    // --- 2) Create some particles (unique just for this card) ---
    const PARTICLE_COUNT = 11;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const dot = document.createElement("span");
        dot.className = "hackathon-particle";

        // random starting position near edges
        const side = Math.random();
        if (side < 0.25) {
            dot.style.top = Math.random() * 100 + "%";
            dot.style.left = "-4%";
        } else if (side < 0.5) {
            dot.style.top = Math.random() * 100 + "%";
            dot.style.right = "-4%";
        } else if (side < 0.75) {
            dot.style.left = Math.random() * 100 + "%";
            dot.style.top = "-4%";
        } else {
            dot.style.left = Math.random() * 100 + "%";
            dot.style.bottom = "-4%";
        }

        const duration = 5 + Math.random() * 5;   // 5–10s
        const delay = Math.random() * -10;        // staggered

        dot.style.animationDuration = duration + "s";
        dot.style.animationDelay = delay + "s";

        card.appendChild(dot);
    }

    // --- 3) 3D tilt that follows cursor ---
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const normX = (x - centerX) / centerX; // -1 to 1
        const normY = (y - centerY) / centerY; // -1 to 1

        const rotateY = normX * TILT_STRENGTH;
        const rotateX = -normY * TILT_STRENGTH;

        card.style.transform =
            `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
    });
});

// timeline
document.addEventListener("DOMContentLoaded", () => {
    const timelineSection = document.getElementById("timeline-section");
    if (!timelineSection) return;

    const items = timelineSection.querySelectorAll(".timeline-item");

    // Add small floating particles around each timeline card
    items.forEach((item) => {
        const card = item.querySelector(".timeline-card");
        if (!card) return;

        const PARTICLES = 6;
        for (let i = 0; i < PARTICLES; i++) {
            const dot = document.createElement("span");
            dot.className = "timeline-particle";

            // position roughly around the card edges
            const side = Math.random();
            if (side < 0.25) {
                dot.style.top = Math.random() * 100 + "%";
                dot.style.left = "-6%";
            } else if (side < 0.5) {
                dot.style.top = Math.random() * 100 + "%";
                dot.style.right = "-6%";
            } else if (side < 0.75) {
                dot.style.left = Math.random() * 100 + "%";
                dot.style.top = "-6%";
            } else {
                dot.style.left = Math.random() * 100 + "%";
                dot.style.bottom = "-6%";
            }

            const duration = 5 + Math.random() * 5;  // 5–10s
            const delay = Math.random() * -10;       // out of sync

            dot.style.animationDuration = duration + "s";
            dot.style.animationDelay = delay + "s";

            item.appendChild(dot);
        }
    });

    // Intersection Observer to open/close cards on scroll
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                } else {
                    // closes again when leaving viewport (scrolling back)
                    entry.target.classList.remove("is-visible");
                }
            });
        },
        {
            threshold: 0.50, // 35% of the item visible to trigger
        }
    );

    items.forEach((item) => observer.observe(item));
});

// nav links scroll less
document.querySelectorAll('a.nav-link[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    const navbarHeight = 100; // change to your actual nav height
    const top =
      target.getBoundingClientRect().top +
      window.scrollY -
      navbarHeight;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  });
});
