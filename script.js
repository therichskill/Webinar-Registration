const registrationForm = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');
const countdown = document.getElementById('countdown');
let remainingSeconds = 34 * 60 + 43;

setInterval(() => {
  remainingSeconds = remainingSeconds > 0 ? remainingSeconds - 1 : 34 * 60 + 43;
  const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, '0');
  const seconds = String(remainingSeconds % 60).padStart(2, '0');
  countdown.textContent = `${minutes}:${seconds}`;
}, 1000);

registrationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!registrationForm.reportValidity()) return;

  const formData = new FormData(registrationForm);
  const registration = Object.fromEntries(formData.entries());
  sessionStorage.setItem('webinarRegistration', JSON.stringify(registration));
  window.location.href = 'video.html';
});
