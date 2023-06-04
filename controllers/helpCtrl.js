const Help = require('../models/helpModel');

const helpCtrl = {
    createHelp: async (req, res) => {
        try {
            const { title, content, category } = req.body;

            const newHelp = new Help({
                title: title.toLowerCase(),
                content,
                category,
                user: req.user._id,
            });

            await newHelp.save();

            res.json({ msg: "Created a help" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getHelps: async (req, res) => {
        try {
            const helps = await Help.find({ user: req.user._id });

            res.json({ helps });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getHelp: async (req, res) => {
        try {
            const help = await Help.findById(req.params.id);
            if (!help) return res.status(400).json({ msg: "This help does not exist." });

            res.json({ help });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateHelp: async (req, res) => {
        try {
            const { title, content, category } = req.body;

            await Help.findOneAndUpdate(
                { _id: req.params.id },
                { title: title.toLowerCase(), content, category }
            );

            res.json({ msg: "Updated a help" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteHelp: async (req, res) => {
        try {
            await Help.findByIdAndDelete(req.params.id);

            res.json({ msg: "Deleted a help" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = helpCtrl;
