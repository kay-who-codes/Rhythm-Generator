// Import libraries
const VF = Vex.Flow;

// Store the current rhythm pattern
let currentRhythm = [];

// Function to generate random rhythm
function generateRhythm() {
    // Clear previous output
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";
    currentRhythm = []; // Reset rhythm array

    // Create an SVG renderer and attach it to the output div
    const renderer = new VF.Renderer(outputDiv, VF.Renderer.Backends.SVG);
    renderer.resize(700, 200);
    const context = renderer.getContext();

    // Create a stave
    const stave = new VF.Stave(10, 40, 600);
    stave.addClef("treble").addTimeSignature("4/4");
    stave.setContext(context).draw();

    // Define possible rhythms
    const durations = ["4", "8", "16", "2"]; // Quarter, Eighth, Sixteenth, Half notes

    // Generate 4 bars of rhythm
    const notes = [];
    for (let bar = 0; bar < 4; bar++) {
        let beats = 0;
        while (beats < 4) {
            const duration = durations[Math.floor(Math.random() * durations.length)];
            const value = 4 / parseInt(duration); // Calculate beat value
            if (beats + value <= 4) {
                beats += value;
                currentRhythm.push(value); // Store rhythm in beats
                notes.push(new VF.StaveNote({
                    clef: "treble",
                    keys: ["c/4"],
                    duration: duration,
                }));
            }
        }
    }

    // Format and draw the notes
    const voice = new VF.Voice({ num_beats: 16, beat_value: 4 });
    voice.addTickables(notes);

    const formatter = new VF.Formatter().joinVoices([voice]).format([voice], 500);
    voice.draw(context, stave);

    // Enable the "Listen" button
    document.getElementById("listen-btn").disabled = false;
}

// Function to play the rhythm
function playRhythm() {
    const click = new Tone.Player("https://cdn.jsdelivr.net/gh/robinpalmer/audio-circuit@main/ticks/click.mp3").toDestination();
    const now = Tone.now();

    // Schedule clicks based on the rhythm pattern
    let time = now;
    currentRhythm.forEach((beat) => {
        click.start(time);
        time += beat; // Increment time by the note duration
    });
}

// Attach event listeners to buttons
document.getElementById("generate-btn").addEventListener("click", generateRhythm);
document.getElementById("listen-btn").addEventListener("click", playRhythm);
