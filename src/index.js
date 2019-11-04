const dogInfo = document.getElementById("dog-info")
const dogBarDiv = document.getElementById("dog-bar")



fetch('http://localhost:3000/pups')
.then((r) => r.json())
.then((allDogs) => {
    allDogs.forEach((dog) => {
        makeJSONtoHTML(dog)
    }) 
})




function makeJSONtoHTML(dogJSON){  
    let dogSpan = document.createElement('span')
    dogSpan.innerHTML += `${dogJSON.name}`
    dogSpan.id = `${dogJSON.id}`
    dogBarDiv.append(dogSpan) 
    
    dogSpan.addEventListener("click", () => {
        dogInfo.innerHTML = "" // clear my dogInfo
        let h2 = document.createElement("h2")
        h2.innerText = dogJSON.name
        
        let img = document.createElement('img')
        img.src=`${dogJSON.image}`

        let br = document.createElement('br')

        dogSpan.append(h2, img, br, dogButton)
        dogInfo.append(dogSpan)
    })
    


    let dogButton = document.createElement("button")
    if (dogJSON.isDogGood) {
        dogButton.innerText = "Good Dog!"
    } else {
        dogButton.innerText = "Bad Dog!"
    }
    dogButton.id = dogJSON.id

    dogButton.addEventListener("click", (evt) => {
        let status = dogJSON.isDogGood
        fetch(`http://localhost:3000/pups/${evt.target.id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                isGoodDog: !status 
            })
        })
    })



}












// dogSummary.innerHTML += `<img src ="http://localhost:3000/pups/${dogJSON.id}">
// <h2>${dogJSON.name}</h2>
// <button>'good-bad-dog'</button>`

// dogInfo.append(dogSummary) 

// dogSpan.addEventListener("click", (e) => {
//    let dogName = e.target.name.value
//    let dogStatus = e.target.isGoodDog.value 
//    let dogImage = e.target.image.value   

   
// })




