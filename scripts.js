// Button to have music player open and collapse
(function () {
    const btn = document.getElementById('togglePlayer');
    const drawer = document.getElementById('bottomplayer');
  
    if (!btn || !drawer) return;

    // Start off not opened and only open when pressed
    let isOpen = false;

    function setOpen(next) {
        isOpen = next;
        drawer.classList.toggle('open', isOpen);
        btn.setAttribute('aria-expanded', String(isOpen));
    }

    btn.addEventListener('click', () => setOpen(!isOpen));
    btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(!isOpen); }
    });
})();
