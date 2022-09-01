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


