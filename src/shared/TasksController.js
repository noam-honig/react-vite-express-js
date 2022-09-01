import { BackendMethod, remult } from "remult";
import { Task } from "./task.js";

export class TasksController {
    static async setAll(completed) {
        const taskRepo = remult.repo(Task);
        for (const task of await taskRepo.find()) {
            await taskRepo.save({ ...task, completed })
        }
    }
}
applyBackendMethod(TasksController, 'setAll', { allowed: true })

/**
 * @param {import('remult').BackendMethodOptions} options
*/
function applyBackendMethod(cls, methodName, options) {
    const prop = Object.getOwnPropertyDescriptor(cls, methodName);
    BackendMethod(options)(cls, methodName, prop);
    Object.defineProperty(cls, methodName, prop);
}
