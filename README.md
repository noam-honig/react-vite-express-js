# Javascript todo app example
Although remult was designed with Typescript in mind, it can also be used with javascript.

The main difference in usage is the alternative to `decorators` which will probably be improved in the near future.

**This project is using remult experimental version (0.16.0-exp.16), that will soon be on release**

## Entity

*typescript*
```ts
import { Entity, Fields } from "remult";

@Entity("tasks", {
    allowApiCrud: true
})
export class Task {
    @Fields.uuid()
    id!: string;

    @Fields.string<Task>({
        validate:task=>{
            if (task.title.length>3)
                throw Error("Too Short")
        }
    })
    title = '';

    @Fields.boolean()
    completed = false;
}
```

*javascript*
```js
import { Entity, Fields } from "remult";

export class Task {
    id;
    title = '';
    completed = false;
}

Entity("tasks", {
    allowApiCrud: true
})(Task)
Fields.uuid()(Task.prototype, 'id');
Fields.string({
    validate: task => {
        if (task.title.length < 3)
            throw Error("Too short");
    }
})(Task.prototype, 'title');
Fields.boolean()(Task.prototype, 'completed');
```

## Backend method
*typescript*
```ts
import { Allow, BackendMethod, remult } from "remult";
import { Task } from "./Task";

export class TasksController {
    @BackendMethod({ allowed: Allow.authenticated })
    static async setAll(completed: boolean) {
        const taskRepo = remult!.repo(Task);

        for (const task of await taskRepo.find()) {
            await taskRepo.save({ ...task, completed });
        }
    }
}
```
*javascript*
```js
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
```
* note that the `applyBackendMethod` can be shared all across the app