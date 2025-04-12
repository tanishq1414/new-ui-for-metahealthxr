// Simulate data from smartwatch
function simulateSmartwatchData() {
    // Heart Rate (60-100 is normal)
    const heartRate = Math.floor(Math.random() * 40) + 80;
    document.getElementById('heartRate').textContent = heartRate;
    
    // SpO2 (95-100% is normal)
    const spo2 = Math.floor(Math.random() * 3) + 97;
    document.getElementById('spo2').textContent = spo2 + '%';
    
    // Blood Pressure (120/80 is normal)
    const systolic = Math.floor(Math.random() * 30) + 110;
    const diastolic = Math.floor(Math.random() * 20) + 70;
    document.getElementById('bloodPressure').textContent = systolic + '/' + diastolic;
    
    // Stress Level (1-100 scale)
    const stress = Math.floor(Math.random() * 30) + 60;
    document.getElementById('stressLevel').textContent = stress;
    
    // Check for emergency conditions
    if (heartRate > 120 || spo2 < 92 || systolic > 140 || diastolic > 90 || stress > 80) {
        document.getElementById('emergencyAlert').style.display = 'flex';
        
        // Trigger emergency notification sound
        const emergencySound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
        emergencySound.loop = true;
        emergencySound.play();
        
        // After 10 seconds, stop the sound
        setTimeout(() => {
            emergencySound.pause();
        }, 10000);
    } else {
        document.getElementById('emergencyAlert').style.display = 'none';
    }
    
    // Update trends
    updateTrendIndicators(heartRate, spo2, systolic, diastolic, stress);
}

function updateTrendIndicators(hr, spo2, systolic, diastolic, stress) {
    // This would normally compare with previous data
    // For demo, we'll just randomly show trends
    const trends = document.querySelectorAll('.stat-trend');
    
    trends[0].innerHTML = hr > 90 ? 
        '<i class="fas fa-arrow-up trend-up"></i><span>Higher than usual</span>' : 
        '<i class="fas fa-arrow-down trend-down"></i><span>Normal range</span>';
        
    trends[1].innerHTML = spo2 < 95 ? 
        '<i class="fas fa-arrow-up trend-up"></i><span>Lower than usual</span>' : 
        '<i class="fas fa-arrow-down trend-down"></i><span>Normal range</span>';
        
    trends[2].innerHTML = systolic > 130 || diastolic > 85 ? 
        '<i class="fas fa-arrow-up trend-up"></i><span>Slightly elevated</span>' : 
        '<i class="fas fa-arrow-down trend-down"></i><span>Normal range</span>';
        
    trends[3].innerHTML = stress > 70 ? 
        '<i class="fas fa-arrow-up trend-up"></i><span>High stress detected</span>' : 
        '<i class="fas fa-arrow-down trend-down"></i><span>Normal range</span>';
}

// Chat functionality
document.getElementById('sendMessage').addEventListener('click', function() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message) {
        // Add user message
        const chatMessages = document.getElementById('chatMessages');
        const userMsg = document.createElement('div');
        userMsg.className = 'message user-message';
        userMsg.textContent = message;
        chatMessages.appendChild(userMsg);
        
        // Clear input
        input.value = '';
        
        // Simulate AI response after a delay
        setTimeout(() => {
            const responses = [
                "I understand your concern. Let me check your vitals...",
                "Based on your current readings, I recommend taking a short break and hydrating.",
                "Would you like me to guide you through a quick breathing exercise?",
                "Your stress levels are elevated. Try some deep breathing for 2 minutes.",
                "I notice your heart rate is slightly high. Have you been active recently?"
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            const aiMsg = document.createElement('div');
            aiMsg.className = 'message ai-message';
            aiMsg.textContent = randomResponse;
            chatMessages.appendChild(aiMsg);
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});

// Allow pressing Enter to send message
document.getElementById('chatInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('sendMessage').click();
    }
});

// Initialize with simulated data
simulateSmartwatchData();

// Update data every 5 seconds
setInterval(simulateSmartwatchData, 5000);