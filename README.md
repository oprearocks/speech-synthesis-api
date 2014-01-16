#Speech Synthesis API Experiment

I built this small app to fiddle with the Speech Synthesis API.
It currently allows the following:

* Entering custom text (the text will be interpreted by the Speech Syntesis API when clicking the `SPEAK IT!` button)
* Voice selection
* Pitch & Speech Rate manipulation

Works in Chrome Canary Version  > 34.0.1788.0.

Had some issues with `speechSynthesis.getVoices()` because it doesn't return the array of available voices the first time it is called.
The issue isn't present when you run the code from the browser's console, it only appears when the code is loaded through a website.
My workaround was to make a polling mechanism, that sets a timeout if the array of available voices is still unpopulated:

    voices = speechSynthesis.getVoices();
    if (!voices.length) {
        timerId = window.setTimeout(_getVoices, 300);
        return timerId;
    }

    window.clearTimeout(timerId);
