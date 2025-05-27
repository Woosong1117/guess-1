var scale = 32;

var red = Math.floor(Math.random()*scale);
var green = Math.floor(Math.random()*scale);
var blue = Math.floor(Math.random()*scale);

var rVal = 0;
var gVal = 0;
var bVal = 0;

var totalGuess = 6;
var numGuess = 1;

window.onload = function(){
    initialize();
}

function initialize(){
    var bucketSize = 256 / scale;
    rVal = Math.floor(red*bucketSize);
    gVal = Math.floor(green*bucketSize);
    bVal = Math.floor(blue*bucketSize);
    
    console.log('correct scaled:', red, green, blue);
    console.log('correct unscaled:', rVal, gVal, bVal);
    var box = document.createElement('div');
    box.id = 'color-box';
    box.style.backgroundColor = `rgb(${rVal},${gVal},${bVal})`;
    document.body.appendChild(box);

    var form = document.createElement('form');
    form.id = 'guess-form';

    ['R','G','B'].forEach(ch => {
        var lbl = document.createElement('label');
        lbl.textContent = ch + ': ';
        var inp = document.createElement('input');
        inp.type = 'number';
        inp.name = ch.toLowerCase();
        inp.min = 0;
        inp.max = scale-1;
        inp.required = true;
        lbl.appendChild(inp);
        form.appendChild(lbl);
    });

    var btn = document.createElement('button');
    btn.type = 'submit';
    btn.textContent = 'Guess';
    form.appendChild(btn);

    document.body.appendChild(form);

    if(!(numGuess >= totalGuess)){
        form.addEventListener('submit', processInput);
    }
}

function processInput(e) {
    e.preventDefault();
    var form = e.target;
    var rGuess = +form.r.value;
    var gGuess = +form.g.value;
    var bGuess = +form.b.value;

    let getArrow = (guess, actual) => {
        if (guess < actual) return '⬆️';
        if (guess > actual) return '⬇️';
        return '✅'; 
    };

    let feedback = document.getElementById('feedback');
    feedback.innerHTML = `
        Red: ${getArrow(rGuess, red)} 
        | Green: ${getArrow(gGuess, green)} 
        | Blue: ${getArrow(bGuess, blue)}
    `;

    let historyEntry = document.createElement('div');
    historyEntry.textContent = `Guess ${numGuess} - R: ${rGuess} ${getArrow(rGuess, red)} | G: ${gGuess} ${getArrow(gGuess, green)} | B: ${bGuess} ${getArrow(bGuess, blue)}`;
    document.getElementById('guess-history').appendChild(historyEntry);

    if (rGuess === red && gGuess === green && bGuess === blue) {
        document.getElementById('feedback').innerHTML = '';
        document.getElementById('guess-history').innerHTML = '';
        feedback.innerHTML = `<span style="color: lightgreen;">🎉 You guessed it! 🎉</span>`;
        form.remove();
        return;
    }

    numGuess += 1;

    if (numGuess >= totalGuess) {
        document.getElementById('feedback').innerHTML = '';
        document.getElementById('guess-history').innerHTML = '';
        feedback.innerHTML += `<br><span style="color: red;">Game Over! Correct answer: R:${red}, G:${green}, B:${blue}</span>`;
        form.remove();
    }
}



