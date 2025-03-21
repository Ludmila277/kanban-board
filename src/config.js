const LIST_TYPES = {
  BACKLOG: "Backlog",
  READY: "Ready",
  IN_PROGRESS: "In Progress",
  FINISHED: "Finished",
};

const LIST_COPY = {
  [LIST_TYPES.BACKLOG]: "Backlog",
  [LIST_TYPES.READY]: "Ready",
  [LIST_TYPES.IN_PROGRESS]: "In progress",
  [LIST_TYPES.FINISHED]: "Finished",
};

const LIST_COLORS = {
  [LIST_TYPES.BACKLOG]: "#b95959",
  [LIST_TYPES.IN_PROGRESS]: "#4b69b1",
  [LIST_TYPES.FINISHED]: "#a0b959",
};

export { LIST_TYPES, LIST_COPY, LIST_COLORS };
