const db = require('./db')

const User = require('./models/User')
const Comment = require('./models/Comment')
const Gift = require('./models/Gift')
const Holiday = require('./models/Holiday')
const Recipient = require('./models/Recipient')
const Preference = require('./models/Preference')
const Note = require('./models/Note')

//associations could go here!

User.belongsToMany(Recipient, {through: Note})
Recipient.belongsToMany(User, {through: Note})

Recipient.hasMany(Preference)
Preference.belongsTo(Recipient)

Recipient.hasMany(Holiday)
Holiday.belongsTo(Recipient)

User.hasMany(Note)
Note.belongsTo(User)

Recipient.hasMany(Note)
Note.belongsTo(Recipient)

Recipient.belongsToMany(Gift, {through: "giftHistory"})
Gift.belongsToMany(Recipient, {through: "giftHistory"})

module.exports = {
  db,
  models: {
    User,
    Comment,
    Gift,
    Holiday,
    Recipient,
    Preference,
    Note
  },
}

