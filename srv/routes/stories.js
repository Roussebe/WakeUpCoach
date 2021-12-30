const express = require( 'express' )
const router = express.Router()
const { ensureAuth } = require( './middleware' )
const Story = require( '../models/Story' )
const User = require( '../models/User' )

router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add')
})

router.post('/', ensureAuth, async (req, res) => {
    try {
        console.log( "Stories / ")
        req.body.user = req.user._id
        await Story.create(req.body)
        res.redirect('/dashboard')
    } catch( err ) {
        console.error(err)
        res.render('error/500')
    }
})

router.get('/', ensureAuth, async (req, res) => {
    try {
        let stories = await Story.find( { status: 'public' })
          .populate('User')
          .sort( { createdAt: 'desc' } )
          .lean()

        console.log( stories )
        res.render( 'stories/index', { stories } )
    } catch ( err ) {
        console.error( err )
        res.render('error/500')
    }
})

router.get('/:id', ensureAuth, async (req, res) => {
  try {
    console.log( "GET " + req.params.id )
    let story = await Story.asyncFindOne({ _id: req.params.id })
    console.log( "Story " , story )
    let user = await User.asyncFindOne( {_id: story.user} )
    console.log( "User " , user )
    story.user = user

    if (!story) {
      return res.render('error/404')
    }

    if (story.user._id != req.user._id && story.status == 'private') {
      res.render('error/404')
    } else {
      res.render('stories/show', {
        layout: 'main',
        story,
      })
    }
  } catch (err) {
    console.error(err)
    res.render('error/404')
  }
})

router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
        const story = await Story.asyncFindOne( { _id: req.params.id })

        if( !story ) return res.render('error/404')

        if( story.user != req.user._id ) res.redirect('/stories')
        else  res.render('stories/edit', {layout: 'main', story} )
    } catch( err ) {
        console.error( err )
        return res.render('error/500')
    }
})

router.put('/:id', ensureAuth, async (req, res) => {
    let story = await Story.asyncFindOne( { _id: req.params.id } )
    if( !story ) return res.render('error/404')

    if( story.user != req.user._id ) res.redirect('/stories')
    else  {
        story = await Story.asyncUpdate( {_id: req.params.id}, req.body )
        res.redirect('/stories')
    }
})

router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    let story = await Story.asyncFindOne({_id: req.params.id})
    if (!story) {
      return res.render('error/404')
    }

    if (story.user != req.user._id) {
      res.redirect('/stories')
    } else {
      await Story.asyncRemove({ _id: req.params.id })
      res.redirect('/dashboard')
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})


module.exports = router
