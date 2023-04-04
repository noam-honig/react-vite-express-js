import { describeClass, Entity, Fields } from "remult";

export class Task {
  id;
  title = "";
  completed = false;
}

describeClass(
  Task,
  Entity("tasks", {
    allowApiCrud: true,
  }),
  {
    id: Fields.uuid(),
    title: Fields.string({
      validate: (task) => {
        if (task.title.length < 3) throw Error("Too short");
      },
    }),
    completed: Fields.boolean(),
  }
);
