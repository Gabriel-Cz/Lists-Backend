import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const listSchema = new Schema({
    list_title: {
        type: String,
    },
    list_items: {
        type: Array,
        listItem: {
            type: String,
            itemCheckout: {
                default: false,
            }
        }
    },
    date: {type: "Date", default: Date.now},
    userId: {
        type: String,
    }
});

const List = mongoose.model('List', listSchema);

export default List;