(() => {
  const display = document.getElementById('display');
  const status = document.getElementById('status');
  const startPause = document.getElementById('startPause');
  const resetBtn = document.getElementById('reset');
  const plusOne = document.getElementById('plusOne');
  const customMinutes = document.getElementById('customMinutes');
  const setCustom = document.getElementById('setCustom');
  const ring = document.getElementById('ringProgress');
  const shell = document.querySelector('.timer-shell');

  const radius = 94;
  const circumference = 2 * Math.PI * radius;
  ring.style.strokeDasharray = String(circumference);
  ring.style.strokeDashoffset = '0';

  let initialSeconds = 15 * 60;
  let remainingSeconds = initialSeconds;
  let endAt = null;
  let timerId = null;
  let running = false;

  function clampMinutes(value) {
    const n = Number(value);
    if (!Number.isFinite(n)) return 15;
    return Math.min(180, Math.max(1, Math.round(n)));
  }

  function format(seconds) {
    const safe = Math.max(0, Math.floor(seconds));
    const m = Math.floor(safe / 60);
    const s = safe % 60;
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }

  function setVisualState() {
    shell.classList.remove('warning','danger','done');
    if (remainingSeconds <= 0) shell.classList.add('done');
    else if (remainingSeconds <= 60) shell.classList.add('danger');
    else if (remainingSeconds <= 5 * 60) shell.classList.add('warning');
  }

  function render() {
    display.textContent = format(remainingSeconds);
    const ratio = initialSeconds > 0 ? remainingSeconds / initialSeconds : 0;
    ring.style.strokeDashoffset = String(circumference * (1 - Math.max(0, Math.min(1, ratio))));
    setVisualState();
  }

  function stopInterval() {
    if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function tick() {
    if (!running || endAt === null) return;
    remainingSeconds = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
    render();
    if (remainingSeconds <= 0) {
      running = false;
      endAt = null;
      stopInterval();
      startPause.textContent = 'Start';
      status.textContent = 'Time';
    }
  }

  function setMinutes(minutes) {
    const m = clampMinutes(minutes);
    running = false;
    stopInterval();
    initialSeconds = m * 60;
    remainingSeconds = initialSeconds;
    endAt = null;
    customMinutes.value = String(m);
    startPause.textContent = 'Start';
    status.textContent = `Set to ${m} min`;
    render();
  }

  function start() {
    if (remainingSeconds <= 0) remainingSeconds = initialSeconds;
    running = true;
    endAt = Date.now() + remainingSeconds * 1000;
    startPause.textContent = 'Pause';
    status.textContent = 'Running';
    stopInterval();
    timerId = setInterval(tick, 250);
    tick();
  }

  function pause() {
    tick();
    running = false;
    endAt = null;
    stopInterval();
    startPause.textContent = 'Resume';
    status.textContent = 'Paused';
  }

  startPause.addEventListener('click', () => running ? pause() : start());
  resetBtn.addEventListener('click', () => setMinutes(initialSeconds / 60));
  plusOne.addEventListener('click', () => {
    remainingSeconds += 60;
    initialSeconds += 60;
    if (running) endAt = Date.now() + remainingSeconds * 1000;
    status.textContent = '+1 minute';
    render();
  });
  setCustom.addEventListener('click', () => setMinutes(customMinutes.value));
  customMinutes.addEventListener('keydown', (e) => { if (e.key === 'Enter') setMinutes(customMinutes.value); });
  document.querySelectorAll('.preset').forEach(btn => btn.addEventListener('click', () => setMinutes(btn.dataset.minutes)));

  setMinutes(15);
})();
