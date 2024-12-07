// Function to generate random rhythm
function generateRhythm() {
    const VF = Vex.Flow;

    // Clear previous output
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";

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
            const value = 4 / parseInt(duration);
            if (beats + value <= 4) {
                beats += value;
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
}

// Attach event listener to the button
document.getElementById("generate-btn").addEventListener("click", generateRhythm);
