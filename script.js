document.addEventListener('DOMContentLoaded', () => {
    let portfolioData = {};

    // --- 1. Fetch and Render Portfolio Data ---
    async function loadPortfolioData() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            portfolioData = await response.json();

            // Once data is loaded, render all sections
            renderHeader();
            renderAbout();
            renderPodcasts();
            renderExperience();
            renderEducation();
            renderProjects();
            renderSkills();
            renderCertifications();
            renderFooter();

            // Initialize chatbot with the new data
            initializeChatbot();

        } catch (error) {
            console.error('Could not load portfolio data:', error);
            // Optionally, display an error message to the user
        }
    }

    // --- 2. Renderer Functions ---
    function renderHeader() {
        document.getElementById('user-name').textContent = portfolioData.name;
        document.getElementById('user-tagline').textContent = portfolioData.tagline;
        document.getElementById('user-contact').innerHTML = `📧 <a href="mailto:${portfolioData.email}">${portfolioData.email}</a> | 📱 ${portfolioData.phone}`;
        const socialLinksContainer = document.getElementById('social-links-container');
        socialLinksContainer.innerHTML = portfolioData.socialLinks.map(link => `<a href="${link.url}" target="_blank">${link.name}</a>`).join('');
    }

    function renderAbout() {
        document.getElementById('quote').textContent = portfolioData.about.quote;
        document.getElementById('bio').innerHTML = portfolioData.about.bio;
    }

    function renderPodcasts() {
        const card = document.getElementById('podcast-card');
        card.innerHTML = `
            <h3>${portfolioData.podcasts.title}</h3>
            <p>${portfolioData.podcasts.description}</p>
            <a href="${portfolioData.podcasts.link}" target="_blank">Watch on YouTube</a>
        `;
    }

    function renderExperience() {
        const container = document.getElementById('experience-container');
        let html = '';
        portfolioData.experience.forEach(job => {
            html += `
                <div class="job">
                    <h3>${job.title}</h3>
                    <ul>
                        ${job.points.map(point => `<li>${point}</li>`).join('')}
                    </ul>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    function renderEducation() {
        const container = document.getElementById('education-container');
        let html = '';
        portfolioData.education.forEach(edu => {
            html += `
                <div class="education-item">
                    <h3>${edu.institution}</h3>
                    <p>${edu.details}</p>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    function renderProjects() {
        const grid = document.getElementById('projects-grid');
        let html = '';
        portfolioData.projects.forEach(project => {
            html += `
                <div class="project-card">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <a href="${project.link}" target="_blank">View on GitHub</a>
                </div>
            `;
        });
        grid.innerHTML = html;
    }

    function renderSkills() {
        const container = document.getElementById('skills-container');
        container.innerHTML = portfolioData.skills.map(skill => `<span>${skill}</span>`).join('');
    }

    function renderCertifications() {
        const container = document.getElementById('certifications-container');
        container.innerHTML = portfolioData.certifications.map(cert => `<p>${cert}</p>`).join('');
    }

    function renderFooter() {
        document.getElementById('fun-fact').textContent = portfolioData.funFact;
    }


    // --- 3. Chatbot Logic (Now Initialized After Data Load) ---
    function initializeChatbot() {
        const chatbotIcon = document.getElementById('chatbot-icon');
        chatbotIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="36px" height="36px"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`;
        const chatbotWindow = document.getElementById('chatbot-window');
        const chatbotClose = document.getElementById('chatbot-close');
        const chatbotSend = document.getElementById('chatbot-send');
        const chatbotInput = document.getElementById('chatbot-input');
        const chatbotMessages = document.getElementById('chatbot-messages');

        // Clean, structured data for the chatbot
        const chatbotData = {
            experience: `Aditya has worked as a Graduate Assistant at Felician University, a Contributor for Google Summer of Code, and ran his own Home Automation Business. Would you like to know more about a specific role?`,
            education: `Aditya has a Master's in Computer Science from Felician University and a Bachelor's in Computer Science from MIT Pune.`,
            projects: `Aditya has worked on many projects, including Breast Cancer Detection, a GPT from scratch, and an Autonomous Driving agent. The full list is on the portfolio.`,
            skills: `His skills include Python, C++, PyTorch, TensorFlow, Docker, and Linux.`,
            contact: `You can contact Aditya at ${portfolioData.email} or connect via the social links.`
        };

        const greetings = ['hello', 'hi', 'hey', 'greetings'];
        const farewells = ['bye', 'goodbye', 'see ya'];

        chatbotIcon.addEventListener('click', () => {
            chatbotWindow.style.display = 'flex';
            chatbotIcon.style.display = 'none';
            if (chatbotMessages.children.length === 0) {
                 addBotMessage("Hello! I'm Aditya's resume bot. Ask me about his experience, projects, or skills.");
            }
        });

        chatbotClose.addEventListener('click', () => {
            chatbotWindow.style.display = 'none';
            chatbotIcon.style.display = 'block';
        });

        chatbotSend.addEventListener('click', handleUserMessage);
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleUserMessage();
        });

        function handleUserMessage() {
            const message = chatbotInput.value.trim();
            if (message) {
                addUserMessage(message);
                chatbotInput.value = '';
                setTimeout(() => generateBotResponse(message), 500);
            }
        }

        function generateBotResponse(userInput) {
            const lowerInput = userInput.toLowerCase();
            let response = "I'm not sure how to answer that. Try asking about experience, education, projects, skills, or contact info.";

            if (greetings.some(g => lowerInput.includes(g))) {
                response = "Hello! How can I help you learn more about Aditya's resume?";
            } else if (farewells.some(f => lowerInput.includes(f))) {
                response = "Goodbye! Have a great day.";
            } else if (lowerInput.includes('experience') || lowerInput.includes('work') || lowerInput.includes('job')) {
                response = chatbotData.experience;
            } else if (lowerInput.includes('education') || lowerInput.includes('school') || lowerInput.includes('degree')) {
                response = chatbotData.education;
            } else if (lowerInput.includes('project')) {
                response = chatbotData.projects;
            } else if (lowerInput.includes('skill') || lowerInput.includes('tool') || lowerInput.includes('language')) {
                response = chatbotData.skills;
            } else if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('connect')) {
                response = chatbotData.contact;
            } else if (lowerInput.includes('about') || lowerInput.includes('who')) {
                response = portfolioData.about.bio;
            }

            addBotMessage(response);
        }

        function addUserMessage(message) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', 'user-message');
            messageElement.innerText = message;
            chatbotMessages.appendChild(messageElement);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }

        function addBotMessage(message) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', 'bot-message');
            messageElement.innerText = message;
            chatbotMessages.appendChild(messageElement);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
    }


    // --- 4. Fetch Medium Articles ---
    async function fetchMediumArticles() {
        const articlesSection = document.getElementById('articles');
        const articlesGrid = document.getElementById('articles-grid');
        if (!articlesGrid || !articlesSection) return;

        const rssUrl = 'https://medium.com/feed/@inamdaraditya98';

        try {
            const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();

            if (data.status === 'ok' && data.items.length > 0) {
                const articles = data.items.slice(0, 3);
                let articlesHTML = '';
                articles.forEach(item => {
                    articlesHTML += `
                        <div class="project-card">
                            <h3>${item.title}</h3>
                            <a href="${item.link}" target="_blank">Read on Medium</a>
                        </div>
                    `;
                });
                articlesGrid.innerHTML = articlesHTML;
                articlesSection.style.display = 'block'; // Show the section
            } else {
                articlesSection.style.display = 'none'; // Hide if no articles
            }
        } catch (error) {
            console.error('Error fetching Medium articles:', error);
            articlesSection.style.display = 'none'; // Hide on error
        }
    }

    // --- Initial Load ---
    loadPortfolioData();
    fetchMediumArticles();
});
