fetch("https://dog.ceo/api/breeds/list/all")
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
    })