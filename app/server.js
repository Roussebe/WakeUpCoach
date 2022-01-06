const dotenv = require('dotenv')

const express = require('express')
const session = require('express-session')
const morgan = require('morgan');
const path = require('path')
const methodOverride = require('method-override')

const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')

const passport = require('passport');
const {create} = require('express-handlebars')

console.log( "Starting up " + Date() )

dotenv.config( {path: './app/config/config.env' })

require( './config/passport' )(passport)
const PORT = process.env.PORT || 8080


connectDB()

const app = express();
const NODE_ENV = process.env.NODE_ENV || "development"


if( NODE_ENV === 'development') {
    app.use( morgan( 'dev' ) )
}

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
)

// Handlebars
const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
} = require('./helpers/hbs')

const hbs = create({
     helpers: {
      formatDate,
      stripTags,
      truncate,
      editIcon,
      select,
    },
    defaultLayout: 'simple',
    extname: '.hbs',
 })

app.engine( '.hbs', hbs.engine )
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views') )

console.log( path.join(__dirname, 'views') )

// Session & Passport
console.log( process.env.MONGO_URI )
app.use(session({ secret: 'yoursecret'
                   , resave: false
                   , saveUninitialized: false
                   , cookie: { path: '/'
                             , httpOnly: true
                             , maxAge: 365 * 24 * 3600 * 1000   // One year for example
                             }
                   , store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
                   }));
console.log( "App user done" )
 //dbStore({ filename: path.join(__dirname, '../DB/session.nedb') })

app.use(passport.initialize())
app.use(passport.session())

// Set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})


//Routes
app.use(express.static(path.join(__dirname, '../build')));
app.use('/', require('./routes/index' ))
app.use('/api', require('./routes/api'))
app.use('/auth', require('./routes/auth' ))
app.use('/stories', require('./routes/stories' ))
app.use('/rituals', require('./routes/rituals' ))
app.use('/users', require('./routes/users' ))
app.use('/habits', require('./routes/habits' ))

app.get('*', (req, res) => {
  res.redirect('/')
})

app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})

const server = app.listen( PORT, () => {
	console.log( "Server Listening on " + PORT )
})

console.log( "Done" )
