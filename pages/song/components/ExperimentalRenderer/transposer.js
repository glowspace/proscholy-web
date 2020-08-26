// Chromatic scale starting from C using flats only.
const FLAT_SCALE = [
    'C',
    'Db',
    'D',
    'Eb',
    'E',
    'F',
    'Gb',
    'G',
    'Ab',
    'A',
    'B',
    'H'
];

// Chromatic scale starting from C using sharps only.
const SHARP_SCALE = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'H'
];

function transposeNote(note, semitones, options = {
    useFlatScale: false,
    forceB: false,
    useAmericanNotation: false
}) {
    if (semitones == 0) {
        return note;
    }

    let scale = options.useFlatScale ? FLAT_SCALE : SHARP_SCALE;
    let note_i = FLAT_SCALE.indexOf(note);
    if (note_i === -1) {
        note_i = SHARP_SCALE.indexOf(note);
    }

    let new_i = (note_i + semitones + 12) % 12;
    let new_note = scale[new_i];

    if (options.useAmericanNotation) {
        new_note = new_note.replace('B', 'Bb').replace('H', 'B');
    } else if (options.forceB) {
        new_note = new_note.replace('A#', 'B');
    }

    return new_note;
}

// -1: flat, 0: undefined, 1: sharp
function getNoteSharpness(note) {
    let score = 0;

    if (FLAT_SCALE.indexOf(note) >= 0) {
        score -= 1;
    }

    if (SHARP_SCALE.indexOf(note) >= 0) {
        score +=1;
    } 

    return score;
}

function transposedChord(chord, semitones, options) {
    return {
        base: chord.base ? transposeNote(chord.base, semitones, options) : "",
        variant: chord.variant,
        extension: chord.extension,
        bass: chord.bass ? transposeNote(chord.bass, semitones, options) : "",
        isDivided: chord.isDivided,
        isSubstitute: chord.isSubstitute,
        isOptional: chord.isOptional,
        hasNextSibling: chord.hasNextSibling
    }
}

function getSongPartChords(part) {
    let arr = [];
    
    for (const line of part.songLines) {
        arr.push(...line.chords);
    }

    return arr;
}

function getSongPartSharpness(part) {
    const chords = getSongPartChords(part);
    const chords_notes = chords.map(chord => chord.base).filter(note => note !== "");
    const notes_sharpnesses = chords_notes.map(getNoteSharpness);

    // sum over all sharpnesses
    const part_sharpness = notes_sharpnesses.reduce((a,b) => a + b, 0);

    // overall sharpness is    -1 => use flatscale
    //                          0 => undecided
    //                          1 => use sharpscale
}

export { transposedChord, getSongPartSharpness };