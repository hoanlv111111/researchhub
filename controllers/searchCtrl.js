const Posts = require("../models/postModel")
const Comments = require("../models/commentModel")
const Users = require("../models/userModel")

const searchCtrl = async (req, res) => {
    try {
        const searchTerm = req.query.q;
        const type = req.query.type;

        let results = [];
        if (!searchTerm) {
            return res.status(400).json({ message: 'Search term is required' });
        }
        if (type === 'post') {
            try {
                const posts = await Posts.find({
                    $text: { $search: searchTerm }
                })
                    .sort("-createdAt")
                    .select('content images likes comments user')
                    .populate("user", "fullname username avatar")
                    .exec();
                console.log(posts);
                res.json({ posts });
            } catch (err) {
                return res.status(500).json({ message: err.message });
            }
        }
        // else if (type === 'hashtag') {
        //     try {
        //         const posts = await Posts.find({ hashtag: { $regex: searchTerm, $options: 'i' } })
        //             .sort("-createdAt")
        //             .select('content images likes comments user')
        //             .populate("user", "fullname username avatar")
        //             .exec();
        //         console.log(posts);
        //         res.json({ posts });
        //     } catch (err) {
        //         return res.status(500).json({ message: err.message });
        //     }
        // }
        else if (type === 'user') {
            try {
                results = await Users.find({ username: { $regex: searchTerm, $options: 'i' } })
                    .select("fullname username avatar");
                console.log(results);
                res.json({ users: results });
            } catch (err) {
                return res.status(500).json({ message: err.message });
            }
        } else {
            return res.status(400).json({ message: 'Invalid search type' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while searching." });
    }
};

module.exports = searchCtrl;
