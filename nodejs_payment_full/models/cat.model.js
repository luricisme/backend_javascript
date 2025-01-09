const db = require('../config/db')('public');

module.exports = {
    allCategories: async () => {
        try {
            const categories = await db.all('Categories'); 
            return categories;  
        } catch (err) {
            throw new Error(`Error get all categories: ${err.message}`);
        }
    },
}