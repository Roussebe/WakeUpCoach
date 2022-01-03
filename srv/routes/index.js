const express = require( 'express' )
const moment = require( 'moment' )
const router = express.Router()
const { ensureAuth, ensureGuest } = require( './middleware' )
const Ritual = require( '../models/Ritual' )
const User = require('../models/User' )

router.get('/', ensureGuest, (req, res) => {
    res.render('login', { layout: 'login' })
})

router.get('/dashboard', ensureAuth, async (req, res) => {
    console.log("Dashboard page ", req.user )
    try {
        const rituals = await Ritual.find( { user: req.user._id } ).lean()
        const user = await User.findOne( {_id: req.user._id })
        console.log( "Rituals" , rituals )
        res.render( 'dashboard_new', {
            layout: 'basic',
            name: req.user.firstName,
            usr: user,
            rituals,
        })
    } catch( err ) {
        res.render('error/500')
    }
})

router.get('/api/basic_profile', ensureAuth, async(req, res) => {
  console.log("Getting basic profile for ", req.user )
  try {
    const rituals = await Ritual.find( { user: req.user._id } ).lean()
    const user = await User.findOne( { _id: req.user._id } )

    console.log( rituals )

    let obj = {
      name: user.firstName,
      id: user._id,
      rituals: rituals.map( r => { return { key: r._id, title: r.title, time: r.time, habits: r.habits } } )
    }

    console.log( obj )

    res.send( obj )

  } catch( err ) {
    res.status( "500" ).send()
  }
})

router.post('/api/data', ensureAuth, async(req, res) => {
  console.log( "New today's habit ", req.body )
  try {
    const user = await User.findOne( { _id: req.user._id }).lean()
    console.log( user )
    if( !user ) return res.sendStatus( 404 ) //render('error/404')

    if( ! user._id.equals( req.user._id ) ) res.sendStatus( 401 ) // res.redirect('/users')

    if( !user.todaysHabit || moment(user.todaysHabit.date) <  moment().subtract( 5, "minutes" ) )  {
      console.log( "Reset habits" )

      // Save previous achievements in history
      if( user.todaysHabit ) {
        if( !user.history ) { user.history = [] }
        user.history.push({
          date: user.todaysHabit.date,
          habits: user.todaysHabit.habits.length
        })
      }

      user.todaysHabit = {
        date: new Date(),
        habits: []
      }
    }

    if( ! user.todaysHabit.habits.find( (h) => { return h.id == req.body.params.habit._id }))
      user.todaysHabit.habits.push( { date: new Date(), id: req.body.params.habit._id })

    console.log( user.todaysHabit )

    await User.updateOne( { _id: req.user._id }, user )

    res.send( { status: "ok" } ) //res.render('users/edit', {show_user} )
  } catch( err ) {
    console.error( err )
    return res.sendStatus( 500 ) //res.render('error/500')
  }

})

module.exports = router
