const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'] },
    logo: {
        type: String,
        required: [true, "Team logo is required"],
        trim: true,
    },
    slug: { type: String, required: [true, 'Slug is required'],unique: true },
}, { timestamps: true });

categorySchema.pre("findOneAndDelete", async function (next) {
    const category = await this.model.findOne(this.getFilter());
    if (category) {
      await mongoose.model("Game").deleteMany({ category: category._id });
    }
    next();
});

module.exports = mongoose.model('Category', categorySchema);