import { remultExpress } from "remult/remult-express";
import { Task } from '../shared/task.js';
import { remult } from 'remult';
import { TasksController } from "../shared/TasksController.js";

export const api = remultExpress({
    controllers: [TasksController],
    entities: [Task],
    initApi: async () => {
        const taskRepo = remult.repo(Task);

        if (await taskRepo.count() === 0)
            await taskRepo.insert([
                { title: "Setup", completed: true },
                { title: "Entities" },
                { title: "Paging, Sorting and Filtering" },
                { title: "CRUD Operations" },
                { title: "Validation" },
                { title: "Backend methods" },
                { title: "Database" },
                { title: "Authentication and Authorization" },
                { title: "Deployment" }
            ])
    }
});

