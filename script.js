       /* ----------------------------------------------------------------
           CERTIFICATES DATA & DECK LOGIC
        ---------------------------------------------------------------- */
        const certificates = [
            {
                title: "Oracle Certified Data Science Professional",
                issuer: "Oracle Cloud Infrastructure 2025",
                date: "Oct 31, 2025",
                icon: "fa-database"
            },
            {
                title: "Generative AI Professional",
                issuer: "Oracle Cloud Infrastructure 2025",
                date: "Oct 14, 2025",
                icon: "fa-brain"
            },
            {
                title: "AI Foundations Associate",
                issuer: "Oracle Cloud Infrastructure 2025",
                date: "Aug 21, 2025",
                icon: "fa-robot"
            },
            {
                title: "Software Engineering Job Simulation",
                issuer: "JPMorgan Chase & Co / Forage",
                date: "July 8, 2025",
                icon: "fa-laptop-code"
            },
            {
                title: "500 Difficulty Rating",
                issuer: "CodeChef",
                date: "Jun 19, 2025",
                icon: "fa-code"
            },
            {
                title: "Web Development Hackathon",
                issuer: "TIT Developer Community",
                date: "03/04/2025",
                icon: "fa-trophy"
            },
            {
                title: "Solution Challenge Participant",
                issuer: "Google Developer Groups (GDG)",
                date: "2025",
                icon: "fa-lightbulb"
            },
            {
                title: "Artificial Intelligence Fundamentals",
                issuer: "IBM SkillsBuild",
                date: "Jan 09, 2025",
                icon: "fa-microchip"
            },
            {
                title: "Node.js & Web Scraping API",
                issuer: "SkillEcted Campus Program",
                date: "Dec 22, 2024",
                icon: "fa-server"
            },
            {
                title: "Data Analytics Job Simulation",
                issuer: "Accenture / Forage",
                date: "Nov 16, 2024",
                icon: "fa-chart-line"
            },
             {
                title: "GSoc, Git & GitHub Seminar",
                issuer: "Developers Club",
                date: "Participation",
                icon: "fa-github"
            }
        ];

        const deckContainer = document.getElementById('certDeck');
        let certIndex = 0;

        function renderDeck() {
            deckContainer.innerHTML = '';
            // Render cards in reverse order so the first one is on top in z-index
            for (let i = certificates.length - 1; i >= 0; i--) {
                const cert = certificates[i];
                const el = document.createElement('div');
                el.className = 'cert-card';
                el.innerHTML = `
                    <i class="fas ${cert.icon} cert-icon"></i>
                    <div class="cert-title">${cert.title}</div>
                    <div class="cert-issuer">${cert.issuer}</div>
                    <div class="cert-date">${cert.date}</div>
                `;
                
                // Initial Stack Styles
                const offset = i * 2; // Slight visual offset for stack effect
                el.style.transform = `translate3d(${offset}px, ${-offset}px, -${i * 20}px)`;
                el.style.zIndex = certificates.length - i;
                
                // Click Handler to "Flip"
                el.onclick = () => flipCard(el);
                
                deckContainer.appendChild(el);
            }
        }

        function flipCard(card) {
            // Animate out to left
            card.style.transform = 'translate3d(-150%, 0, 0) rotateY(-30deg)';
            card.style.opacity = '0';
            
            // Move to back of stack after animation
            setTimeout(() => {
                deckContainer.prepend(card); // Move DOM element to bottom of stack
                // Reset styles to "back of stack" position
                card.style.transition = 'none'; // Disable transition for instant reset
                card.style.transform = `translate3d(10px, -10px, -${certificates.length * 20}px)`; 
                card.style.opacity = '1';
                
                // Re-enable transition and settle into stack
                setTimeout(() => {
                     card.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.6s';
                     restackCards();
                }, 50);
            }, 600);
        }

        function restackCards() {
            const cards = document.querySelectorAll('.cert-card');
            // We need to re-assign z-indexes and transforms based on new visual order
            // The last element in DOM is visually on TOP
            
            // Logic: The element at the bottom of the DOM (last child) should be front
            // But we used prepend logic which puts 'used' cards at top of DOM (back of visual stack)
            // Let's simplify: Just re-render visually based on current DOM order
             Array.from(cards).forEach((card, index) => {
                 // index 0 is back, index length-1 is front
                 const revIndex = cards.length - 1 - index; // 0 for front, high for back
                 
                 card.style.zIndex = index; 
                 const offset = revIndex * 2;
                 card.style.transform = `translate3d(${offset}px, ${-offset}px, -${revIndex * 20}px)`;
             });
        }

        // Initialize Deck
        renderDeck();


        /* ----------------------------------------------------------------
           MAILTO FUNCTIONALITY
        ---------------------------------------------------------------- */
        function sendMail(event) {
            event.preventDefault();
            const name = document.getElementById('senderName').value;
            const subject = document.getElementById('senderSubject').value;
            const message = document.getElementById('senderMessage').value;
            const body = `Name: ${name}%0D%0A%0D%0A${message}`;
            window.location.href = `mailto:amratanshgautam@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
            alert("Launching communications protocols... Please check your email client to send.");
        }

        /* ----------------------------------------------------------------
           AUDIO & INIT
        ---------------------------------------------------------------- */
        let audioCtx;

        function startSystem() {
            const initScreen = document.getElementById('init-screen');
            initScreen.style.opacity = 0;
            setTimeout(() => initScreen.style.display = 'none', 1000);
            
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                audioCtx = new AudioContext();
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.value = 50; 
                const filter = audioCtx.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.value = 200;
                osc.connect(filter);
                filter.connect(gain);
                gain.connect(audioCtx.destination);
                gain.gain.value = 0.05; 
                osc.start();
            } catch(e) { console.log("Audio init failed - browser policy"); }
        }

        /* ----------------------------------------------------------------
           NAVIGATION LOGIC
        ---------------------------------------------------------------- */
        function toggleMenu() {
            document.getElementById('curtain').classList.toggle('open');
            document.querySelector('.menu-trigger').classList.toggle('active');
        }

        function navigate(sceneId) {
            toggleMenu(); 
            document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
            document.getElementById('stage').scrollTop = 0;
            setTimeout(() => {
                document.getElementById(sceneId).classList.add('active');
            }, 600);
        }

        /* ----------------------------------------------------------------
           CURSOR & COORDS
        ---------------------------------------------------------------- */
        const cursor = document.getElementById('cursor');
        const cursorFollow = document.getElementById('cursor-follow');
        const coordDisplay = document.getElementById('coordinates');

        // Only activate custom cursor logic on devices that support hover (mouse)
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            document.addEventListener('mousemove', (e) => {
                const x = e.clientX;
                const y = e.clientY;
                cursor.style.left = x + 'px';
                cursor.style.top = y + 'px';
                setTimeout(() => {
                    cursorFollow.style.left = x + 'px';
                    cursorFollow.style.top = y + 'px';
                }, 50);
                if(coordDisplay) {
                    coordDisplay.innerText = `X: ${x.toString().padStart(4, '0')} // Y: ${y.toString().padStart(4, '0')}`;
                }
            });

            document.querySelectorAll('a, button, .data-card, .cert-card').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'scale(2) rotate(45deg)';
                    cursor.style.background = 'var(--neon)';
                    cursorFollow.style.borderColor = 'var(--neon)';
                    cursorFollow.style.transform = 'translate(-50%, -50%) scale(1.5)';
                });
                el.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'scale(1) rotate(45deg)';
                    cursor.style.background = 'transparent';
                    cursorFollow.style.borderColor = 'rgba(255,255,255,0.1)';
                    cursorFollow.style.transform = 'translate(-50%, -50%) scale(1)';
                });
            });
        }

        /* ----------------------------------------------------------------
           VORTEX CANVAS ANIMATION
        ---------------------------------------------------------------- */
        const canvas = document.getElementById('vortex-canvas');
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.z = Math.random() * 1000 + 500; 
                this.size = Math.random() * 2;
            }
            update() {
                this.z -= 5;
                if(this.z <= 1) this.reset();
            }
            draw() {
                const scale = 500 / this.z;
                const x2d = (this.x - width/2) * scale + width/2;
                const y2d = (this.y - height/2) * scale + height/2;
                const alpha = 1 - (this.z / 1500);
                ctx.fillStyle = `rgba(0, 243, 255, ${alpha})`;
                ctx.beginPath();
                ctx.arc(x2d, y2d, this.size * scale, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for(let i=0; i<200; i++) particles.push(new Particle());

        function animate() {
            ctx.fillStyle = 'rgba(5, 5, 5, 0.2)';
            ctx.fillRect(0, 0, width, height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        }
        animate();
