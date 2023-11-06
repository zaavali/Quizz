const express = require ('express')
const app = express()
const question = require ('./question.json')
const mariadb = require('mariadb');
let cors = require('cors')

require('dotenv').config()

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DTB,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    port:process.env.DB_PORT

});

app.use(express.json())
app.use(cors())


app.get('/question', async(req, res) =>{
    let conn;
    try {
        
        conn = await pool.getConnection();
       
        const rows= await conn.query('SELECT * FROM questions');
       
        res.status(200).json(rows)
    }
   catch(err){
    console.log(err)
   }
})

app.get('/question/:id',(req, res) => {
    const id = parseInt(req.params.id)
    const laQuestion = question.find(question => question.id === id)
    res.status(200).json(laQuestion)
})

app.post('/question', (req,res) =>{
    question.push(req.body)
    res.status(200).json(question)
})

app.put('/question', async(req, res) =>{
    let conn;
    try {
        
        conn = await pool.getConnection();
       
        const rows= await conn.query("UPDATE questions SET theme= '', question='', reponse='' WHERE id='',");
       
        res.status(200).json(rows)
    }
   catch(err){
    console.log(err)
   }
})
/*app.delete('/question/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id)
    await db.query('DELETE FROM question WHERE id=' + id, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error');
        } else {
            res.status(200).json(results);
        }
    });
});*/



app.listen(8000, () => {
    console.log("serveur a l'ecoute")
})
