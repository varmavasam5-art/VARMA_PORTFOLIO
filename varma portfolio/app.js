/* -------------------------------------------------------------
   SYSTEM SCRIPTS - SPIDER-MAN GLITCH THEME
   ------------------------------------------------------------- */

// Project database containing themed descriptions
const PROJECTS_DATA = {
    ds: {
        name: "SYNAPTIC ANOMALIES",
        category: "DATA SCIENCE & ML",
        longDesc: "A neural network anomaly classifier mapping data clusters. Fuses high-dimensional statistical machine learning models with interactive data feeds to trace pattern anomalies in real-time, plotting relationships like dynamic spider-web nodes.",
        goal: "Detect and classify data anomalies with 99.4% accuracy.",
        stack: "Python, TensorFlow, Scikit-Learn, Pandas, NumPy",
        image: "assets/ds_project.png"
    },
    video: {
        name: "SPIDER-SENSE EDIT",
        category: "CREATIVE VIDEO EDITING",
        longDesc: "A high-impact cinematic showreel showcasing custom glitch sequences, chromatic color separations, and comic halftone textures. Synchronizes fast pacing edits with a dynamic cyberpunk score, reflecting professional video editing and motion graphics.",
        goal: "Animate and pace high-end cinematic narrative sequences.",
        stack: "Adobe Premiere Pro, After Effects, DaVinci Resolve, Audition",
        image: "assets/video_project.png"
    },
    web: {
        name: "DYNAMIC GATEWAY",
        category: "WEB DEV PORTAL",
        longDesc: "An interactive web gateway dashboard featuring highly responsive glassmorphic widgets tracking API pings, real-time performance indicators, and data streams.",
        goal: "Design high-performance visual dashboards for complex web applications.",
        stack: "HTML5, Custom CSS Variables, ES6 JavaScript, Web Audio API, Canvas",
        image: "assets/web_project.png"
    },
    synergy: {
        name: "ARACHNE COMPOSITIONS",
        category: "CREATIVE SYNERGY",
        longDesc: "A convergence of data analysis pipelines, responsive frontend components, and motion design layouts. Generates automated animations and user transitions from structured data feeds.",
        goal: "Generate automated, responsive animations from user interaction data.",
        stack: "Python, HTML5 Canvas, Web Audio API, After Effects Scripting",
        image: "assets/creative_art.png"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    // ---------------------------------------------------------
    // DOM SELECTIONS
    // ---------------------------------------------------------
    const loader = document.getElementById("loader");
    const enterBtn = document.getElementById("enterBtn");
    const experience = document.getElementById("experience");
    
    const cursorFollower = document.getElementById("cursorFollower");
    const cursorDot = document.getElementById("cursorDot");
    const previewFollower = document.getElementById("projectPreviewFollower");
    const previewImg = document.getElementById("previewFollowerImg");
    
    const audioControl = document.getElementById("audioControl");
    const visualizer = document.getElementById("visualizer");
    const audioToggleBtn = document.getElementById("audioToggleBtn");
    const volumeIcon = document.getElementById("volumeIcon");
    
    const canvas = document.getElementById("canvasBackground");
    
    const projectList = document.getElementById("projectList");
    const projectRows = document.querySelectorAll(".project-row");
    const projectModal = document.getElementById("projectModal");
    const modalCloseBtn = document.getElementById("modalCloseBtn");
    const modalOverlay = document.getElementById("modalOverlay");
    
    const modalImg = document.getElementById("modalImg");
    const modalCategory = document.getElementById("modalCategory");
    const modalName = document.getElementById("modalName");
    const modalLongDesc = document.getElementById("modalLongDesc");
    const modalGoal = document.getElementById("modalGoal");
    const modalStack = document.getElementById("modalStack");

    // ---------------------------------------------------------
    // TARGET RETICLE CURSOR TRACKING
    // ---------------------------------------------------------
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    let previewX = 0, previewY = 0;
    
    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant cursor core dot positioning
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });
    
    // Animation LERP loop for tracking cursor follower and preview card
    function animateCursors() {
        const lerpFactor = 0.15;
        const previewLerp = 0.08;
        
        // Red target ring position
        followerX += (mouseX - followerX) * lerpFactor;
        followerY += (mouseY - followerY) * lerpFactor;
        cursorFollower.style.left = `${followerX}px`;
        cursorFollower.style.top = `${followerY}px`;
        
        // Image preview card position
        previewX += (mouseX - previewX) * previewLerp;
        previewY += (mouseY - previewY) * previewLerp;
        previewFollower.style.left = `${previewX}px`;
        previewFollower.style.top = `${previewY}px`;
        
        requestAnimationFrame(animateCursors);
    }
    animateCursors();
    
    // Bind cursor interactions on hoverable items
    function initCursorHovers() {
        const hoverables = document.querySelectorAll(".cursor-hover");
        hoverables.forEach(item => {
            item.addEventListener("mouseenter", () => {
                cursorFollower.classList.add("hovered");
            });
            item.addEventListener("mouseleave", () => {
                cursorFollower.classList.remove("hovered");
            });
        });
    }
    initCursorHovers();

    // ---------------------------------------------------------
    // PROJECT ROW IMAGE PREVIEW HOVER SYSTEM & 3D TILT
    // ---------------------------------------------------------
    projectRows.forEach(row => {
        row.addEventListener("mouseenter", () => {
            const projectId = row.dataset.project;
            const data = PROJECTS_DATA[projectId];
            if (data) {
                previewImg.src = data.image;
                previewImg.alt = data.name;
                previewFollower.classList.add("active");
            }
        });
        
        row.addEventListener("mousemove", (e) => {
            const rect = row.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Normalize inputs between -0.5 and 0.5
            const dx = (x / rect.width) - 0.5;
            const dy = (y / rect.height) - 0.5;
            
            // Apply 3D rotation based on mouse coordinates inside the element
            row.style.transform = `perspective(1000px) rotateX(${dy * -6}deg) rotateY(${dx * 3}deg) translateZ(4px)`;
            
            // Subtle parallax shifts on row items
            const titleBlock = row.querySelector(".row-title-block");
            const desc = row.querySelector(".row-desc");
            const num = row.querySelector(".row-num");
            const arrow = row.querySelector(".row-arrow");
            
            if (titleBlock) titleBlock.style.transform = `translateZ(10px) translateX(${dx * 8}px)`;
            if (desc) desc.style.transform = `translateZ(5px) translateX(${dx * 4}px)`;
            if (num) num.style.transform = `translateZ(8px)`;
            if (arrow) arrow.style.transform = `translateZ(12px) rotate(45deg) translate(${dx * 5}px, ${dy * 5}px)`;
        });
        
        row.addEventListener("mouseleave", () => {
            previewFollower.classList.remove("active");
            row.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0deg)";
            
            const titleBlock = row.querySelector(".row-title-block");
            const desc = row.querySelector(".row-desc");
            const num = row.querySelector(".row-num");
            const arrow = row.querySelector(".row-arrow");
            
            if (titleBlock) titleBlock.style.transform = "none";
            if (desc) desc.style.transform = "none";
            if (num) num.style.transform = "none";
            if (arrow) arrow.style.transform = "none";
        });
    });


    // ---------------------------------------------------------
    // WEB AUDIO API - DEEP CYBER SYNTH DRONE
    // ---------------------------------------------------------
    let audioCtx = null;
    let mainGain = null;
    let osc1 = null;
    let osc2 = null;
    let filterNode = null;
    let isPlayingAudio = false;

    function initAmbientAudio() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContext();
            
            mainGain = audioCtx.createGain();
            mainGain.gain.setValueAtTime(0.0, audioCtx.currentTime); // Silent on load

            // Sub lowpass filter
            filterNode = audioCtx.createBiquadFilter();
            filterNode.type = "lowpass";
            filterNode.frequency.setValueAtTime(110, audioCtx.currentTime);
            filterNode.Q.setValueAtTime(8, audioCtx.currentTime);

            // Primary Osc - Sub Bass (48Hz / G1)
            osc1 = audioCtx.createOscillator();
            osc1.type = "sawtooth";
            osc1.frequency.setValueAtTime(48, audioCtx.currentTime);
            
            // Secondary Osc - Space Sonar Evolving Fifth (144Hz / D3)
            osc2 = audioCtx.createOscillator();
            osc2.type = "sine";
            osc2.frequency.setValueAtTime(144, audioCtx.currentTime);

            // Slow sweeping filter modulation
            const lfo = audioCtx.createOscillator();
            lfo.type = "sine";
            lfo.frequency.setValueAtTime(0.05, audioCtx.currentTime); // 20s cycle
            
            const lfoGain = audioCtx.createGain();
            lfoGain.gain.setValueAtTime(60, audioCtx.currentTime); // sweep range

            // Routing
            lfo.connect(lfoGain);
            lfoGain.connect(filterNode.frequency);
            
            osc1.connect(filterNode);
            osc2.connect(filterNode);
            filterNode.connect(mainGain);
            mainGain.connect(audioCtx.destination);

            osc1.start();
            osc2.start();
            lfo.start();
            
            // Cinematic fade-in volume
            mainGain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 3.0);
            isPlayingAudio = true;
            visualizer.classList.add("playing");
        } catch (e) {
            console.warn("Web Audio not supported.", e);
        }
    }

    function toggleAudio() {
        if (!audioCtx) {
            initAmbientAudio();
            return;
        }

        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        if (isPlayingAudio) {
            mainGain.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.4);
            visualizer.classList.remove("playing");
            isPlayingAudio = false;
            volumeIcon.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>`;
        } else {
            mainGain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 0.8);
            visualizer.classList.add("playing");
            isPlayingAudio = true;
            volumeIcon.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>`;
        }
    }

    audioControl.addEventListener("click", toggleAudio);

    // ---------------------------------------------------------
    // DYNAMIC MORPHING AUDIO WAVE VISUALIZER
    // ---------------------------------------------------------
    let wavePhase = 0;
    function initWaveCanvas() {
        const waveCanvas = document.getElementById("audioWaveCanvas");
        if (!waveCanvas) return;
        const waveCtx = waveCanvas.getContext("2d");
        
        function drawAudioWave() {
            waveCtx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);
            waveCtx.lineWidth = 1.0;
            
            // Draw baseline
            waveCtx.beginPath();
            waveCtx.strokeStyle = "rgba(255, 0, 60, 0.1)";
            waveCtx.moveTo(0, waveCanvas.height / 2);
            waveCtx.lineTo(waveCanvas.width, waveCanvas.height / 2);
            waveCtx.stroke();
            
            let amplitude = isPlayingAudio ? 5.0 : 0.8;
            let frequency = isPlayingAudio ? 0.12 : 0.04;
            let speed = isPlayingAudio ? 0.08 : 0.015;
            
            // Primary Sine Wave (Crimson)
            waveCtx.beginPath();
            waveCtx.strokeStyle = "rgba(255, 0, 60, 0.85)";
            for (let x = 0; x < waveCanvas.width; x++) {
                let y = (waveCanvas.height / 2) + Math.sin(x * frequency + wavePhase) * amplitude;
                if (x === 0) waveCtx.moveTo(x, y);
                else waveCtx.lineTo(x, y);
            }
            waveCtx.stroke();
            
            // Secondary Wave (Cyan)
            waveCtx.beginPath();
            waveCtx.strokeStyle = "rgba(0, 240, 255, 0.35)";
            for (let x = 0; x < waveCanvas.width; x++) {
                let y = (waveCanvas.height / 2) + Math.sin(x * (frequency * 0.85) - wavePhase + Math.PI / 2) * (amplitude * 0.75);
                if (x === 0) waveCtx.moveTo(x, y);
                else waveCtx.lineTo(x, y);
            }
            waveCtx.stroke();
            
            wavePhase += speed;
            requestAnimationFrame(drawAudioWave);
        }
        drawAudioWave();
    }

    // ---------------------------------------------------------
    // EXPERIENCE ENTRANCE WIPE
    // ---------------------------------------------------------
    enterBtn.addEventListener("click", () => {
        initAmbientAudio();
        
        document.body.classList.remove("no-scroll");
        
        const shutterTop = document.getElementById("shutterTop");
        const shutterBottom = document.getElementById("shutterBottom");
        
        loader.classList.add("fade-out");
        
        setTimeout(() => {
            loader.classList.add("hidden");
            experience.classList.remove("hidden");
            
            // Open cinematic shutters
            shutterTop.classList.add("open");
            shutterBottom.classList.add("open");
            
            // Re-bind scripts for active DOM elements
            setupScrollObservers();
            initCanvasBackground();
            initCursorHovers();
            initFooterCanvas();
            
            // Run waves visualizer
            initWaveCanvas();
        }, 1000);
    });

    // ---------------------------------------------------------
    // DYNAMIC INTERACTIVE SPIDER-WEB PHYSICS BACKGROUND
    // ---------------------------------------------------------
    const ctx = canvas.getContext("2d");
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;
    
    let webNodes = [];
    let activeWebLines = []; // active web-shoots fading out
    let focalLength = 320;
    
    class WebNode {
        constructor() {
            this.x3D = Math.random() * 300 - 150;
            this.y3D = Math.random() * 300 - 150;
            this.z3D = Math.random() * 200 - 100;
            
            // Initial velocity coordinates
            this.vx = Math.random() * 0.4 - 0.2;
            this.vy = Math.random() * 0.4 - 0.2;
            this.vz = Math.random() * 0.4 - 0.2;
            
            // Elastic offsets from original state
            this.ox3D = this.x3D;
            this.oy3D = this.y3D;
            
            // Projected screen coordinates
            this.x = 0;
            this.y = 0;
            this.scale = 1;
        }
        
        update(angleX, angleY) {
            // Drift velocity
            this.x3D += this.vx;
            this.y3D += this.vy;
            this.z3D += this.vz;
            
            // Wrap coordinates boundaries
            if (this.x3D > 200) this.x3D = -200;
            if (this.x3D < -200) this.x3D = 200;
            if (this.y3D > 200) this.y3D = -200;
            if (this.y3D < -200) this.y3D = 200;
            if (this.z3D > 150) this.z3D = -150;
            if (this.z3D < -150) this.z3D = 150;
            
            // Rotate coordinate spaces
            // Y rotation
            let x1 = this.x3D * Math.cos(angleY) - this.z3D * Math.sin(angleY);
            let z1 = this.z3D * Math.cos(angleY) + this.x3D * Math.sin(angleY);
            
            // X rotation
            let y2 = this.y3D * Math.cos(angleX) - z1 * Math.sin(angleX);
            let z2 = z1 * Math.cos(angleX) + this.y3D * Math.sin(angleX);
            
            // Project
            this.scale = focalLength / (focalLength + z2);
            this.x = (canvasWidth * 0.72) + x1 * this.scale;
            this.y = (canvasHeight * 0.42) + y2 * this.scale;
        }
    }
    
    function initCanvasBackground() {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        
        webNodes = [];
        const totalNodes = 75;
        for (let i = 0; i < totalNodes; i++) {
            webNodes.push(new WebNode());
        }
        
        // Bind click trigger for Spidey web-shoot action
        window.addEventListener("mousedown", shootWeb);
        
        animateWeb();
    }
    
    // Synthesize a retro-futuristic "THWIP!" web shoot sound
    function playThwipSound() {
        if (!audioCtx || audioCtx.state === 'suspended') {
            if (audioCtx && audioCtx.state === 'suspended') {
                audioCtx.resume();
            } else {
                return;
            }
        }
        
        try {
            const now = audioCtx.currentTime;
            
            // 1. Web rush noise burst
            const bufferSize = audioCtx.sampleRate * 0.12; // 120ms burst
            const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            
            const noiseNode = audioCtx.createBufferSource();
            noiseNode.buffer = buffer;
            
            const noiseFilter = audioCtx.createBiquadFilter();
            noiseFilter.type = "bandpass";
            noiseFilter.frequency.setValueAtTime(1200, now);
            noiseFilter.frequency.exponentialRampToValueAtTime(180, now + 0.12);
            noiseFilter.Q.setValueAtTime(4, now);
            
            const noiseGain = audioCtx.createGain();
            noiseGain.gain.setValueAtTime(0.28, now);
            noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
            
            noiseNode.connect(noiseFilter);
            noiseFilter.connect(noiseGain);
            noiseGain.connect(audioCtx.destination);
            
            // 2. High-speed elastic frequency sweep oscillator
            const osc = audioCtx.createOscillator();
            osc.type = "sine";
            osc.frequency.setValueAtTime(900, now);
            osc.frequency.exponentialRampToValueAtTime(80, now + 0.1);
            
            const oscGain = audioCtx.createGain();
            oscGain.gain.setValueAtTime(0.18, now);
            oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
            
            osc.connect(oscGain);
            oscGain.connect(audioCtx.destination);
            
            noiseNode.start(now);
            osc.start(now);
            
            noiseNode.stop(now + 0.14);
            osc.stop(now + 0.14);
        } catch (err) {
            console.warn("Thwip sound play failed:", err);
        }
    }

    // Spawn a styled floating comic text popup at click location
    function spawnComicPopup(e) {
        const words = ["THWIP!", "BAM!", "ZIP!", "PING!", "GLITCH!", "SHIELD!", "ANOMALY!", "BYPASS!", "CRACK!"];
        const randomWord = words[Math.floor(Math.random() * words.length)];
        
        const popup = document.createElement("div");
        popup.className = "comic-popup";
        popup.textContent = randomWord;
        
        // Position at click coordinates
        popup.style.left = `${e.clientX}px`;
        popup.style.top = `${e.clientY}px`;
        
        // Add random slight rotation offset
        const rot = Math.random() * 20 - 10; // -10deg to 10deg
        popup.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`;
        
        document.body.appendChild(popup);
        
        // Remove after animation finishes (580ms)
        setTimeout(() => {
            popup.remove();
        }, 580);
    }

    // Shoot web strands from mouse click to closest nodes
    function shootWeb(e) {
        if (loader && !loader.classList.contains("hidden")) return;
        
        playThwipSound();
        spawnComicPopup(e);
        
        // Find 4 closest projected nodes
        let distances = [];
        webNodes.forEach((node, index) => {
            let dx = mouseX - node.x;
            let dy = mouseY - node.y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            distances.push({ dist, index });
        });
        
        distances.sort((a,b) => a.dist - b.dist);
        
        const shotNodes = distances.slice(0, 4);
        shotNodes.forEach(item => {
            let node = webNodes[item.index];
            
            // Elastic web pull forces: pull 3D coordinate towards mouse offset
            // Determine projected direction delta
            let dx = (mouseX - (canvasWidth * 0.72)) / node.scale - node.x3D;
            let dy = (mouseY - (canvasHeight * 0.42)) / node.scale - node.y3D;
            
            // Apply high force pulling nodes in
            node.vx += dx * 0.15;
            node.vy += dy * 0.15;
            
            // Add lines to active list to render glowing strings
            activeWebLines.push({
                node: node,
                startX: mouseX,
                startY: mouseY,
                life: 30 // frames
            });
        });
    }
    
    function animateWeb() {
        ctx.fillStyle = "rgba(5, 7, 16, 0.25)";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        
        // Static speed rotation
        let angleX = 0.0006;
        let angleY = 0.0008;
        
        // Update nodes projected space
        webNodes.forEach(node => {
            node.update(angleX, angleY);
            
            // Gravity attraction if mouse is near (Spider-web flex)
            let dx = mouseX - node.x;
            let dy = mouseY - node.y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            
            if (dist < 180) {
                // Gentle pull towards cursor position
                node.vx += (dx / dist) * 0.04;
                node.vy += (dy / dist) * 0.04;
            } else {
                // Re-establish elastic return to initial velocity bounds over time
                node.vx += (Math.random() * 0.02 - 0.01) * 0.2;
                node.vy += (Math.random() * 0.02 - 0.01) * 0.2;
            }
            
            // Clamp speed velocity limits to preserve structure
            node.vx = Math.max(Math.min(node.vx, 3), -3);
            node.vy = Math.max(Math.min(node.vy, 3), -3);
        });
        
        // Draw webs between adjacent nodes
        ctx.strokeStyle = "rgba(0, 240, 255, 0.045)";
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i < webNodes.length; i++) {
            for (let j = i + 1; j < webNodes.length; j++) {
                let dx = webNodes[i].x - webNodes[j].x;
                let dy = webNodes[i].y - webNodes[j].y;
                let dist = Math.sqrt(dx*dx + dy*dy);
                
                if (dist < 110) {
                    ctx.beginPath();
                    ctx.moveTo(webNodes[i].x, webNodes[i].y);
                    ctx.lineTo(webNodes[j].x, webNodes[j].y);
                    ctx.stroke();
                }
            }
        }
        
        // Draw nodes vertices
        webNodes.forEach(node => {
            let dist = Math.sqrt(Math.pow(mouseX - node.x, 2) + Math.pow(mouseY - node.y, 2));
            let fillAlpha = (node.scale * 0.25);
            
            if (dist < 180) {
                ctx.fillStyle = `rgba(255, 0, 60, ${fillAlpha * 2.5 + 0.1})`;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.scale * 1.5, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillStyle = `rgba(0, 240, 255, ${fillAlpha + 0.02})`;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.scale * 1.0, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        
        // Render shot web-lines
        ctx.lineWidth = 1.5;
        activeWebLines.forEach((line, index) => {
            let opacity = line.life / 30;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
            
            ctx.beginPath();
            ctx.moveTo(line.startX, line.startY);
            ctx.lineTo(line.node.x, line.node.y);
            ctx.stroke();
            
            line.life--;
            
            // Remove line when dead
            if (line.life <= 0) {
                activeWebLines.splice(index, 1);
            }
        });
        
        requestAnimationFrame(animateWeb);
    }
    
    window.addEventListener("resize", () => {
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        
        if (footerCanvas) {
            footerWidth = footerCanvas.clientWidth;
            footerHeight = footerCanvas.clientHeight;
            footerCanvas.width = footerWidth;
            footerCanvas.height = footerHeight;
        }
    });

    // ---------------------------------------------------------
    // FOOTER HANGING WEBS ANIMATION
    // ---------------------------------------------------------
    const footerCanvas = document.getElementById("canvasFooter");
    let footerCtx = null;
    let footerWidth = window.innerWidth;
    let footerHeight = 120;
    let footerWebStrands = [];

    class HangingStrand {
        constructor(anchorX, length) {
            this.anchorX = anchorX;
            this.length = length;
            
            // Current position of the hanging tip
            this.x = anchorX;
            this.y = length;
            
            // Original rest position
            this.ox = anchorX;
            this.oy = length;
            
            // Velocities
            this.vx = 0;
            this.vy = 0;
            
            // Phase for natural swaying
            this.phase = Math.random() * Math.PI * 2;
            this.swaySpeed = 0.01 + Math.random() * 0.015;
            this.swayAmount = 5 + Math.random() * 8;
        }
        
        update(mx, my) {
            // Natural swaying motion (wind simulation)
            this.phase += this.swaySpeed;
            let targetX = this.ox + Math.sin(this.phase) * this.swayAmount;
            let targetY = this.oy;
            
            // Elastic spring forces towards rest position
            let k = 0.08;
            let ax = (targetX - this.x) * k;
            let ay = (targetY - this.y) * k;
            
            this.vx += ax;
            this.vy += ay;
            
            // Mouse interaction
            if (mx !== undefined && my !== undefined) {
                let dx = mx - this.x;
                let dy = my - this.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 120) {
                    let force = (120 - dist) / 120;
                    this.vx += (dx / dist) * force * 1.5;
                    this.vy += (dy / dist) * force * 1.5;
                }
            }
            
            // Apply velocities & dampening
            this.vx *= 0.88;
            this.vy *= 0.88;
            this.x += this.vx;
            this.y += this.vy;
        }
    }

    function initFooterCanvas() {
        if (!footerCanvas) return;
        footerCtx = footerCanvas.getContext("2d");
        
        footerWidth = footerCanvas.clientWidth;
        footerHeight = footerCanvas.clientHeight;
        footerCanvas.width = footerWidth;
        footerCanvas.height = footerHeight;
        
        footerWebStrands = [];
        const strandCount = Math.floor(footerWidth / 40);
        for (let i = 0; i <= strandCount; i++) {
            let x = (footerWidth / strandCount) * i;
            let length = 45 + Math.random() * 45;
            footerWebStrands.push(new HangingStrand(x, length));
        }
        
        animateFooterWeb();
    }

    function animateFooterWeb() {
        if (!footerCtx) return;
        footerCtx.clearRect(0, 0, footerWidth, footerHeight);
        
        let rect = footerCanvas.getBoundingClientRect();
        let relativeMX = undefined;
        let relativeMY = undefined;
        
        if (mouseX >= rect.left && mouseX <= rect.right && 
            mouseY >= rect.top - 150 && mouseY <= rect.bottom + 50) {
            relativeMX = mouseX - rect.left;
            relativeMY = mouseY - rect.top;
        }
        
        footerCtx.strokeStyle = "rgba(0, 240, 255, 0.05)";
        footerCtx.lineWidth = 0.5;
        
        for (let i = 0; i < footerWebStrands.length; i++) {
            footerWebStrands[i].update(relativeMX, relativeMY);
        }
        
        footerCtx.beginPath();
        for (let level = 1; level <= 3; level++) {
            let factor = level / 4;
            for (let i = 0; i < footerWebStrands.length - 1; i++) {
                let s1 = footerWebStrands[i];
                let s2 = footerWebStrands[i+1];
                let cx = (s1.x + s2.x) / 2;
                let cy = ((s1.y + s2.y) / 2) * factor + 10;
                
                if (i === 0) {
                    footerCtx.moveTo(s1.x * factor + s1.anchorX * (1 - factor), s1.y * factor);
                }
                footerCtx.quadraticCurveTo(cx, cy, s2.x * factor + s2.anchorX * (1 - factor), s2.y * factor);
            }
        }
        footerCtx.stroke();
        
        footerCtx.strokeStyle = "rgba(255, 0, 60, 0.15)";
        footerCtx.lineWidth = 1.0;
        
        for (let i = 0; i < footerWebStrands.length; i++) {
            let strand = footerWebStrands[i];
            
            footerCtx.beginPath();
            footerCtx.moveTo(strand.anchorX, 0);
            footerCtx.lineTo(strand.x, strand.y);
            footerCtx.stroke();
            
            let alpha = 0.15 + (1 - Math.min(Math.abs(strand.vx), 2) / 2) * 0.2;
            footerCtx.fillStyle = `rgba(0, 240, 255, ${alpha})`;
            footerCtx.beginPath();
            footerCtx.arc(strand.x, strand.y, 2, 0, Math.PI * 2);
            footerCtx.fill();
        }
        
        requestAnimationFrame(animateFooterWeb);
    }

    // ---------------------------------------------------------
    // SCROLL ANIMATIONS (INTERSECTION OBSERVER)
    // ---------------------------------------------------------
    function setupScrollObservers() {
        const revealElements = document.querySelectorAll(".project-row, .vision-text-side, .timeline-node, .cap-column, .connect-layout");
        revealElements.forEach(el => el.classList.add("scroll-reveal"));
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -40px 0px"
        });
        
        revealElements.forEach(el => observer.observe(el));
    }

    // ---------------------------------------------------------
    // PROJECT DETAIL MODAL CONTROL
    // ---------------------------------------------------------
    projectRows.forEach(row => {
        row.addEventListener("click", () => {
            const projectId = row.dataset.project;
            const data = PROJECTS_DATA[projectId];
            
            if (data) {
                // Populate Modal Elements
                modalImg.src = data.image;
                modalImg.alt = data.name;
                modalCategory.textContent = data.category;
                modalName.textContent = data.name;
                modalLongDesc.textContent = data.longDesc;
                modalGoal.textContent = data.goal;
                modalStack.textContent = data.stack;
                
                // Show modal & stop body scroll
                projectModal.classList.add("active");
                document.body.classList.add("no-scroll");
            }
        });
    });
    
    function closeModal() {
        projectModal.classList.remove("active");
        document.body.classList.remove("no-scroll");
    }
    
    modalCloseBtn.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", closeModal);
    
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && projectModal.classList.contains("active")) {
            closeModal();
        }
    });

    // ---------------------------------------------------------
    // FORM SUBMISSION & BACKEND ROUTING (varmavasam5@gmail.com)
    // ---------------------------------------------------------
    const contactForm = document.getElementById("contactForm");
    
    function showCyberAlert(title, text) {
        const existing = document.querySelector(".cyber-alert-box");
        if (existing) existing.remove();
        
        const alertBox = document.createElement("div");
        alertBox.className = "cyber-alert-box";
        alertBox.innerHTML = `
            <div class="cyber-alert-header">
                <span class="cyber-alert-dot"></span>
                <span class="cyber-alert-title">${title}</span>
            </div>
            <div class="cyber-alert-body">${text}</div>
        `;
        document.body.appendChild(alertBox);
        
        setTimeout(() => {
            alertBox.classList.add("fade-out");
            setTimeout(() => alertBox.remove(), 600);
        }, 4000);
    }

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector(".submit-action-btn");
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = "<span>TRANSMITTING SIGNAL...</span>";
            submitBtn.disabled = true;
            
            const formData = new FormData(contactForm);
            
            fetch("https://formsubmit.co/ajax/varmavasam5@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(formData))
            })
            .then(response => response.json())
            .then(data => {
                if (data.success === "true" || data.success === true) {
                    showCyberAlert("TRANSMISSION SECURED", "Your message packet has been routed to Rakesh. Confirmation link sent if this is the first ping.");
                    contactForm.reset();
                } else {
                    showCyberAlert("TRANSMISSION ERROR", "Failed to route packet. Please check your inputs.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                showCyberAlert("TRANSMISSION FAILED", "Signal connection lost. Please retry.");
            })
            .finally(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }
});
