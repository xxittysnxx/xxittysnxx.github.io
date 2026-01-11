document.addEventListener('DOMContentLoaded', () => {

    // --- Terminal Typing Animation ---
    const terminalBody = document.querySelector('.terminal-body');
    if (terminalBody) {
        const lines = [
            { text: "> Initializing Neural Link...", delay: 500 },
            { text: "> Bypassing ICE protocols...", delay: 500 },
            { text: "> Connection Established.", delay: 500 },
            { text: "> Accessing Database: NETWATCH_ARCHIVES...", delay: 1000, class: 'highlight' },
            { text: "Identity Confirmed: ", delay: 1000, nextSpan: { text: "Carlos Tsai", class: "neon-text highlight" } },
            { text: "--------------------------------------------------", delay: 0 },
            { text: "> System Engineer @ Foxconn Industrial Internet", delay: 0 },
            { text: "> Core Skillset: Full-Stack Dev / HCI / AI Integration", delay: 0 },
            { text: "> Experience: ELITE | Shopee", delay: 0 },
            { text: "--------------------------------------------------", delay: 1000 },
            {
                text: "Summary: A detail-oriented System Engineer bridging the gap between robust systems and user-centric interfaces. Proven track record in migrating legacy systems, automating workflows via CI/CD, and deploying RNN/LLM models to solve real-world complexities.",
                delay: 0,
                class: 'highlight'
            },
            { text: "--------------------------------------------------", delay: 0 },
            { text: "> Ready to drive innovation in high-impact projects...", delay: 1000 },
            // { text: "> [SEARCHING FOR OPPORTUNITIES...]", delay: 1000, class: 'blink' }
        ];

        let lineIndex = 0;
        let hasStartedTyping = false;

        function typeLine(line) {
            if (lineIndex >= lines.length) return;

            const p = document.createElement('p');
            p.classList.add('typing-line');
            if (line.class) p.classList.add(line.class);

            terminalBody.appendChild(p);

            let charIndex = 0;
            const textToType = line.text;

            function typeChar() {
                if (charIndex < textToType.length) {
                    p.textContent += textToType.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeChar, 30 + Math.random() * 40); // Slightly faster typing
                } else {
                    p.classList.remove('typing-line');
                    if (line.nextSpan) {
                        const span = document.createElement('span');
                        span.className = line.nextSpan.class;
                        span.textContent = line.nextSpan.text;
                        p.appendChild(span);
                    }
                    lineIndex++;
                    if (lineIndex < lines.length) {
                        setTimeout(() => typeLine(lines[lineIndex]), line.delay);
                    }
                }
            }
            typeChar();
        }

        // Observer for Terminal
        const terminalObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasStartedTyping) {
                    hasStartedTyping = true;
                    // Slightly delay start for effect
                    setTimeout(() => typeLine(lines[0]), 500);
                    terminalObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 }); // Trigger when 30% visible

        terminalObserver.observe(document.querySelector('.terminal-window'));
    }


    // --- Skill Bar Animation ---
    // We expect .progress-fill elements to have width:0 initially via CSS (we will fix this next),
    // and we will apply the target width from their inline style when they appear.

    // First, let's store the target width in a data attribute and reset to 0
    const progressFills = document.querySelectorAll('.progress-fill');

    progressFills.forEach(fill => {
        // Move inline width to data-width if not done yet
        if (fill.style.width && fill.style.width !== '0px') {
            fill.dataset.width = fill.style.width;
            fill.style.width = '0%';
        }
    });

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const targetWidth = fill.dataset.width || '100%';

                // Add a small staggered delay based on index if possible, or just animate CSS
                fill.style.transition = 'width 1.5s cubic-bezier(0.22, 1, 0.36, 1)';
                fill.style.width = targetWidth;

                skillObserver.unobserve(fill);
            }
        });
    }, { threshold: 0.2 });

    progressFills.forEach(fill => {
        skillObserver.observe(fill);
    });

    // --- GitHub Auto-Fetch ---
    // Only run on projects page
    const otherProjectsGrid = document.getElementById('other-projects-grid');
    if (otherProjectsGrid) {
        fetchGithubRepos();
    }

    async function fetchGithubRepos() {
        const username = 'xxittysnxx';
        const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;

        // Show section and loading state
        const container = document.getElementById('other-projects-container');
        const grid = document.getElementById('other-projects-grid');

        if (container && grid) {
            container.style.display = 'block';
            grid.innerHTML = '<p class="typing-line" style="color: var(--cp-yellow);">// ACCESSING_GITHUB_DATABASE...</p>';
        }

        try {
            // 1. Get existing project names from the DOM
            const existingTitles = new Set();
            document.querySelectorAll('.card-header h4').forEach(h4 => {
                const title = h4.textContent.trim().toLowerCase();
                existingTitles.add(title);
                console.log('Skipping existing project:', title);
            });

            // 2. Fetch from GitHub
            console.log(`Fetching repos from: ${apiUrl}`);
            const response = await fetch(apiUrl);

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`GitHub API Error: ${response.status} ${response.statusText} - ${errText}`);
            }

            const repos = await response.json();
            console.log(`Fetched ${repos.length} repos from GitHub.`);

            // 3. Filter and Render
            // Filter: Must not be in existingTitles, must not be private.
            // Note: GitHub API v3 'private' field might be false for public repos.
            const newRepos = repos.filter(repo => {
                const isExisting = existingTitles.has(repo.name.toLowerCase());
                return !isExisting && !repo.private;
            });

            // Clear loading message
            grid.innerHTML = '';

            if (newRepos.length > 0) {
                newRepos.forEach(repo => {
                    const card = createProjectCard(repo);
                    grid.appendChild(card);
                });
            } else {
                grid.innerHTML = '<p style="color: gray;">// NO_NEW_DATA_FOUND</p>';
            }

        } catch (error) {
            console.error('Auto-fetch failed:', error);
            if (grid) {
                grid.innerHTML = `<p style="color: var(--cp-red);">// ERROR: CONNECTION_FAILED [${error.message}]</p>`;
            }
        }
    }

    function createProjectCard(repo) {
        const a = document.createElement('a');
        a.href = repo.html_url;
        a.target = '_blank';
        a.className = 'project-card';
        a.style.opacity = '0'; // For fade-in effect
        a.style.animation = 'fadeIn 0.5s forwards';

        // Determine main language
        const lang = repo.language || 'Code';

        a.innerHTML = `
            <div class="card-header">
                <h4>${repo.name}</h4>
                <span class="lang-tag">${lang}</span>
            </div>
            <p>${repo.description || 'No description provided.'}</p>
        `;

        return a;
    }

    // --- Profile Image Toggle ---
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        let isAlt = false;
        const mainSrc = 'assets/ai_profile.png';
        const altSrc = 'assets/cyber_profile.png'; // Assuming this exists

        profileImg.addEventListener('click', () => {
            if (profileImg.classList.contains('glitching')) return; // Prevent spam

            // Start glitch animation
            profileImg.classList.add('glitching');

            // Swap source halfway through animation (at 300ms of 600ms)
            setTimeout(() => {
                if (isAlt) {
                    profileImg.src = mainSrc;
                } else {
                    profileImg.src = altSrc;
                }
                isAlt = !isAlt;
            }, 300);

            // Cleanup after animation
            setTimeout(() => {
                profileImg.classList.remove('glitching');
            }, 600);
        });

        // Add cursor pointer to indicate interactivity
        profileImg.style.cursor = 'pointer';
        profileImg.title = ">> CLICK TO TOGGLE IDENTITY PROTOCOL <<";
    }
});
