/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
loadKittens()
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let kittenName = form.name.value
  console.log(kittens)
  for (x = 0; x < kittens.length; x++) {

    if (kittens[x]['name'] == kittenName) {
      if (kittens[x]['affection'] == 0) {
        window.alert("This cat will never forgive you.")
        return
      }
      else {
        window.alert("You already have this cat!")
        return
      }
    }
  }
  let kittenId = ""
  kittenId += generateId()


  let kittenAffection = 5
  let kittenImage = "https://robohash.org/" + kittenName + "?set=set4"
  kittens.push({ "name": kittenName, "affection": kittenAffection, "image": kittenImage, "id": kittenId })
  console.log(kittenId)
  form.reset()
  saveKittens()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"))
  if (storedKittens) {
    kittens = storedKittens
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let drawnKittensElem = document.getElementById("kittens")
  let drawnKittens = ""

  kittens.forEach(kitten => {
    let interalKittenId = kitten.id

    let kittenMood = setKittenMood(interalKittenId)
    let kittenMoodVanish = ''
    let kittenMoodDisplay = "Mood:" + kitten.mood
    if (kittenMood == "gone") {
      kittenMoodVanish = "hidden"
      console.log(kittenMoodVanish)
      kittenMoodDisplay = "Ran away for good."
    }

    drawnKittens += `
  <div class="kitten img m-1 p-1 bg-dark ${kittenMood}">
    <img id="kittenImage" class="d-flex" src="${kitten.image}" alt="Kitten Image">
    <div class="text-light m-1 label">Name: ${kitten.name}
    </div>
    <div class="text-light m-1 label">Affection: ${kitten.affection}
    </div>
    <div class="text-light m-1 label">${kittenMoodDisplay}
    </div>
    <button class="button label text-center m-1 d-flex.justify-content-center ${kittenMoodVanish}" onclick="petKitten(${interalKittenId})">Pet</button>
    <button class="button label text-center m-1 d-flex.justify-content-center ${kittenMoodVanish}" onclick="catnip(${interalKittenId})">Catnip</button>
    
  </div >                        
    `


  }
  )
  drawnKittensElem.innerHTML = drawnKittens

}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id)
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function petKitten(kittenId) {
  internalKitten = findKittenById(kittenId)

  if (Math.random() > .7) {
    internalKitten.affection += 1
    console.log("app.js ln 103: kitten affection increased")
  }
  else {
    internalKitten.affection -= 1
    console.log("app.js ln 103: kitten affection decreased")
  }
  saveKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(kittenId) {
  internalKitten = findKittenById(kittenId)

  internalKitten.affection = 5

  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kittenId) {
  internalKitten = findKittenById(kittenId)
  console.log(kittenId)
  let kittenAffection = internalKitten.affection

  if (kittenAffection >= 6) {
    return "happy"
    console.log("happy")
  }
  else if (kittenAffection <= 5 && kittenAffection > 3) {
    return "tolerant"
  }
  else if (kittenAffection <= 3 && kittenAffection > 0) {
    return "angry"
  }
  else {
    return "gone"
  }
}


function getStarted() {
  document.getElementById("welcome").remove()
  document.getElementById("kittenNameInput").classList.remove("hidden")
  drawKittens()
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 1000000000)
  )
}
//fart
