// AI Companion Chatbot
const aiCompanionBtn = document.getElementById('aiCompanionBtn');
const aiChatbot = document.getElementById('aiChatbot');
const closeChatbot = document.getElementById('closeChatbot');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const sendChatbotMessage = document.getElementById('sendChatbotMessage');

// Smartwatch Connection
const connectWatchBtn = document.getElementById('connectWatch');
const connectionStatus = document.getElementById('connectionStatus');
const deviceFeatures = document.getElementById('deviceFeatures');

// Emergency Modal
const emergencyModal = document.getElementById('emergencyModal');
const closeEmergencyModal = document.getElementById('closeEmergencyModal');
const emergencyModalText = document.getElementById('emergencyModalText');

// Threshold Settings
const hrThreshold = document.getElementById('hrThreshold');
const hrThresholdValue = document.getElementById('hrThresholdValue');
const spo2Threshold = document.getElementById('spo2Threshold');
const spo2ThresholdValue = document.getElementById('spo2ThresholdValue');
const stressThreshold = document.getElementById('stressThreshold');
const stressThresholdValue = document.getElementById('stressThresholdValue');

// Monitoring Bar
const monitoringBar = document.getElementById('monitoringBar');
const emergencyAlertBtn = document.getElementById('emergencyAlertBtn');

// Vital Display Elements
const liveHeartRate = document.getElementById('liveHeartRate');
const liveSpO2 = document.getElementById('liveSpO2');
const liveBP = document.getElementById('liveBP');
const liveStress = document.getElementById('liveStress');
const heartRateStatus = document.getElementById('heartRateStatus');
const spO2Status = document.getElementById('spO2Status');
const bpStatus = document.getElementById('bpStatus');
const stressStatus = document.getElementById('stressStatus');
const monitorHR = document.getElementById('monitorHR');
const monitorSpO2 = document.getElementById('monitorSpO2');
const monitorStress = document.getElementById('monitorStress');

// State variables
let emergencyAlertActive = false;
let isWatchConnected = false;
let currentHeartRate = 72;
let currentSpO2 = 98;
let currentStress = 4;
let currentBP = '120/80';
let dataInterval;

// Initialize event listeners
function initEventListeners() {
    // AI Companion
    aiCompanionBtn.addEventListener('click', toggleChatbot);
    closeChatbot.addEventListener('click', toggleChatbot);
    sendChatbotMessage.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Smartwatch Connection
    connectWatchBtn.addEventListener('click', toggleWatchConnection);

    // Emergency Modal
    closeEmergencyModal.addEventListener('click', closeModal);
    emergencyAlertBtn.addEventListener('click', () => {
        emergencyModal.style.display = 'flex';
    });

    // Threshold Settings
    hrThreshold.addEventListener('input', updateThresholds);
    spo2Threshold.addEventListener('input', updateThresholds);
    stressThreshold.addEventListener('input', updateThresholds);
}

// Toggle AI Chatbot visibility
function toggleChatbot() {
    aiChatbot.style.display = aiChatbot.style.display === 'flex' ? 'none' : 'flex';
    if (aiChatbot.style.display === 'flex') {
        chatbotInput.focus();
    }
}

// Send message to AI chatbot
function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatbotInput.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const responses = getAIResponse(message);
            addMessage(responses);
        }, 1000);
    }
}

// Add message to chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    messageDiv.textContent = text;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Generate AI response based on message and current vitals
function getAIResponse(message) {
    const lowerMsg = message.toLowerCase();
    const emergencyKeywords = ['emergency', 'help', 'not feeling well', 'unwell', 'critical'];
    const isEmergency = emergencyKeywords.some(keyword => lowerMsg.includes(keyword));
    
    if (isEmergency) {
        return "I've detected you might need urgent help. I'm alerting your emergency contacts and preparing assistance. Please stay calm.";
    }
    
    if (lowerMsg.includes('heart') || lowerMsg.includes('rate') || lowerMsg.includes('bpm')) {
        return `Your current heart rate is ${currentHeartRate} BPM. ${currentHeartRate > 100 ? 
            'This is slightly elevated. Try deep breathing exercises.' : 
            'This is within normal range.'}`;
    }
    
    if (lowerMsg.includes('oxygen') || lowerMsg.includes('spo2')) {
        return `Your blood oxygen level is ${currentSpO2}%. ${currentSpO2 < 95 ? 
            'This is slightly low. Consider checking your breathing.' : 
            'This is within healthy range.'}`;
    }
    
    if (lowerMsg.includes('stress') || lowerMsg.includes('anxious')) {
        return `Your stress level is ${currentStress}/10. ${currentStress > 6 ? 
            'You seem stressed. Would you like a guided meditation?' : 
            'You seem relaxed. Keep it up!'}`;
    }
    
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
        return "Hello! I'm your MetaHealthXR AI Companion. How can I help you today?";
    }
    
    const genericResponses = [
        "I understand your concern. Let me check your vitals...",
        "Based on your current readings, I recommend taking deep breaths.",
        "Would you like me to guide you through a quick relaxation exercise?",
        "I notice your stress levels are higher than usual. Let's work on calming techniques.",
        "Your health metrics are being monitored continuously for your safety."
    ];
    
    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
}

// Toggle smartwatch connection
function toggleWatchConnection() {
    if (isWatchConnected) {
        disconnectWatch();
    } else {
        connectWatch();
    }
}

// Connect to smartwatch
function connectWatch() {
    connectWatchBtn.innerHTML = '<span class="watch-icon">⏳</span><span>Connecting...</span>';
    
    // Simulate connection process
    setTimeout(() => {
        connectionStatus.innerHTML = `
            <div style="display: flex; align-items: center; background-color: #e8f5e9; padding: 1rem; border-radius: 8px;">
                <div style="width: 15px; height: 15px; border-radius: 50%; background-color: #4caf50; margin-right: 10px;"></div>
                <span>Connected to Apple Watch</span>
            </div>
        `;
        connectWatchBtn.innerHTML = '<span class="watch-icon">✅</span><span>Connected</span>';
        deviceFeatures.style.display = 'block';
        isWatchConnected = true;
        
        // Start simulated data updates
        startDataSimulation();
    }, 2000);
}

// Disconnect smartwatch
function disconnectWatch() {
    clearInterval(dataInterval);
    connectionStatus.innerHTML = `
        <div style="display: flex; align-items: center; background-color: #f5f5f5; padding: 1rem; border-radius: 8px;">
            <div style="width: 15px; height: 15px; border-radius: 50%; background-color: #ccc; margin-right: 10px;"></div>
            <span>Not connected</span>
        </div>
    `;
    connectWatchBtn.innerHTML = '<span class="watch-icon">⌚</span><span>Connect Device</span>';
    deviceFeatures.style.display = 'none';
    isWatchConnected = false;
    
    // Reset displayed values
    updateVitals('--', '--', '--', '--');
    monitorHR.textContent = '--';
    monitorSpO2.textContent = '--';
    monitorStress.textContent = '--';
}

// Start simulated data updates
function startDataSimulation() {
    // Initial values
    currentHeartRate = 72;
    currentSpO2 = 98;
    currentStress = 4;
    currentBP = '120/80';
    
    // Update dashboard
    updateVitals(currentHeartRate, currentSpO2, currentBP, currentStress);
    
    // Simulate changing data
    dataInterval = setInterval(() => {
        // Random small fluctuations
        currentHeartRate += Math.floor(Math.random() * 5) - 2;
        currentSpO2 += Math.floor(Math.random() * 3) - 1;
        currentStress += Math.floor(Math.random() * 3) - 1;
        
        // Ensure values stay within possible ranges
        currentHeartRate = Math.max(60, Math.min(currentHeartRate, 120));
        currentSpO2 = Math.max(90, Math.min(currentSpO2, 100));
        currentStress = Math.max(1, Math.min(currentStress, 10));
        
        // Occasionally simulate abnormal readings (10% chance)
        if (Math.random() > 0.9) {
            currentHeartRate = Math.random() > 0.5 ? 150 : 50;
            currentSpO2 = Math.random() > 0.5 ? 85 : currentSpO2;
            currentStress = 9;
            currentBP = Math.random() > 0.5 ? '160/100' : '90/60';
        } else {
            currentBP = `${120 + Math.floor(Math.random() * 10) - 5}/${80 + Math.floor(Math.random() * 10) - 5}`;
        }
        
        updateVitals(currentHeartRate, currentSpO2, currentBP, currentStress);
        checkForEmergency(currentHeartRate, currentSpO2, currentStress);
    }, 3000);
}

// Update all vital displays
function updateVitals(hr, spo2, bp, stress) {
    // Update dashboard
    liveHeartRate.textContent = hr;
    liveSpO2.textContent = spo2;
    liveBP.textContent = bp;
    liveStress.textContent = stress;
    
    // Update monitoring bar
    if (hr !== '--') monitorHR.textContent = hr;
    if (spo2 !== '--') monitorSpO2.textContent = spo2;
    if (stress !== '--') monitorStress.textContent = stress;
    
    // Update status indicators
    updateStatus('heartRateStatus', hr, 60, 100);
    updateStatus('spO2Status', spo2, 95, 100, true);
    updateStatus('stressStatus', stress, 1, 7);
}

// Update status indicator for a vital
function updateStatus(elementId, value, min, max, reverse = false) {
    if (value === '--') {
        document.getElementById(elementId).className = 'vital-status';
        document.getElementById(elementId).textContent = '--';
        return;
    }
    
    const element = document.getElementById(elementId);
    
    if ((!reverse && (value < min || value > max)) || (reverse && value < min)) {
        element.className = 'vital-status status-alert';
        element.textContent = 'Critical';
    } else if ((!reverse && (value < min + 5 || value > max - 5)) || (reverse && value < min + 5)) {
        element.className = 'vital-status status-warning';
        element.textContent = 'Warning';
    } else {
        element.className = 'vital-status status-safe';
        element.textContent = 'Normal';
    }
}

// Check if vitals exceed thresholds and trigger emergency if needed
function checkForEmergency(hr, spo2, stress) {
    if (hr === '--' || spo2 === '--' || stress === '--') return;
    
    const hrThresholdValue = parseInt(hrThreshold.value);
    const spo2ThresholdValue = parseInt(spo2Threshold.value);
    const stressThresholdValue = parseInt(stressThreshold.value);
    
    if (hr > hrThresholdValue || spo2 < spo2ThresholdValue || stress >= stressThresholdValue) {
        if (!emergencyAlertActive) {
            emergencyAlertActive = true;
            monitoringBar.classList.add('alert');
            emergencyAlertBtn.style.display = 'flex';
            
            // Prepare emergency message
            let emergencyReasons = [];
            if (hr > hrThresholdValue) emergencyReasons.push(`high heart rate (${hr}bpm > ${hrThresholdValue}bpm)`);
            if (spo2 < spo2ThresholdValue) emergencyReasons.push(`low SpO2 (${spo2}% < ${spo2ThresholdValue}%)`);
            if (stress >= stressThresholdValue) emergencyReasons.push(`high stress level (${stress}/10 >= ${stressThresholdValue}/10)`);
            
            emergencyModalText.textContent = `Your ${emergencyReasons.join(' and ')} indicate a potential medical emergency. Please remain calm and take appropriate action.`;
            
            // Show modal after 2 seconds
            setTimeout(() => {
                emergencyModal.style.display = 'flex';
            }, 2000);
        }
    } else {
        emergencyAlertActive = false;
        monitoringBar.classList.remove('alert');
        emergencyAlertBtn.style.display = 'none';
    }
}

// Update threshold display values
function updateThresholds() {
    hrThresholdValue.textContent = hrThreshold.value;
    spo2ThresholdValue.textContent = spo2Threshold.value;
    stressThresholdValue.textContent = stressThreshold.value;
}

// Close emergency modal
function closeModal() {
    emergencyModal.style.display = 'none';
    monitoringBar.classList.remove('alert');
}

// Initialize the app
function init() {
    initEventListeners();
    updateThresholds();
    
    // Initial AI greeting after 3 seconds
    setTimeout(() => {
        addMessage("Welcome to MetaHealthXR! I'm your AI health companion. I can help you understand your health metrics, guide you through the app, and alert you to any concerning changes in your vitals.");
    }, 3000);
}

// Start the application
document.addEventListener('DOMContentLoaded', init);