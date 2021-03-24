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
            imgTag.classList = "toy-avatar"

        let likesTag = document.createElement("p")    
            likesTag.innerText = toy.likes

        let likesButton = document.createElement("button")
            likesButton.classList = "like-btn"

        cardDiv.append(h2Tag)
        cardDiv.append(imgTag)
        cardDiv.append(likesTag)
        cardDiv.append(likesButton)

        toyCollectionDiv.append(cardDiv)


        likesButton.addEventListener("click", function(){
          fetch(`http://localhost:3000/toys/${toy.id}`, {
            method: "PATCH",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
              likes: toy.likes + 1
            })
          })
          
            .then(newLike => newLike.json())
              .then(function (newLikeObj) {
                toy = newLikeObj
                likesTag.innerText = newLikeObj.likes
              })
        })

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
    }).then(newObj => newObj.json())
      .then(function (newToy) {
        let toyCollectionDiv = document.querySelector("div#toy-collection")
        
        let cardDiv = document.createElement("div")
            cardDiv.classList = "card"

        let h2Tag = document.createElement("h2")
            h2Tag.innerText = newToy.name

        let imgTag = document.createElement("img")
            imgTag.src = newToy.image
            imgTag.classList = "toy-avatar"

        let likesTag = document.createElement("p")    
            likesTag.innerText = newToy.likes

        let likesButton = document.createElement("button")
            likesButton.classList = "like-btn"

        cardDiv.append(h2Tag)
        cardDiv.append(imgTag)
        cardDiv.append(likesTag)
        cardDiv.append(likesButton)

        toyCollectionDiv.append(cardDiv)

        likesButton.addEventListener("click", function(){
          fetch(`http://localhost:3000/toys/${newToy.id}`, {
            method: "PATCH",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
              likes: newToy.likes + 1
            })
          })
          
            .then(newLike => newLike.json())
              .then(function (newLikeObj) {
                newToy = newLikeObj
                likesTag.innerText = newLikeObj.likes
              })
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
