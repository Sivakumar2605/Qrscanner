import mongoose from 'mongoose';

const scannedUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  qrUrl: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  ipAddress: {
    type: String,
    required: true,
  }
});

const ScannedUser = mongoose.model('ScannedUser', scannedUserSchema);

export default ScannedUser;
