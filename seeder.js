const fs = require('fs');

const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
const Category = require('./models/Category');

require('dotenv').config();

mongoose.connect(
	process.env.MONGO_URI,
	{
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: true
	},
	() => {
		console.log(`MongoDB Connected `);
	}
);

const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'));
const categories = JSON.parse(fs.readFileSync(`${__dirname}/_data/categories.json`, 'utf-8'));
const products = JSON.parse(fs.readFileSync(`${__dirname}/_data/products.json`, 'utf-8'));



const importData = async () => {
	try {
		// await User.create(users);
		// await Category.create(categories);
		await Product.create(products);
		console.log('Data Imported...');
		process.exit();
	} catch (error) {
		console.log(error);
	}
};

const deleteData = async () => {
	try {
		await Product.deleteMany();
		await Category.deleteMany();
		await User.deleteMany();
	
		console.log('Data Deleted...');
		process.exit();
	} catch (error) {
		console.log(error);
	}
};

if (process.argv[2] === '-i') {
	importData();
} else if (process.argv[2] === '-d') {
	deleteData();
}
