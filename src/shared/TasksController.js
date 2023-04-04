import { BackendMethod, describeClass, remult } from "remult";
import { Task } from "./task.js";

export class TasksController {
  static async setAll(completed) {
    const taskRepo = remult.repo(Task);
    for (const task of await taskRepo.find()) {
      await taskRepo.save({ ...task, completed });
    }
  }
}
describeClass(TasksController, undefined, undefined, {
  setAll: BackendMethod({ allowed: true }),
});
