const express = require('express');
const jwt = require('jsonwebtoken');
const FitnessEntry = require('../models/FitnessEntry');
const User = require('../models/User');

const router = express.Router();

const authenticate = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ error: 'Not authenticated' });
    }
    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.user = decoded.userId;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Not authenticated' });
    }
};

router.post('/', authenticate, async(req, res) => {
    const { activityName, caloriesBurned, duration, intensity, activityDate } = req.body;
    try {
        const newEntry = new FitnessEntry({
            userId: req.user,
            activityName,
            caloriesBurned,
            duration,
            intensity,
            activityDate
        });
        await newEntry.save();
        res.status(201).send(newEntry);
    } catch (error) {
        res.status(500).send({ error: 'Server error' });
    }
});

router.get('/', authenticate, async(req, res) => {
    try {
        const entries = await FitnessEntry.find({ userId: req.user });
        res.send(entries);
    } catch (error) {
        res.status(500).send({ error: 'Server error' });
    }
});

router.put('/:id', authenticate, async(req, res) => {
    const { id } = req.params;
    const { activityName, caloriesBurned, duration, intensity, activityDate } = req.body;
    try {
        const updatedEntry = await FitnessEntry.findOneAndUpdate({ _id: id, userId: req.user }, { activityName, caloriesBurned, duration, intensity, activityDate }, { new: true });
        if (!updatedEntry) {
            return res.status(404).send({ error: 'Entry not found' });
        }
        res.send(updatedEntry);
    } catch (error) {
        res.status(500).send({ error: 'Server error' });
    }
});

router.delete('/:id', authenticate, async(req, res) => {
    const { id } = req.params;
    try {
        const deletedEntry = await FitnessEntry.findOneAndDelete({ _id: id, userId: req.user });
        if (!deletedEntry) {
            return res.status(404).send({ error: 'Entry not found' });
        }
        res.send(deletedEntry);
    } catch (error) {
        res.status(500).send({ error: 'Server error' });
    }
});

module.exports = router;