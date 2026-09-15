const mongoose = require("mongoose");
const { Schema } = mongoose;

const connectionRequestSchema = new Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required : true
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required : true
  },
  status: {
    type: String,
    enum: ['ignore', 'accepted', 'rejected', "interested"],
    default: 'pending',
    required : true
  }
}, { 
timestamps: true
});
  
connectionRequestSchema.index({ fromUser: 1, toUser: 1 }, { unique: true });

connectionRequestSchema.pre('save', async function() {

  if(this.fromUser.equals(this.toUser)) {
    throw new Error('A user cannot send a connection request to themselves.');
  }

  const existingRequest = await mongoose.model('ConnectionRequest').findOne({
    $or: [
      { fromUser: this.fromUser, toUser: this.toUser },
      { fromUser: this.toUser, toUser: this.fromUser }
    ],
  });

  if (existingRequest) {
    throw new Error('A connection request already exists between these users.');
  }
})

const ConnectionRequest = mongoose.model('ConnectionRequest', connectionRequestSchema);

module.exports = ConnectionRequest;