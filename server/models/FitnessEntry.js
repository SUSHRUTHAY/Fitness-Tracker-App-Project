const mongoose = require('mongoose');

const FitnessEntrySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    activityName: { type: String, required: true },
    caloriesBurned: { type: Number, required: true },
    duration: { type: Number, required: true },
    intensity: { type: String, required: true },
    activityDate: { type: Date, required: true }
});

module.exports = mongoose.model('FitnessEntry', FitnessEntrySchema);