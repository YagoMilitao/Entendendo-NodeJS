//importando express
//para saber se foi instalado: console.log(express);
const express = require('express');

const server = express();
server.use(express.json());


//Query params = ?test=1
//Route params = /useres/1
//Request body = {"name": "yago", "email": "yagolano@hotmail.com"}


//localhost:3000/teste
/*server.get('/teste', (req, res) =>{
    return res.json({message: 'Hello World'});
})
*/

//http://localhost:3000/users?nome=yagolis
/*server.get('/users', (req, res) =>{
    const nome = req.query.nome;
    return res.json({message: `Hello ${nome}`});
})*/

 //localhost:3000/users/ID_DO_USUARIO
/*server.get('/users/:id', (req, res) =>{
    //const id= req.params.id;
    //ou fazer ↓
    const {id} = req.params;
    return res.json({message: `Buscando o usuário ${id}`});
})*/

//utilizar array para buscar usuarios
/*const users = ['Yago', 'Luiz', 'Militao'];

server.get('/users/:index', (req, res) => {
    const { index } = req.params;

    return res.json(users[index]);
})*/

const users = ['Yago', 'Luiz', 'Militao'];

server.use((req, res, next) =>{
    console.time('Request');
    console.log(`Método: ${req.method}; URL: ${req.url}`);

    next();

    console.timeEnd('Request');
});

function checkUserExists(req, res, next){
    if(!req.body.name){
        return res.status(400).json({ error: 'User name is required' });
    }
    return next ();
}

function checkUserInArray(req, res, next){
    const user = users[req.params.index];
    
    if (!user){
        return res.status(400).json({ error: 'User does not exists '});
    }
     req.user = user
    return next();
}



//lista todos os usuarios
server.get('/users', (req, res) => {
    return res.json(users);
})

//Lista 1 usuário
server.get('/users/:index', checkUserInArray, (req, res) => {
    const { index } = req.params;

    return res.json(users[index]);
})

//criar usuario
server.post('/users', checkUserExists, (req, res) => {
    const {name} = req.body;

    users.push(name);
    return res.json(name);
});


//alterar
server.put('/users/:index', checkUserInArray, checkUserExists, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index]= name;

    //retorna todos os usuarios
    return res.json(users);
});

//deletar
server.delete('/users/:index', checkUserInArray, (req, res) => {
    const { index } = req.params;
//splice-> percorrer o vetor, chegando no valor de index solicitado, ele vai deletar x posições a partir desse valor
    users.splice(index, 1);

    return res.send();
});


server.listen(3000);