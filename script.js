let spinsLeft = 0;
let balanceAmount = 0;
let adTimerActive = false; // New variable to track ad timer status

function showSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => section.style.display = 'none');

  // Show the selected section
  document.getElementById(sectionId).style.display = 'block';
}

function toggleMenu() {
  const dropdown = document.getElementById('dropdown-content');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function earnSpin() {
  if (!adTimerActive) {
    // Open the ad link in a new window
    window.open('https://www.highratecpm.com/f94869hc?key=a77153ce47bb2ce92dce68f21cd3163b', '_blank');
    
    spinsLeft += 5;
    balanceAmount += 10; // Add points to balance when earning spins
    document.getElementById('spins-left').textContent = spinsLeft;
    document.getElementById('balance-amount').textContent = balanceAmount; // Update balance display
    document.getElementById('spin-nav-button').disabled = true; // Disable Spin button during ad watch
    showSection('ad-watch');
    startAdTimer();
  } else {
    alert('You are already watching an ad.');
  }
}

function startAdTimer() {
  adTimerActive = true; // Set ad timer status to active
  const adTimer = document.getElementById('ad-timer');
  adTimer.style.display = 'block';
  let timeLeft = 30;
  document.getElementById('time-left').textContent = timeLeft;
  const timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('time-left').textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      adTimer.style.display = 'none';
      adTimerActive = false; // Set ad timer status to inactive
      document.getElementById('spin-nav-button').disabled = false; // Enable Spin button
      alert('Ad has ended! You can now spin the wheel.');
    }
  }, 1000);
}

function spinWheel() {
  if (spinsLeft > 0) {
    spinsLeft--;
    balanceAmount += 5; // Add points to balance for each spin
    document.getElementById('spins-left').textContent = spinsLeft;
    document.getElementById('balance-amount').textContent = balanceAmount; // Update balance display

    const wheel = document.getElementById('wheel');
    const coin = document.getElementById('winning-coin');
    const randomDegree = Math.floor(Math.random() * 360) * 1440; // 1440 to make at least 4 full spins

    // Show the coin and start its animation
    coin.style.display = 'block';
    setTimeout(() => {
      coin.style.animation = 'growAndMove 2s ease-in-out forwards'; // Trigger coin animation
    }, 100); // Short delay to allow wheel rotation start

    wheel.style.transition = 'transform 4s ease-in-out'; // Ensure smooth rotation
    wheel.style.transform = `rotate(${randomDegree}deg)`;

    wheel.addEventListener('transitionend', () => {
      const selectedSegment = Math.floor((randomDegree % 360) / 72) + 1;
      alert(`You landed on number ${selectedSegment}!`);
      // Hide the coin after animation ends
      coin.style.display = 'none';
    }, { once: true });
  } else {
    alert('You have no spins left! Watch an ad to earn more spins.');
  }
}

function editProfile() {
  document.getElementById('profile-username').disabled = false;
  document.getElementById('profile-email').disabled = false;
  document.getElementById('profile-phone').disabled = false;
  document.getElementById('edit-profile').style.display = 'none';
  document.getElementById('save-profile').style.display = 'block';
}

function saveProfile() {
  document.getElementById('profile-username').disabled = true;
  document.getElementById('profile-email').disabled = true;
  document.getElementById('profile-phone').disabled = true;
  document.getElementById('edit-profile').style.display = 'block';
  document.getElementById('save-profile').style.display = 'none';
  alert('Profile saved!');
}

function withdraw(method) {
  const balanceAmount = parseInt(document.getElementById('balance-amount').textContent);
  if (balanceAmount < 100) {
    alert('You need at least 5000 points to withdraw.');
    return;
  }

  if (method === 'bkash') {
    const bkashNumber = document.getElementById('bkash-number').value;
    if (bkashNumber) {
      alert(`Withdrawal request to bkash number ${bkashNumber} is being processed.`);
    } else {
      alert('Please enter your bkash number.');
    }
  } else if (method === 'binance') {
    const binanceAddress = document.getElementById('binance-address').value;
    if (binanceAddress) {
      alert(`Withdrawal request to Binance address ${binanceAddress} is being processed.`);
    } else {
      alert('Please enter your Binance BEP20 address.');
    }
  }
}

function copyReferralCode() {
  const referralCodeInput = document.getElementById('referral-code');
  referralCodeInput.select();
  document.execCommand('copy');
  alert('Referral code copied to clipboard!');
}

function exit() {
  if (confirm('Are you sure you want to exit the game?')) {
    window.close();
  }
}
