new Vue({
    el: '#app',
    data: {
        plannedTasks: [],
        currentTask: {
            id: null,
            title: '',
            description: '',
            deadline: '',
            createdDate: '',
            lastEdited: ''
        },
        isEditing: false
    },
    methods: {
        saveTask() {
            if (!this.currentTask.title.trim()) {
                alert('Заголовок задачи не может быть пустым!');
                return;
            }

            if (this.isEditing) {
                const task = this.plannedTasks.find(t => t.id === this.currentTask.id);
                if (task) {
                    task.title = this.currentTask.title;
                    task.description = this.currentTask.description;
                    task.deadline = this.currentTask.deadline;
                    task.lastEdited = new Date().toLocaleString();
                }
            } else {
                const newTask = {
                    id: Date.now(),
                    title: this.currentTask.title,
                    description: this.currentTask.description,
                    deadline: this.currentTask.deadline,
                    createdDate: new Date().toLocaleString(),
                    lastEdited: ''
                };
                this.plannedTasks.push(newTask);
            }

            this.resetForm();
        },

        editTask(task) {
            this.currentTask = { ...task };
            this.isEditing = true;
        },

        deleteTask(taskId) {
            this.plannedTasks = this.plannedTasks.filter(task => task.id !== taskId);
        },

        cancelEdit() {
            this.resetForm();
        },

        resetForm() {
            this.currentTask = {
                id: null,
                title: '',
                description: '',
                deadline: '',
                createdDate: '',
                lastEdited: ''
            };
            this.isEditing = false;
        }
    }
});