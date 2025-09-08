document.addEventListener('DOMContentLoaded', () => {
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessages = document.getElementById('chatbot-messages');

    // --- Data for the chatbot ---
    const resumeData = {
        about: document.getElementById('about')?.innerText || "I'm a tech enthusiast passionate about AI and Machine Learning.",
        experience: document.getElementById('experience')?.innerText || "I have experience as a Graduate Assistant, a GSoC contributor, and have run my own home automation business.",
        education: document.getElementById('education')?.innerText || "I have a Master's in Computer Science from Felician University and a Bachelor's from MIT Pune.",
        projects: "I've worked on several projects, including a Breast Cancer Detection model, a GPT from scratch, a Home Automation System, and more. You can see the full list on my portfolio.",
        skills: document.getElementById('skills')?.innerText || "I'm skilled in Python, C++, PyTorch, TensorFlow, Docker, and Linux.",
        contact: "You can reach me at adityainamdar74@gmail.com or connect with me on LinkedIn. All my links are on the page.",
        default: "I'm not sure how to answer that. Try asking about my experience, education, projects, skills, or how to contact me."
    };

    const greetings = ['hello', 'hi', 'hey', 'greetings'];
    const farewells = ['bye', 'goodbye', 'see ya'];

    // --- Chatbot UI Logic ---
    chatbotIcon.addEventListener('click', () => {
        chatbotWindow.style.display = 'flex';
        chatbotIcon.style.display = 'none';
        addBotMessage("Hello! I'm Aditya's resume bot. Ask me anything about his experience, projects, or skills.");
    });

    chatbotClose.addEventListener('click', () => {
        chatbotWindow.style.display = 'none';
        chatbotIcon.style.display = 'block';
    });

    chatbotSend.addEventListener('click', handleUserMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });

    // --- Chatbot Core Logic ---
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
        let response = resumeData.default;

        if (greetings.some(g => lowerInput.includes(g))) {
            response = "Hello! How can I help you learn more about Aditya's resume?";
        } else if (farewells.some(f => lowerInput.includes(f))) {
            response = "Goodbye! Have a great day.";
        } else if (lowerInput.includes('experience') || lowerInput.includes('work') || lowerInput.includes('job')) {
            response = resumeData.experience;
        } else if (lowerInput.includes('education') || lowerInput.includes('school') || lowerInput.includes('degree')) {
            response = resumeData.education;
        } else if (lowerInput.includes('project')) {
            response = resumeData.projects;
        } else if (lowerInput.includes('skill') || lowerInput.includes('tool') || lowerInput.includes('language')) {
            response = resumeData.skills;
        } else if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('connect')) {
            response = resumeData.contact;
        } else if (lowerInput.includes('about') || lowerInput.includes('who are you')) {
            response = resumeData.about;
        }

        addBotMessage(response);
    }

    // --- Helper functions to add messages to the UI ---
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
});
