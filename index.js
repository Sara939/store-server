const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json({extended: true}));
app.use(express.urlencoded(({extended: true})));

const port = 8080;

const items = [
    {id:  0, productName: "shirt" , description: "clothe",  price: 50, quantity: 5, img: "https://i0.wp.com/hespokestyle.com/wp-content/uploads/2020/09/mens-ice-blue-oxford-cloth-solid-dress-shirt-he-spoke-style-michael-andrews-bespoke-made-to-measure-custom-suits.jpg?fit=600%2C900&ssl=1"},
    {id:  1, productName: "pants" , description: "clothe",  price: 90, quantity: 3, img: ""},
    {id:  2, productName: "dress" , description: "clothe",  price: 100, quantity: 4, img: ""},
    {id:  3, productName: "shoes" , description: "clothe",  price: 300, quantity: 1, img: ""},
    {id:  4, productName: "jaket" , description: "clothe",  price: 200, quantity: 10, img: ""}
];

const employees= [
    {id:0 ,fullName: "sara", age: 30, phoneNumber: "054-4939414", email: "sara@gmail.com"},
    {id:1 ,fullName: "michal", age: 17, phoneNumber: "054-4939414", email: "likaount@gmail.com"},
    {id:2 ,fullName: "oded", age: 35, phoneNumber: "054-4939414", email: "t@gmail.com"},
    {id:3 ,fullName: "roei", age: 12, phoneNumber: "054-4939414", email: "s@gmail.com"},
    {id:4 ,fullName: "ron", age: 41, phoneNumber: "054-4939414", email: "saralikaount@gmail.com"}
];

const shifts= [
    {id: 1, emplyees:["lala", "tata","baba"] ,startTime: 7, finishTime: 3, dayOfWeek: 5},
    {id: 2, emplyees:["lala", "tata","baba", "wata","caba"] ,startTime: 3, finishTime: 9, dayOfWeek: 5},
    {id: 3, emplyees:["nana", "bela"] ,startTime: 9, finishTime: 7, dayOfWeek: 3},

];

app.get('/', (req,res)=>{
    res.send("server is on")
});

app.get('/products', (req,res) => {
    res.send({massage: "all items", items})

});

app.post('/products/create', (req, res) => {
    items.push(req.body.newItem);
    res.send({massage: 'add sucssfully' , items});
});

app.put('/products/edit/:id', (req,res) => {
    const updateItem= items.find( item => item.id == req.params.id)
    updateItem ? (Object.assign( updateItem, req.body.newupdate) , res.send(items)) : res.send('item dont exsit');
});


app.delete('/products/remove/:id', (req,res) => {
    const startIndex= findIndexOfObject(items, req);
    items.splice(startIndex,1);
    res.send(items);

});
app.get('/products/:id', (req,res) => {
    const foundObject= items.find( obj => obj.id == req.params.id);
    foundObject ? res.send(foundObject): res.send("not exist")
});


//employess

app.get('/employees', (req,res)=>{
    res.send({massage: "all employees", employees})
});


app.post('/employees/create', (req,res)=>{
    employees.push(req.body.newEmploey) 
    res.send({massage: "all employees", employees})
});

app.put('/employee/edit/:id', (req,res)=>{
    const startIndex= findIndexOfObject(employees, req);
    if (startIndex > -1){
           employees[startIndex]= req.body.newEmploey;
    res.send({massage: "edit completed", employees}) 
    } else{
        res.send("cant edit")
    }
});

app.delete ('/employees/remove/:id', (req,res) => {
    const startIndex= findIndexOfObject(employees, req);
    if (startIndex > -1){
        employees.splice(startIndex, 1);
        res.send({massage: 'deleted', employees}) 
    } else{
        res.send("cant remove , id error")
    }
});

app.get('/employees/juniors', (req,res) => {
    const foundObject= employees.filter( obj => obj.age> 18 );
    foundObject ? res.send({massage: "employees above 18", foundObject}) : res.send("not exist");

});

app.get('/employees/:id', (req,res)=>{
    const foundObject= employees.find( obj => obj.id == req.params.id);
    foundObject ? res.send( foundObject) : res.send("id dont exist");
});

app.get('/employees/byemail/:email', (req,res) => {
    const foundObject= employees.find( obj => obj.email == req.params.email);
    foundObject ? res.send(foundObject) : res.send("email doesnt exist");
});

app.get('/shifts', (req,res) =>{
    res.send({massage: "all shifts display", shifts})
});

app.post('/shifts/create', (req,res) =>{
    shifts.push(req.body.newShift);
    res.send({massage: "shift added", shifts})
});

app.put('/shifts/edit/:id',(req,res) =>{
    const updateshift= shifts.find( item => item.id == req.params.id);
    updateshift ? (Object.assign(updateshift, req.body.newShiftsUpdate), res.send(shifts)): 
    res.send('item dont exsit')
});

app.delete('/shifts/remove/:id',(req,res) =>{
    const startIndex= findIndexOfObject(shifts, req);
    if(startIndex > -1){
        shifts.splice(startIndex,1);
        res.send({massage: "sucsess", shifts})
    } else{
        res.send("cant remove , id error")
    }
});

app.get('/shifts/:id',(req,res) =>{
    req.params.id ? res.send(shifts.find(obj => obj.id == req.params.id)) : res.send("id error")
});





app.listen (port, ()=>{
    console.log('server is listening');
});





// function findObjectbyReqId(array, req){
//     const foundObject= array.find( obj => obj.id == req.params.id);
// }


function findIndexOfObject(array, req){
    const foundObject= array.find( obj => obj.id == req.params.id)
    const startIndex= array.indexOf(foundObject);
    return startIndex
}