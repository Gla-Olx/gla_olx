const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const itemRoutes = require('./routes/itemRoutes');
const userItemRoutes = require('./routes/userItemRoutes');
const wishListRoutes = require('./routes/wishlistRoutes');
const searchItemRoutes = require('./routes/searchItemRoutes');
const createChattingWithRoutes = require('./routes/createChattingWithRoutes');
const chattingWithRoutes = require('./routes/chattingWithRoutes');
const singleItemRoutes = require('./routes/getSingleItemRoutes');
const categoryItemRoutes = require('./routes/categoryItemRoutes');

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api/item', itemRoutes);
app.use('/api/user-item', userItemRoutes);
app.use('/api/wishlist', wishListRoutes);
app.use('/api/search-item', searchItemRoutes);
app.use('/api/addchattingwith', createChattingWithRoutes);
app.use('/api/chattingwith', chattingWithRoutes);
app.use('/api/single-item', singleItemRoutes);
app.use('/api/category', categoryItemRoutes);




const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});