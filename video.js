const WHATSAPP_NUMBER = '918005564525';
const video = document.getElementById('journeyVideo');
const videoThumbnail = document.querySelector('.video-thumbnail');
const watchButton = document.getElementById('watchButton');
const skipButton = document.getElementById('skipButton');
const timerNote = document.getElementById('timerNote');
const interestActions = document.getElementById('interestActions');
const watchedModal = document.getElementById('watchedModal');
const watchedNo = document.getElementById('watchedNo');
const watchedYes = document.getElementById('watchedYes');
let revealTimer;

function getRegistrationDetails() {
  try {
    const registration = JSON.parse(sessionStorage.getItem('webinarRegistration') || '{}');
    return [
      'Webinar Registration',
      `Name: ${registration.name || ''}`,
      `Mobile: ${registration.phone || ''}`,
      `Age: ${registration.age || ''}`,
      `Email: ${registration.email || ''}`,
      `Profession: ${registration.profession || ''}`
    ].join('\n');
  } catch {
    return 'Webinar Registration';
  }
}

function openWhatsApp(message) {
  window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

watchButton.addEventListener('click', () => {
  video.scrollIntoView({ behavior: 'smooth', block: 'center' });
  video.src = 'https://www.youtube-nocookie.com/embed/tWH1_B8Jekk?autoplay=1&playsinline=1&rel=0';
  video.hidden = false;
  videoThumbnail.hidden = true;
  watchButton.disabled = true;
  timerNote.textContent = 'Video dekhein — 1 minute baad aapke options yahan dikh jayenge.';
  revealTimer = window.setTimeout(() => {
    interestActions.hidden = false;
    timerNote.textContent = 'Ab apna option chunein.';
    interestActions.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 60_000);
});

skipButton.addEventListener('click', () => openWhatsApp(getRegistrationDetails()));
document.getElementById('interestedButton').addEventListener('click', () => {
  watchedModal.hidden = false;
  watchedYes.focus();
});
watchedNo.addEventListener('click', () => {
  watchedModal.hidden = true;
  document.getElementById('interestedButton').focus();
});
watchedYes.addEventListener('click', () => {
  openWhatsApp(`${getRegistrationDetails()}\n\nI'm Interested`);
});
document.getElementById('notInterestedButton').addEventListener('click', () => {
  window.location.href = 'feedback.html';
});

window.addEventListener('pagehide', () => window.clearTimeout(revealTimer));
