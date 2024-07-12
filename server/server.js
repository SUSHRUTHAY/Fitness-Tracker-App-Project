const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const entriesRoutes = require('./routes/entries');

const app = express();
app.use(cors(
    {
        origin: ["https://fitness-tracker-app-project.vercel.app"],
        methods: ["POST","GET"],
        credentials: true
    }
));
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://sushrutha22bce20392:Usv8zIH7iq4TkqDt@cluster0.gkpzr7p.mongodb.net/sushrutha22bce20392?retryWrites=true&w=majority&appName=Cluster0');

mongoose.connect('mongodb://0.0.0.0:27017/fitness-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Successfully connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

app.use('/api/auth', authRoutes);
app.use('/api/entries', entriesRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});