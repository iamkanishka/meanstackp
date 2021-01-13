const express = require('express')
const router = express.Router()
const Persons = require('../models/persons')


router.get('/:uuid', async (req, res) => {
    try {
        const allusers = await Persons.find({
'userid': String(req.params.uuid),
         
        })

        res.json(allusers)
    } catch (err) {
        res.send('Error ' + err)
    }
})


router.post('/', async (req, res) => {
    try {
        const addfar = await new Persons({
            fullname: req.body.fullname,
     
            age: req.body.age,
            gender: req.body.gender,
            phone: req.body.phone,

            userid:req.body.userid
           


        }).save();

        res.json({
            status: "done"
        })

    } catch (err) {
        res.send('Error' + err)
    }
})

router.patch('/:id', async (req, res) => {


    try {
        const euser = await Persons.findById(req.params.id)
        euser.fullname= req.body.fullname,
 euser.age= req.body.age,
        euser.gender= req.body.gender
        euser.phone= req.body.phone

        const a1 = await euser.save()
        res.json({
            status: "done"
        })
    } catch (err) {
        res.send('Error')
    }

})






router.delete('/:id', async (req, res) => {
    try {
        const dalien = await Persons.findByIdAndDelete(req.params.id)
        res.json(dalien)

    } catch (err) {
        res.send('Error' + err)
    }
})







module.exports = router