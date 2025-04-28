const LIST_TYPES = {
  BACKLOG: "Backlog",
  TODO: "Ready",
  IN_PROGRESS: "In Progress",
  DONE: "Finished",
};

const LIST_COPY = {
  [LIST_TYPES.BACKLOG]: "Backlog",
  [LIST_TYPES.TODO]: "Ready",
  [LIST_TYPES.IN_PROGRESS]: "In Progress",
  [LIST_TYPES.DONE]: "Finished",
};

const LIST_COLORS = {
  [LIST_TYPES.BACKLOG]: "#b95959",
  [LIST_TYPES.TODO]: "#4b69b1",
  [LIST_TYPES.IN_PROGRESS]: "#3498db",
  [LIST_TYPES.DONE]: "#2ecc71",
};

export { LIST_TYPES, LIST_COPY, LIST_COLORS };
