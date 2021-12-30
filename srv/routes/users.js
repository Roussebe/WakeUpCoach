const express = require( 'express' )
const router = express.Router()
const { ensureAuth } = require( './middleware' )
const Ritual = require( '../models/Ritual' )
const User = require( '../models/User' )
const moment = require('moment')

router.get('/', ensureAuth, async (req, res) => {
    try {
        console.log( "GET Users" )
        const users = await User.find( { } ).lean()
        console.log( users )
        res.render( 'users/index', { layout: 'simple', users })
    } catch( err ) {
        console.error( err )
        res.render('error/500')
    }
})

router.get('/:id', ensureAuth, async (req, res) => {
  try {
    console.log( "GET User with id " + req.params.id )
    let show_user = await User.findOne( {_id: req.params.id} ).lean()
    console.log( show_user )

    if (!show_user) {
      return res.render('error/404')
    }

    if ( ! show_user._id.equals( req.user._id ) ) {
      res.render('error/404')
    } else {
        res.render('users/show', {
        show_user,
      })
    }
  } catch (err) {
    console.error(err)
    res.render('error/404')
  }
})

router.get('/add', ensureAuth, (req, res) => {
    res.render('rituals/add')
})

router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
        const show_user = await User.asyncFindOne( { _id: req.params.id }).lean()
        console.log( show_user )

        if( !show_user ) return res.render('error/404')

        if( ! show_user._id.equals( req.user._id ) ) res.redirect('/users')
        else res.render('users/edit', {show_user} )
    } catch( err ) {
        console.error( err )
        return res.render('error/500')
    }
})

router.put('/:id', ensureAuth, async (req, res) => {
    let curr_user = await User.findOne( { _id: req.user._id } ).lean()

    let edit_user = await User.findOne( { _id: req.params.id } ).lean()
    if( !edit_user ) return res.render('error/404')

    if( ! req.user._id.equals( req.params.id ) && !curr_user.admin ) {
        //Only myself or an admin can change a my profile
        res.redirect('/users')
    } else  {
        if( curr_user.admin ) {  // Only an admin can change those parameters
            if( req.body.useradmin == "on" ) edit_user.admin = true
            else edit_user.admin = false
        }

        edit_user.displayName = req.body.name
        edit_user.body = req.body.body

        await User.updateOne( {_id: req.params.id}, edit_user )
        res.redirect('/users')
    }
})

/*
let postData = {
  id: selBtn.id,
  done: selBtn.checked
}
ajaxPost( "/users/todays_habits/{{_id}}", postData, (data) => { console.log( "Done ", data )})
*/
router.post('/todays_habits/:id', ensureAuth, async (req, res) => {
  console.log( "New today's habit ", req.body )
  try {
    const user = await User.asyncFindOne( { _id: req.user._id })
    console.log( user )
    if( !user ) return res.sendStatus( 404 ) //render('error/404')

    if( ! user._id.equals( req.user._id ) ) res.sendStatus( 401 ) // res.redirect('/users')

    if( !user.todays_habit || moment(user.todays_habit.date) <  moment().subtract( 5, "minutes" ) )  {
      console.log( "Reset habits" )

      if( !user.history ) { user.history = [] }
      user.history.push({
        date: user.todays_habit.date,
        habits: user.todays_habit.habits.length
      })

      user.todays_habit = {
        date: new Date(),
        habits: []
      }
    }

    if( ! user.todays_habit.habits.find( (h) => { return h.id == req.body.id.substring(6) }))
      user.todays_habit.habits.push( { date: new Date(), id: req.body.id.substring( 6 ) })
      else {
        console.log( "avoid duplicates" )
      }
    //console.log( user )
    console.log( user.todays_habit )

    await User.updateOne( { _id: req.user._id }, user )

    res.send( { status: "ok" } ) //res.render('users/edit', {show_user} )
  } catch( err ) {
    console.error( err )
    return res.sendStatus( 500 ) //res.render('error/500')
  }
})

module.exports = router
