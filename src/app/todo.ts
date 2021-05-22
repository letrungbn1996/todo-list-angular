export class Todo {

    id: number;
    title: string = '';
    description: string = '';
    due_date: Date;
    priority: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
