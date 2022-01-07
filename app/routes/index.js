const express = require( 'express' )
const moment = require( 'moment' )
const router = express.Router()

const { ensureAuth, ensureGuest } = require( './middleware' )
const Ritual = require( '../models/Ritual' )
const User = require('../models/User' )
const Habit = require('../models/Habit')

/*
router.get('/', ensureGuest, (req, res) => {
    res.render('login', { layout: 'login' })
})
*/

router.get('/jwtid', ensureAuth, async (req, res) => {
  res.send( req.user._id )
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
  console.log("DEPRECATED... Use api.js GET /api/user instead")
  console.log("Getting basic profile for ", req.user )
  try {
    const rituals = await Ritual.find( { user: req.user._id } ).lean()
    const user = await User.findOne( { _id: req.user._id } )

    console.log( "Rituals ", rituals )
    console.log( "User", user )

    const today = new Date().toLocaleDateString()
    console.log( "Today : " + today )

    let obj = {
      name: user.firstName,
      id: user._id,

      rituals: rituals.map( r => {
        console.log( r )
        let habits = r.habits
        console.log( habits )

        if( r.history && r.history.habits[today] ) {
          const achievements = r.history.habits[today]
          habits = habits.map( habit => {
            console.log( habit._id )
            if( achievements.find( (achieve) => { return habit._id.equals( achieve.habit ) } )) {
              console.log( "Achieved")
              habit.achieved = true
            }
            console.log( "Habit", habit )
            return habit
          })
        }
        console.log( "New achievement", habits )
        return {
          key: r._id,
          title: r.title,
          time: r.time,
          habits: habits
        }
      } )
    }

    console.log( obj )

    res.send( obj )

  } catch( err ) {
    console.error( err )
    res.status( "500" ).send()
  }
})


router.get('/api/list_habits', ensureAuth, async (req, res) => {
    try {
        const habits = await Habit.find( { } ).lean()
        console.log( habits )
        res.send({ habits })
    } catch( err ) {
        console.error( err )
        res.sendStatus( 500 )
    }
})

module.exports = router
