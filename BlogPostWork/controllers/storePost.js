const BlogPost = require("../models/BlogPost");
const path = require("path");

module.exports = async (req, res) => {
  const { title, body } = req.body; // Get title and body from request
  const image = req.files?.image; // Use optional chaining to avoid errors if image doesn't exist
  const formData = { title, body }; // Prepare form data for persistence

  // Validate required fields
  const errors = [];
  if (!title) errors.push("Please provide a title");
  if (!body) errors.push("Please provide the body content");
  if (!image) errors.push("Please upload an image");

  // If there are validation errors, flash the errors and redirect back
  if (errors.length > 0) {
    req.flash("validationErrors", errors);
    req.flash("data", formData);
    return res.redirect("/posts/new");
  }

  // Move the uploaded image
  image.mv(
    path.resolve(__dirname, "..", "public/assets/img", image.name),
    async (error) => {
      if (error) {
        req.flash("validationErrors", ["Image upload failed"]);
        req.flash("data", formData);
        return res.redirect("/posts/new");
      }

      try {
        // Create new blog post
        await BlogPost.create({
          ...formData,
          image: "/assets/img/" + image.name,
          userid: req.session.userId,
        });
        res.redirect("/");
      } catch (error) {
        const validationErrors = Object.keys(error.errors).map(
          (key) => error.errors[key].message
        );

        // Flash the validation errors and persist form data
        req.flash("validationErrors", validationErrors);
        req.flash("data", formData);
        res.redirect("/posts/new");
      }
    }
  );
};
