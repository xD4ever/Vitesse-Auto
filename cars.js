const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

// GET all cars
router.get('/', async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

// GET available cars only
router.get('/available', async (req, res) => {
  const availableCars = await Car.find({ available: true });
  res.json(availableCars);
});

// UPDATE car availability
router.put('/:id/availability', async (req, res) => {
  const { available } = req.body;
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { available },
      { new: true }
    );
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

module.exports = router;
