const express = require( 'express' )
const moment = require( 'moment' )
const router = express.Router()
const { ensureAuth, ensureGuest } = require( './middleware' )
const Ritual = require( '../models/Ritual' )
const User = require('../models/User' )
const Habit = require('../models/Habit')
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

router.post('/api/data', ensureAuth, async(req, res) => {
  console.log( "New today's habit ", req.body )
  try {
    const params = req.body.params
    if( !params ) return res.sendStatus( 404 )

    const today = new Date().toLocaleDateString()
    console.log( "Today : " + today )

    const user = await User.findOne( { _id: req.user._id }).lean()
    console.log( "User", user )
    if( !user ) return res.sendStatus( 404 ) //render('error/404')

    const ritual = await Ritual.findOne( { _id: params.ritual.key } ).lean()
    console.log( "Ritual", ritual )

    if( ! user._id.equals( ritual.user ) ) res.sendStatus( 401 ) // res.redirect('/users')

    if( !ritual.history ) {
      console.log( "Create ritual history" )

      ritual.history = {
        lastUpdateDate: today,
        habits: {}
      }
    } else {
      const hist_len = 10
      let allow_date = []
      let today = new Date()

      for( let i = 0; i < hist_len ; i++ ) {
        allow_date.push( today.toLocaleDateString() )
        today.setDate( today.getDate() - 1 )
      }

      console.log( "Allow: " , allow_date )
      for( key of Object.keys(ritual.history.habits ) ) {
        if( ! allow_date.find( (ad) => ad == key ) ) {
          console.log( "Remove " + key )
          delete ritual.history.habits[ key ]
        }
      }
    }

    console.log( "Ritual history", ritual.history )
    let achievements = ritual.history.habits[ today ]
    if( !achievements ) {
      achievements = [ ]
    }

    if( ! achievements.find( (a) => { return a.habit == params.habit._id })) {
      achievements.push( { habit: params.habit._id } )
      ritual.history.habits[ today ] = achievements
      ritual.history.lastUpdateDate = today
      console.log( "New ritual ", ritual )
      console.log( "Ritual history", ritual.history.habits )
      await Ritual.updateOne( {_id: ritual._id }, ritual )
    } else {
      console.log( "Don't add habit for today... TODO: avoid double click on UI :-)")
    }

    res.send( { status: "ok" } ) //res.render('users/edit', {show_user} )
  } catch( err ) {
    console.error( err )
    return res.sendStatus( 500 ) //res.render('error/500')
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
