module.exports = (req, res) => {
  let title = '';
  let body = '';

  const data = req.flash('data')[0]; // Get the persisted form data
  if (data) {
    title = data.title || ''; // Persist title
    body = data.body || ''; // Persist body
  }

  res.render('create', {
    createPost: true,
    errors: req.flash('validationErrors'), // Pass validation errors
    title: title, // Persist title in form
    body: body // Persist body in form
  });
};
