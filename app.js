window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const snapSoundElement = document.getElementById('snapSound');
const webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('end', recognition.start);

recognition.start();
recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
    p.textContent = poopScript;

    // to append paragraphs

    // if (e.results[0].isFinal) {
    //     p = document.createElement('p');
    //     words.appendChild(p);
    // }
    if (transcript.includes('open camera' || 'Open camera' || 'Open the camera' || 'open the camera')) {
        webcam.start();
        playText("webcam started");
    }
    if (transcript.includes('Take a snap' || 'take a snap')) {
        webcam.snap();
        playText("tooked a snap");
        // $('#cameraFlip').click(function() {
        //     webcam.flip();
        //     webcam.start();
        //   });
    }
    if (transcript.includes('Close the camera' || 'close the camera.')) {
        webcam.stop();
        playText("Webcam stoped");
    }
    if (transcript.includes('What is my name' || 'what is my name')) {
        p = document.createElement('p');
        p.textContent = 'Your name is kashish';
        playText(p.textContent);
        words.appendChild(p);
    }
    if (transcript.includes('What is your name' || 'what is your name')) {
        p = document.createElement('p');
        p.textContent = 'My Boss calls me JARVIS';
        playText(p.textContent);
        words.appendChild(p);
    }
    if (transcript.includes('How are you' || 'how are you')) {
        p = document.createElement('p');
        p.textContent = 'I am Fine! and i hope u too';
        words.appendChild(p);
    }
    if (transcript.includes('Change the background color' || 'Change the background color')) {
        p = document.createElement('p');
        p.textContent = 'Background color changed ';
        playText(p.textContent);
        words.appendChild(p);
        document.body.style.backgroundColor = "red";
    }
    function playText(text){
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate =1;
        speechSynthesis.speak(utterance);

    }
});

