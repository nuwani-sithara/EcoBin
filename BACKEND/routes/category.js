const router = require("express").Router();
let Category = require("../models/Category");

// Add Category
router.route("/add-category").post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;

    const newCategory = new Category({
        name,
        description
    });

    newCategory.save()
        .then(() => res.json("Category Added"))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

// View All Categories
router.route("/view-categories").get((req, res) => {
    Category.find()
        .then(categories => res.json(categories))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

// Update Category
router.route("/update-category/:categoryId").put(async (req, res) => {
    let categoryId = req.params.categoryId;
    const { name, description } = req.body;

    const updateCategory = { name, description };

    try {
        await Category.findByIdAndUpdate(categoryId, updateCategory);
        res.status(200).send({ status: "Category Updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating category", error: err.message });
    }
});

// Delete Category
router.route("/delete-category/:categoryId").delete(async (req, res) => {
    let categoryId = req.params.categoryId;

    try {
        await Category.findByIdAndDelete(categoryId);
        res.status(200).send({ status: "Category Deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with deleting category", error: err.message });
    }
});

// Fetch Single Category
router.route("/get-category/:categoryId").get(async (req, res) => {
    let categoryId = req.params.categoryId;

    try {
        const category = await Category.findById(categoryId);
        res.status(200).send({ status: "Category Fetched", category });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with fetching category", error: err.message });
    }
});

module.exports = router;
