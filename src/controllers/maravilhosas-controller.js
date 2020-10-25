const { response } = require('express')
const model = require('../models/maravilhosas-models')

//getMaravilhosas
const getMaravilhosas = (request, response)=> {
    console.log(model.selectAllData())
    return response.status(200).json(model.selectAllData()) 
}

//getMaravilhosaById
const getMaravilhosaById = (request, response)=> {
    console.log(request.params.id)
    console.log(model.selectDataById(request.params.id))
    const buscarMaravilhosa = model.selectDataById(request.params.id);
    if(buscarMaravilhosa)
        return response.status(200).json(buscarMaravilhosa)

    return response.status(400).send("Registro não encontrado.")
}

//addMaravilhosa 
const addMaravilhosa = (request, response) => {
    if(!validateMaravilhosaJson(request.body))
        return response.status(400).send("Verifique se os campos estão corretos.")  
    
    const { id, name, photo, subtitle, about, phrase, history, addedBy } = request.body
    
    const novaMaravilhosa = {
        "id": id,
        "name": name,
        "photo": photo,
        "subtitle": subtitle,
        "about": about,
        "phrase": phrase,
        "history": history,
        "addedBy":addedBy
    }
    const adicionarMaravilhosa = model.insertData(novaMaravilhosa)
    if(adicionarMaravilhosa.success)
        return response.status(201).json(adicionarMaravilhosa.maravilhosa)
    
    return response.status(400).send(adicionarMaravilhosa.message)   
}

//updateMaravilhosa 
const updateMaravilhosa = (request, response) => {
    if(!validateMaravilhosaJson(request.body))
        return response.status(400).send("Verifique se os campos estão corretos.")  
    const id = parseInt(request.params.id)
    const { name, photo, subtitle, about, phrase, history, addedBy } = request.body
    const updateMaravilhosa = {
        "id": id,
        "name": name,
        "photo": photo,
        "subtitle": subtitle,
        "about": about,
        "phrase": phrase,
        "history": history,
        "addedBy": addedBy
    }
    const update = model.updateData(updateMaravilhosa)

    if(update)
        return response.status(200).json(update)

    return response.status(400).send("Erro. Maravilhosa não atualizada.")
}

//deleteMaravilhosa
const deleteMaravilhosa = (request, response) => {
    const id = parseInt(request.params.id)
    const delMaravilhosa = model.deleteData(id)

    if(delMaravilhosa)
        return response.status(200).send(' Maravilhosa fake excluida.' )
    
    return response.status(400).send('Maravilhosa fake não encontrada.')
}

const validateMaravilhosaJson = (maravilhosa) => {
    const isValid = (
        maravilhosa.hasOwnProperty("id"), 
        maravilhosa.hasOwnProperty("name"),
        maravilhosa.hasOwnProperty("photo"), 
        maravilhosa.hasOwnProperty("subtitle"), 
        maravilhosa.hasOwnProperty("about"),
        maravilhosa.hasOwnProperty("phrase"),
        maravilhosa.hasOwnProperty("history"),
        maravilhosa.hasOwnProperty("addedBy")
    )
    if(isValid)
        return true
    return false
}

module.exports = {
    getMaravilhosas,
    getMaravilhosaById,
    addMaravilhosa,
    updateMaravilhosa,
    deleteMaravilhosa
}