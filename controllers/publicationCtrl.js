const Publication = require("../models/publicationModel");
const User = require("../models/userModel");

const publicationCtrl = {
    createPublication: async (req, res) => {
        try {
            const { title, citation, conference, pages, publisher, description, author, year } = req.body;

            const newPublication = new Publication({
                title, citation, conference, pages, publisher, description, author, year,
                user: req.user._id,
            });
            console.log("newPublication:", newPublication);

            await newPublication.save();

            res.json({
                msg: "Created Publication!",
                newPublication: {
                    ...newPublication._doc,
                    user: req.user
                }
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getPublication: async (req, res) => {
        try {
            const publications = await Publication.find({ user: req.params.id }).populate("user", "fullname avatar");
            // console.log("publications server getPublication:", publications);

            if (!publications || publications.length === 0) {
                return res.status(404).json({ msg: "No publications found for this user" });
            }

            res.json(publications);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updatePublication: async (req, res) => {
        try {
            const { title, citation, conference, pages, publisher, description, author, year } = req.body;

            const updatedPublication = await Publication.findOneAndUpdate(
                { _id: req.params.id },
                { title, citation, conference, pages, publisher, description, author, year },
                { new: true }
            );

            console.log("updated pub", updatedPublication)

            res.json({
                msg: "Publication updated successfully",
                newPublication: updatedPublication
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deletePublication: async (req, res) => {
        try {
            const publication = await Publication.findByIdAndDelete(req.params.id);

            if (!publication) {
                return res.status(404).json({ msg: "Publication not found" });
            }

            res.json({
                msg: "Publication deleted successfully",
                deletedPublication: publication,
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getUserPublications: async (req, res) => {
        try {
            const publication = await Publication.findById(req.params.id)
                .populate("user", "fullname avatar");
            console.log("publication server:", publication);

            if (!publication) {
                return res.status(404).json({ msg: "Publication not found" });
            }

            res.json(publication);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }

};

module.exports = publicationCtrl;
