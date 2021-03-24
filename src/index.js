let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  
  
  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(function(toysArray) {
      toysArray.forEach(function (toy) {
        let toyCollectionDiv = document.querySelector("div#toy-collection")
        
        let cardDiv = document.createElement("div")
            cardDiv.classList = "card"

        let h2Tag = document.createElement("h2")
            h2Tag.innerText = toy.name

        let imgTag = document.createElement("img")
            imgTag.src = toy.image

        let likesTag = document.createElement("p")    
            likesTag.innerText = toy.likes

        let likesButton = document.createElement("button")
            likesButton.classList = "like-btn"

        cardDiv.append(h2Tag)
        cardDiv.append(imgTag)
        cardDiv.append(likesTag)
        cardDiv.append(likesButton)

        toyCollectionDiv.append(cardDiv)

      })
    })
  
  toyFormContainer.addEventListener("submit", function(event) {
    event.preventDefault()

    let toyNameUserInput = event.target.name.value
    let imageUrlUserInput = event.target.image.value

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        "name": toyNameUserInput,
        "image": imageUrlUserInput,
        "likes": 0
      })
    })
  })
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
