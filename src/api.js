let newInfo = {
    id: 8, 
    name: "Перчик",
    img_link:
      "https://chudo-prirody.com/uploads/posts/2021-08/1628623457_99-p-foto-smeshnie-koti-103.jpg",
    age: 5,
    rate: 8,
    favourite: false,
    description:
      "Этот шпендель любит играть. Но подолгу смотрит на тебя, когда ты ему поставил мат во время шахматной партии. С таким же лицом он какает на подушку." 
}

const config = {
  baseUrl: 'https://cats.petiteweb.dev/api/single/ekidvu',
  headers: {
    'content-type': 'application/json',
  }
}

class Api {
  #getResponse(res) {
    return res.ok ? res.json() : Promise.reject('Ошибка на стороне сервера');
  }

  #baseUrl
  #headers

  constructor(config) {
    this.#baseUrl = config.baseUrl,
    this.#headers = config.headers    
  }  

  getAllApiCats(){
    return fetch(`${this.#baseUrl}/show`)
      .then(this.#getResponse);
  }

  getApiCatById(idCat){
    return fetch(`${this.#baseUrl}/show/${idCat}`)
      .then(this.#getResponse);
  }

  getIdsOfApiCats(){
    return fetch(`${this.#baseUrl}/ids`)
      .then(this.#getResponse);
  }

  addNewApiCat(data){
    return fetch(`${this.#baseUrl}/add`, {
      method: 'POST',
      headers: this.#headers,
      body: JSON.stringify(data),
    })
      .then(this.#getResponse)
  }

  updateApiCatById(idCat, data){
    return fetch(`${this.#baseUrl}/update/${idCat}`, {
      method: 'PUT',
      headers: this.#headers,
      body: JSON.stringify(data)
    })
      .then(this.#getResponse)
  }
  
  deleteApiCatById(idCat, data){
    return fetch(`${this.#baseUrl}/delete/${idCat}`, {
      method: 'DELETE'
    })
      .then(this.#getResponse)
  }
}

const api = new Api(config);

// api.getAllApiCats()
//   .then((dataCats) => {
//     console.log(dataCats);
//   })

// api.updateApiCatById(2, {"name": "Pater Catnips"})

