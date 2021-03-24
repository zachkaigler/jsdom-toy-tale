let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  // debugger
  
  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(function(toysArray) {
      toysArray.forEach(function (toy) {
        let toyCollectionDiv = document.querySelector("div#toy-collection")
        
        let cardDiv = document.createElement("div")
            cardDiv.classList = "card"
        let h2Tag = document.createElement("h2")
        let imgTag = document.createElement("img")
            imgTag.src = toy.image
        let likesTag = document.createElement("p")    
            likesTag.innerText = toy.likes


        toyCollectionDiv.append(cardDiv)

      })
      // cardDiv.innerText = toy
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
