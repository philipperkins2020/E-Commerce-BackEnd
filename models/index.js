// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
    foreignKey: '',
  });


// Categories have many Products
Category.haveMany(Product, {
    foreignKey: '',

});
// Products belongToMany Tags (through ProductTag)
Tag.hasMany(Product, {
    foreignKey: '',
    onDelete: 'CASCADE',
  });
  
// Tags belongToMany Products (through ProductTag)
Product.hasMany(Tag, {
    foreignKey: 'reader_id',
    onDelete: 'CASCADE',
  });
  
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
