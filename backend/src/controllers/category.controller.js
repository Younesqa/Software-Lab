let categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Clothing" },
];

exports.getAllCategories = (req, res) => {
  res.json(categories);
};

exports.createCategory = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });
  
  const newCategory = { id: categories.length + 1, name };
  categories.push(newCategory);
  res.status(201).json(newCategory);
};

exports.updateCategory = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = categories.find(c => c.id === parseInt(id));
  if (!category) return res.status(404).json({ message: "Category not found" });

  category.name = name || category.name;
  res.json(category);
};

exports.deleteCategory = (req, res) => {
  const { id } = req.params;
  const index = categories.findIndex(c => c.id === parseInt(id));
  if (index === -1) return res.status(404).json({ message: "Category not found" });

  const deleted = categories.splice(index, 1);
  res.json({ message: "Category deleted", category: deleted[0] });
};
