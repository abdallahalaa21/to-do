const todosInputs = {
  all: { where: {} },
  completed: { where: { completed: true } },
  active: { where: { completed: false } }
};

export default todosInputs;
