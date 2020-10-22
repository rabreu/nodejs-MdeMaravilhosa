const { response } = require('express');
let data = require('../data/data.json')

// selectAllData
const selectAllData = () =>{
    return data
}

//selectDataById
const selectDataById = (id)=>{
    const maravilhosaExiste = data.find(maravilhosa => maravilhosa.id == id);
    if(maravilhosaExiste)
        return data.find(maravilhosa => maravilhosa.id == id);
    return false;
}

//insertData
const insertData = (novaMaravilhosa) => {
    const existeMaravilhosa = data.find(maravilhosa => maravilhosa.id == novaMaravilhosa.id)
    if(!existeMaravilhosa) {
        data.push(novaMaravilhosa)
        return data.find(maravilhosa => maravilhosa.id == novaMaravilhosa.id);
    }

    return false;
}

//updateData
const updateData = (updateMaravilhosa)=>{
    const idsMaravilhosa = data.map(maravilhosa => maravilhosa.id)
    const indexMaravilhosa = idsMaravilhosa.indexOf(updateMaravilhosa.id)
    if(indexMaravilhosa > -1) {
        data.splice(indexMaravilhosa, 1, updateMaravilhosa)
        return data[indexMaravilhosa]
    }
    return false
}

//deleteData
const deleteData= (idMaravilhosa) =>{
    const existeMaravilhosa = data.find(maravilhosa => maravilhosa.id == idMaravilhosa)
    
    if(existeMaravilhosa) {
        const newData = data.filter(maravilhosa => maravilhosa.id != idMaravilhosa);
        data = newData;
        return true
    }
    return false;
}

module.exports = {
    selectAllData,
    selectDataById,
    insertData,
    updateData,
    deleteData
}