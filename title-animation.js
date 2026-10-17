(() => {
  const title = document.querySelector('#project-title');
  if (!title || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const phrases = ['Playful Data', 'Play Dataful', 'Fuldata Play', 'A Fat Duly Pal', 'A Fully Adapt'];
  const signature = text => [...text.toLowerCase()].filter(c => c !== ' ').sort().join('');
  if (!phrases.every(text => signature(text) === signature(phrases[0]))) return;

  title.setAttribute('aria-label', phrases[0]);
  title.textContent = '';
  const stage = document.createElement('span');
  stage.className = 'title-stage';
  stage.setAttribute('aria-hidden', 'true');
  title.append(stage);
  const letters = [...phrases[0]].filter(c => c !== ' ').map(char => {
    const element = document.createElement('span');
    element.className = 'title-letter';
    element.textContent = char;
    stage.append(element);
    return { key: char.toLowerCase(), element };
  });
  let current = 0;
  let alternate = 1;
  let timer;
  let remaining = 7000;
  let deadline;
  let reduced = false;

  // Available modes: 0 = groups, 1 = individual letters, 2 = split-flap characters.
  // Add modes to this list to restore alternating transitions.
  const activeModes = [2];
  let transition = 0;
  let splitDirection = 0;
  let characterTimer;
  let finishCharacters = () => {};
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  function layout(animate = false) {
    clearInterval(characterTimer);
    finishCharacters();
    const mode = animate ? activeModes[transition++ % activeModes.length] : -1;
    const grouped = mode === 0;
    // Cycle: left → right, right → left, center → edges, edges → center.
    const direction = mode === 2 ? splitDirection++ % 4 : 0;
    const switches = [];
    let position = 0;
    const ruler = document.createElement('span');
    ruler.className = 'title-ruler';
    for (const char of phrases[current]) {
      const span = document.createElement('span');
      span.textContent = char;
      ruler.append(span);
    }
    stage.append(ruler);
    const bounds = stage.getBoundingClientRect();
    const available = [...letters];
    for (const span of ruler.children) {
      const char = span.textContent;
      if (char === ' ') continue;
      const index = available.findIndex(letter => letter.key === char.toLowerCase());
      const { element } = available.splice(index, 1)[0];
      const rect = span.getBoundingClientRect();
      const destination = rect.left - bounds.left;
      const origin = Number(element.dataset.x ?? destination);
      element.getAnimations().forEach(animation => animation.cancel());
      const previousChar = element.textContent;
      element.textContent = char;
      element.style.transform = `translate(${destination}px, 0)`;
      element.dataset.x = destination;
      if (animate && !reduced && mode === 2) {
        // Fixed destinations; only the displayed characters change.
        element.style.width = `${rect.width}px`;
        element.style.overflow = 'hidden';
        const last = letters.length - 1;
        const center = last / 2;
        const ranks = [position, last - position, Math.abs(position - center),
          center - Math.abs(position - center)];
        const startAt = ranks[direction] * 45;
        element.textContent = previousChar;
        switches.push({ element, char, previousChar, startAt, settleAt: startAt + 400 });
      } else if (animate && !reduced) {
        // Neighbouring letters share a departure and arc in grouped transitions.
        const unit = grouped ? Math.floor(position / 3) : position;
        const delay = unit * (grouped ? 140 : 65);
        const arc = (unit % 2 === 0 ? -1 : 1) * (grouped ? 12 : 8 + unit % 3 * 5);
        element.animate([
          { transform: `translate(${origin}px, 0)` },
          { transform: `translate(${(origin + destination) / 2}px, ${arc}px)`, offset: .5 },
          { transform: `translate(${destination}px, 0)` }
        ], {
          duration: grouped ? 850 : 700,
          delay,
          easing: 'cubic-bezier(.4, 0, .2, 1)',
          fill: 'backwards'
        });
      }
      position++;
    }
    ruler.remove();
    if (switches.length) {
      finishCharacters = () => {
        for (const { element, char } of switches) {
          element.textContent = char;
          element.style.width = '';
          element.style.overflow = '';
        }
        finishCharacters = () => {};
      };
      const started = performance.now();
      characterTimer = setInterval(() => {
        const elapsed = performance.now() - started;
        for (const { element, char, previousChar, startAt, settleAt } of switches) {
          element.textContent = elapsed < startAt ? previousChar
            : elapsed >= settleAt ? char
            : alphabet[Math.floor(Math.random() * alphabet.length)];
        }
        if (elapsed >= Math.max(...switches.map(item => item.settleAt))) {
          clearInterval(characterTimer);
          finishCharacters();
        }
      }, 50);
    }
  }

  function schedule() {
    clearTimeout(timer);
    if (document.hidden || reduced) return;
    deadline = performance.now() + remaining;
    timer = setTimeout(() => {
      if (current === 0) {
        current = alternate;
        alternate = alternate % (phrases.length - 1) + 1;
      } else current = 0;
      layout(true);
      remaining = current === 0 ? 7000 : 3500;
      schedule();
    }, remaining);
  }
  function pause() {
    clearTimeout(timer);
    clearInterval(characterTimer);
    finishCharacters();
    if (deadline) remaining = Math.max(0, deadline - performance.now());
    deadline = null;
  }
  document.addEventListener('visibilitychange', () => document.hidden ? pause() : schedule());
  window.addEventListener('resize', () => layout());
  // Start immediately; font loading only updates measurements, never the timer.
  layout();
  schedule();
  document.fonts.ready.then(() => layout());
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', event => {
    reduced = event.matches;
    if (event.matches) {
      clearTimeout(timer);
      current = 0;
      stage.classList.remove('title-ready');
      layout();
    } else {
      stage.classList.add('title-ready');
      remaining = 7000;
      schedule();
    }
  });
})();
