const fs = require('fs');

const mongoose = require('mongoose');
const Product = require('./models/Product');

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

const products = JSON.parse(fs.readFileSync(`${__dirname}/_data/products.json`, 'utf-8'));


const importData = async () => {
	try {
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
	
		console.log('Data Deleted...'.red.inverse);
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
