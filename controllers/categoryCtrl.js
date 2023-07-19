const Category = require("../models/categoryModel");
const User = require("../models/userModel");
const Post = require("../models/postModel");

const categoryCtrl = {
    addPostToCategory: async (req, res) => {
        try {
            const { postID, topic } = req.body;

            // Tìm category với topic đã cho
            let category = await Category.findOne({ topic });

            if (!category) {
                // Nếu category chưa tồn tại, tạo category mới và thêm postID vào mảng postID
                category = new Category({
                    userID: req.user._id,
                    topic,
                    postID: [postID], // Add postID to the postID array
                });
            } else {
                // Nếu category đã tồn tại, kiểm tra xem postID đã tồn tại trong mảng postID của category chưa
                if (category.postID.includes(postID)) {
                    return res
                        .status(400)
                        .json({ msg: "Post already added to this category" });
                }

                // Thêm postID vào mảng postID của category
                category.postID.push(postID);
            }

            await category.save();

            res.json({ msg: "Post added to category", category });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    getCategories: async (req, res) => {
        try {
            const category = await Category.find({
                userID: req.params.id
            }).populate("user", "fullname avatar");;

            if (!category) {
                return res.status(404).json({ msg: "Category not found for this user" });
            }

            res.json(category);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    getCategoryById: async (req, res) => {
        try {
            const category = await Category.findById(req.params.id);

            if (!category) {
                return res.status(400).json({ msg: "Category does not exist" });
            }

            res.json(category);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const category = await Category.findOneAndDelete({
                _id: req.params.id,
                userID: req.user._id
            });

            await Post.deleteMany({ categoryID: category._id });

            res.json({ msg: "Deleted Category!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { topic, postID } = req.body;

            await Category.findOneAndUpdate({ _id: req.params.id }, {
                topic, postID
            });

            res.json({ msg: "Updated Category!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getUserCategories: async (req, res) => {
        try {
            const categories = await Category.findById(req.params.id)
                .populate("userID", "fullname avatar");
            console.log("cate", categories)
            if (!categories || categories.length === 0) {
                return res.status(404).json({ msg: "No categories found for this user" });
            }

            res.json(categories);
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
};

module.exports = categoryCtrl;