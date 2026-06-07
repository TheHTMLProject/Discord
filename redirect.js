(function () {
    'use strict';

    var REDIRECT_URL = 'https://discord.gg/DDkrC9brCM';
    var COUNTDOWN_SECONDS = 5;

    var ctaButton = document.getElementById('redirect-cta');
    var ctaFill = document.getElementById('cta-fill');

    if (!ctaButton || !ctaFill) {
        setTimeout(function () { window.location.href = REDIRECT_URL; }, 200);
        return;
    }

    var remaining = COUNTDOWN_SECONDS;
    var redirectFired = false;
    var countdownStarted = false;

    function updateFill(secondsLeft) {
        var progress = 1 - (secondsLeft / COUNTDOWN_SECONDS);
        ctaFill.style.width = (progress * 100) + '%';
    }

    function doRedirect() {
        if (redirectFired) return;
        redirectFired = true;

        var circle = document.querySelector('.circle-reveal');
        var container = document.querySelector('.redirect-container');
        
        if (circle) circle.classList.add('closing');
        if (container) container.classList.add('closing');

        setTimeout(function() {
            try {
                window.location.href = REDIRECT_URL;
            } catch (_) {
                window.location.replace(REDIRECT_URL);
            }

            setTimeout(function () {
                try { window.location.assign(REDIRECT_URL); }
                catch (_) { window.open(REDIRECT_URL, '_self'); }
            }, 2000);
        }, 800);
    }

    function tick() {
        if (redirectFired) return;

        updateFill(remaining);

        if (remaining <= 0) {
            setTimeout(doRedirect, 1000);
            return;
        }

        remaining--;
        setTimeout(tick, 1000);
    }

    function startCountdown() {
        if (countdownStarted) return;
        countdownStarted = true;

        setTimeout(tick, 600);
    }

    ctaButton.addEventListener('click', function (e) {
        e.preventDefault();
        var rect = ctaButton.getBoundingClientRect();
        var ripple = document.createElement('span');
        ripple.classList.add('ripple');
        var size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        ctaButton.appendChild(ripple);
        ripple.addEventListener('animationend', function () { ripple.remove(); });
        doRedirect();
    });

    startCountdown();

})();
