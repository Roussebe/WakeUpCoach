const express = require( 'express' )
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

    let obj = {
      name: user.firstName,
      id: user._id,
      rituals: rituals.map( r => { return { title: r.title, time: r.time } } )
    }

    res.send( obj )

  } catch( err ) {
    res.status( "500" ).send()
  }
})

module.exports = router
