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
    const existeIdMaravilhosa = data.find(maravilhosa => maravilhosa.id == novaMaravilhosa.id)
    const existeNomeMaravilhosa = data.find(maravilhosa => maravilhosa.name === novaMaravilhosa.name)
    // const teste = data.find(maravilhosa => maravilhosa.id == novaMaravilhosa.id || maravilhosa.name === novaMaravilhosa.name)

    if(existeIdMaravilhosa)
        return { "success": false, "message": "Id já existe no banco de dados de maravilhosas." };

    if(existeNomeMaravilhosa)
        return { "success": false, "message": "Maravilhosa já existe em nosso banco de dados." };

    data.push(novaMaravilhosa)
    return { "success": true, "message": "Maravilhosa adicionada.", "maravilhosa": data.find(maravilhosa => maravilhosa.id == novaMaravilhosa.id)};
}

//updateData
const updateData = (updateMaravilhosa)=>{
    const idsMaravilhosa = data.map(maravilhosa => maravilhosa.id)
    const indexMaravilhosa = idsMaravilhosa.indexOf(updateMaravilhosa.id)

    if(indexMaravilhosa < 0) {
        return { "success": false, "message": "Id não existe no banco de dados." };
    }

    const existeNomeMaravilhosa = data.find(maravilhosa => maravilhosa.name === updateMaravilhosa.name && maravilhosa.id != updateMaravilhosa.id)

    if(existeNomeMaravilhosa)
        return { "success": false, "message": "Maravilhosa já existe em nosso banco de dados." };

    data.splice(indexMaravilhosa, 1, updateMaravilhosa)
    return { "success": true, "message": "Maravilhosa atualizada.", "maravilhosa": data.find(maravilhosa => maravilhosa.id == updateMaravilhosa.id)};

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