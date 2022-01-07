const express = require( 'express' )
const router = express.Router()
const { ensureAuth, adminAuth } = require( '../middleware' )

const Habit = require( '../../models/Habit' )
const User = require( '../../models/User' )
const Ritual = require( '../../models/Ritual' )


router.get('/', ensureAuth, async (req, res) => {
  console.log("Getting rituals for ", req.user )
  const rituals = await Ritual.find( { user: req.user._id } ).lean()
  res.send( { rituals } )
})

router.post('/upd_habit/:rid', ensureAuth, async (req, res) => {
    console.log( "Adding habit(s) to ritual " + req.params.rid )
    let user = await User.findOne( { _id: req.user._id } ).lean()
    let ritual = await Ritual.findOne( { _id: req.params.rid } ).lean()
    let habits = await Habit.find( {} ).lean()

    if( !user || !ritual || !habits )
        return res.status( 404 ).send() // res.render('error/404')

    if( ! ritual.user.equals( req.user._id ) ) return res.status( 401 ).send() //res.render( 'error/401' )

    console.log( req.body )

    if( !req.body.data ) return res.status( 400 ).send()

    let newSetting = req.body.data.map( (data) => {
      let habit = habits.find( h => h._id.equals( data._id ) )
      if( habit )
        return { _id: habit._id, title: habit.title }
    })

    console.log( "New habits: ", newSetting )

    ritual.habits = newSetting

    await Ritual.updateOne( { _id: ritual._id }, ritual )

    res.send( { ritual } )
})



module.exports = router
