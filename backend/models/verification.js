var mongoose = require('mongoose');

const VerificationSchema = new mongoose.Schema({
    token:
    {
        type: String
    },
    value:
    {
        type: Object
    },
    expireAt:
    {
        type: Date,
        default: Date.now(),
    }
},{
    timestamps: true
});

VerificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1800 });

module.exports = mongoose.model('Verification', VerificationSchema);
