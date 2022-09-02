import { BuildEntity, Entity, Fields } from "remult";

export class Task {
    id;
    title = '';
    completed = false;
}

BuildEntity(Task, "tasks", {
    id: Fields.uuid(),
    title: Fields.string(),
    completed: Fields.boolean()
}, { allowApiCrud: true });
