const express = require( 'express' )
const router = express.Router()
const moment = require( 'moment' )
const { ensureAuth } = require( './middleware' )
const User = require( '../models/User' )
const Ritual = require( '../models/Ritual' )
const Habit = require( '../models/Habit' )

router.get('/', ensureAuth, async (req, res) => {
    try {
        console.log( "GET Rituals" )
        const rituals = await Ritual.find( { user: req.user._id } ).lean()
        console.log( "Rituals ", rituals )
        res.render( 'rituals/index', { layout: 'simple', rituals })
    } catch( err ) {
        console.error( err )
        res.render('error/500')
    }
})

router.get('/add', ensureAuth, (req, res) => {
console.log( "Rituals GET /add" )
    res.render('rituals/add')
})

router.get('/:id', ensureAuth, async (req, res) => {
  try {
    console.log( "Ritual GET ID" )
    let ritual = await Ritual.findOne({ _id: req.params.id }).lean()
    let user = await User.findOne( {_id: ritual.user} ).lean()

    ritual.user = user

    if (!ritual) {
      return res.render('error/404')
    }

    if (ritual.user._id != req.user._id && ritual.status == 'private') {
      res.render('error/404')
    } else {
      console.log( user )
      console.log( user.todaysHabit )
      if( user.todaysHabit && moment(user.todaysHabit.date) > moment().subtract(5, "minutes" ) ) {
        ritual.habits = ritual.habits.map( (h) => {
          console.log( "H", h )
          let user_habit = user.todaysHabit.habits.find( (uh) => { console.log( "UH", uh ) ; return h._id.equals( uh.id ) })
          if( user_habit ) {
            h.selected = true
          }
          return h
        })
      }
      console.log( "Ritual" , ritual )
      res.render('rituals/show', {
        ritual,
      })
    }
  } catch (err) {
    console.error(err)
    res.render('error/404')
  }
})

router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
      console.log( "Edit ritual " + req.params.id )
        let user = await User.findOne( { _id: req.user._id } )
        if( !user.admin ) return res.render('error/401')

        const ritual = await Ritual.findOne( { _id: req.params.id }).lean()
        if( !ritual ) return res.render('error/404')

        res.render('rituals/edit', {ritual} )
    } catch( err ) {
        console.error( err )
        return res.render('error/500')
    }
})

router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user._id
        await Ritual.create(req.body)
        res.redirect('/dashboard')
    } catch( err ) {
        console.error(err)
        res.render('error/500')
    }
})

router.put('/:id', ensureAuth, async (req, res) => {
    console.log( "Rituals Put " + req.params.id )
    let user = await User.findOne( { _id: req.user._id } )
    let upd_ritual = await Ritual.findOne( { _id: req.params.id } )

    if( !user || !upd_ritual ) return res.render('error/404')

    console.log( upd_ritual )
    console.log( req.body )


    if( upd_ritual.user != req.user._id && !user.admin ) res.redirect('/habit')  //For the moment, can only update yourself
    else  {
        upd_ritual.title = req.body.title
        upd_ritual.status = req.body.status
        upd_ritual.body = req.body.body
        console.log( upd_ritual )
        await Ritual.update( {_id: req.params.id}, upd_ritual )
        res.redirect('/rituals')
    }
})

router.get('/list_to_add/:rid', ensureAuth, async (req, res) => {
    console.log( "Listing habits to add to ritual " + req.params.rid + " from " + req.user._id )
    let user = await User.findOne( { _id: req.user._id } ).lean()
    let ritual = await Ritual.findOne( { _id: req.params.rid } ).lean()
    let habits = await Habit.find( { } ).lean()

    console.log( "User " , user )
    console.log( "Ritual " , ritual )
    console.log( "Habits ", habits )

    if( !user || !ritual || !habits )
        return res.sendStatus( 404 ) // res.render('error/404')

    if( !ritual.user.equals(req.user._id) ) return res.sendStatus( 401 ) //res.render( 'error/401' )

    ritual.habits.map( (h) => {
      let ritual_habit = habits.find( rh => rh._id.equals(h._id) )
      if( ritual_habit ) {
        ritual_habit.selected = true
      }
      return h
    })

    console.log( "Habits ", habits )
    console.log( user._id )

    res.send( habits )
})


router.delete('/delete_habit/:idr/:idh', ensureAuth, async (req, res ) => {
    console.log( "Delete an habit from this ritual " + req.params.idr + " " + req.params.idh )
    let user = await User.findOne( { _id: req.user._id } )
    let ritual = await Ritual.findOne( { _id: req.params.idr } )

    if( !user || !ritual )
        return res.render('error/404')

    if( ritual.user.equals( req.user._id ) ) res.render( 'error/401' )

    if( ritual.habits ) {
        let to_delete = ritual.habits.find( r => r._id == req.params.idh )
        console.log( to_delete )
    }

    res.redirect('/rituals/' + req.params.idr)
})

module.exports = router
