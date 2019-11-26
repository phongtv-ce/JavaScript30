const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');
const latitude = document.querySelector('.latitude');
const longitude = document.querySelector('.longitude');

navigator.geolocation.watchPosition((data) => {
  console.log(data);
  speed.textContent = data.coords.speed;
  latitude.textContent = data.coords.latitude.toFixed(6);
  longitude.textContent = data.coords.longitude.toFixed(6);
  arrow.style.transform = `rotate(${data.coords.heading}deg)`;
}, (err) => {
  console.error(err);
});