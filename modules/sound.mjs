//this module contains everything that has to do with sound

export { preloadSounds, playSong };

//preload sounds
function preloadSounds(volume, layers) {
  let allSounds = [];
  for (let i = 0; i < layers.length; i++) {
    const lines = layers[i].children;
    let creatureSounds = [];
    for (let j = 0; j < lines.length; j++) {
      let sound = new Audio(`./sounds/${i}.${j}.mp3`);
      sound.volume = volume;
    }
    allSounds.push(creatureSounds);
  }
  return allSounds;
}

//makes a song for the lines that are currently showing
function makeSong(allLines, allSounds) {
  let song = [];
  for (let i = 0; i < allLines.length; i++) {
    if (!allLines[i].classList.contains("hidden")) {
      let numbersArray = allLines[i].classList.value.split("|");
      let j = numbersArray[0];
      let k = numbersArray[1];
      let soundFile = allSounds[j][k];
      song.push(soundFile);
    }
  }
  return song;
}

//plays the song
function playSong(allLines, allSounds) {
  let song = makeSong(allLines, allSounds);
  for (let i = 0; i < song.length; i++) {
    setTimeout(function () {
      song[i].play();
    }, i * 500); //500 is the delay between the sounds start playing in milliseconds, it is multiplied with i because the delay is counted frpm the first sound
  }
}
