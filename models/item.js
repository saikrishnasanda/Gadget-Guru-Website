const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
        itemcategory:{type:String, required:[true,'category is required']},
        itemname: {type: String, required:[true,'name is required']},
        status:{type:String, required:[true,'status is required']},
        image:{type:String, required:[true,'imageurl is required']},
        details:{type:String, required:[true,'details are required'],
                minlength:[10,'the content should have atleast 10 characters']},
    },
{timestamps: true}
);


const Story = mongoose.model('Story', productSchema);

module.exports = mongoose.model('Story', productSchema);
