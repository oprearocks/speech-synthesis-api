(function(window, document, undefined) {
    'use strict';
    
    var hasSpeechSupport,
        msg,
        mainDiv,
        _speakHandler,
        _returnHandler,
        _getVoices,
        _endHandler,
        voices,
        frag,
        voicesLabel,
        voicesSelect,
        voicesOption,
        speakButton,
        textInput,
        timerId;

    hasSpeechSupport = 'speechSynthesis' in window;

    if (hasSpeechSupport) {

        msg = new SpeechSynthesisUtterance();
        msg.volume = 1;

    }

    _speakHandler = function(e) {

        msg.text = textInput.value;
            console.log(msg);
        speechSynthesis.speak(msg);

    };

    _returnHandler = function(e) {

        if (e.keyCode === 13) {

            _speakHandler(e);

        }
    };

    _getVoices = function(e) {

        var isGeneratedVoicesSelect;

        isGeneratedVoicesSelect = voicesSelect ? true : false;

        if (isGeneratedVoicesSelect) {
            return;
        }

        voices = speechSynthesis.getVoices();
        if (!voices.length) {
            timerId = window.setTimeout(_getVoices, 300);
            return timerId;
        }

        console.log(timerId);
        window.clearTimeout(timerId);

        frag = document.createDocumentFragment();
        voicesSelect = document.createElement('select');
        voicesSelect.setAttribute('id', 'voicesSelect');
        voicesLabel = document.createElement('label');
        voicesLabel.setAttribute('for', voicesSelect.getAttribute('id'));
        voicesLabel.textContent = 'Thy language!';
        
        voices.forEach(function(voice, index) {

            voicesOption = document.createElement('option');
            voicesOption.setAttribute('value', voice.name);
            voicesOption.setAttribute('data-voice', index);
            voicesOption.setAttribute('data-voice-U-R-I', voice.voiceURI);
            voicesOption.setAttribute('data-lang', voice.lang);
            voicesOption.textContent = voice.name;

            voicesSelect.appendChild(voicesOption);
        });

        frag.appendChild(voicesLabel);
        frag.appendChild(voicesSelect);
        mainDiv = document.querySelector('.main');
        mainDiv.insertBefore(frag, speakButton);

        document.addEventListener('change', function(e) {
            var targetEl,
                targetOption;
            
            targetEl = e.target;
            console.log('%O', targetEl);

            if (targetEl.nodeName.toLowerCase() === 'select') {
                targetOption = targetEl.options[targetEl.selectedIndex];
               
                Object.keys(targetOption.dataset).forEach(function(key){
                    
                    msg[key] = targetOption.dataset[key];
                    if (key === 'voice') {
                        msg[key] = voices[targetOption.dataset[key]];
                    }

                });
            }

            if (targetEl.nodeName.toLowerCase() === 'input' && targetEl.getAttribute('type').toLowerCase() === 'range') {
                
                msg[targetEl.dataset.targetProperty] = targetEl.value;
            }
                console.log(msg);
        });

    };

    _endHandler = function(e) {

        console.log('Finished in %d miliseconds!', e.elapsedTime);
    };

    speakButton = document.querySelector('button');
    textInput = document.querySelector('#phrase');

    textInput.addEventListener('focus', _getVoices);
    speakButton.addEventListener('click', _speakHandler);
    document.addEventListener('keyup', _returnHandler);
    msg.addEventListener('end', _endHandler);



})(window, document);
