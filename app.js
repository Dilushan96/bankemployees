const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

// MySQL
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'Mohan@071',
    database        : 'bankemployees'
})

// Get all bankemployees
app.get('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from bankemployees', (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
})


// Get a bankemployees by emp_ID
app.get('/:emp_id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as emp_id ${connection.threadId}`)

        connection.query('SELECT * from bankemployees  = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
})





// Listen on enviroment port or 5000
app.listen(port, () => console.log(`Listen on port ${port}`))