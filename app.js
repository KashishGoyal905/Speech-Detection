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

    if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
    }
    if (transcript.includes('open camera' || 'Open camera'|| 'Open the camera' || 'open the camera')) {
        webcam.start()
            .then(result => {
                console.log("webcam started");
            })
            .catch(err => {
                console.log(err);
            });
    }
    if (transcript.includes('close the camera' || 'Close the camera')) {
        webcam.stop()
        }
});

