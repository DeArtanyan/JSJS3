new Vue({
    el: '#app',
    data: {
        plannedTasks: [],
        inProgressTasks: [],
        testingTasks: [],
        completedTasks: [],
        currentTask: {
            id: null,
            title: '',
            description: '',
            deadline: '',
            createdDate: '',
            lastEdited: ''
        },
        isEditing: false,
        showReturnModal: false,
        returnReason: '',
        taskToReturn: null
    },
    methods: {
        saveTask() {
            if (!this.currentTask.title.trim()) {
                alert('Заголовок задачи не может быть пустым!');
                return;
            }

            if (this.isEditing) {
                const task = this.plannedTasks.find(t => t.id === this.currentTask.id) ||
                             this.inProgressTasks.find(t => t.id === this.currentTask.id) ||
                             this.testingTasks.find(t => t.id === this.currentTask.id);
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
            this.inProgressTasks = this.inProgressTasks.filter(task => task.id !== taskId);
        },
        moveToInProgress(task) {
            this.plannedTasks = this.plannedTasks.filter(t => t.id !== task.id);
            this.inProgressTasks.push(task);
        },
        moveToTesting(task) {
            this.inProgressTasks = this.inProgressTasks.filter(t => t.id !== task.id);
            this.testingTasks.push(task);
        },
        moveToCompleted(task) {
            this.testingTasks = this.testingTasks.filter(t => t.id !== task.id);
            this.completedTasks.push(task);
        },
        openReturnModal(task) {
            this.taskToReturn = task;
            this.showReturnModal = true;
        },
        closeReturnModal() {
            this.showReturnModal = false;
            this.returnReason = '';
            this.taskToReturn = null;
        },
        returnTaskToInProgress() {
            if (!this.returnReason.trim()) {
                alert('Укажите причину возврата!');
                return;
            }

            const task = this.taskToReturn;
            task.returnReason = this.returnReason;
            this.testingTasks = this.testingTasks.filter(t => t.id !== task.id);
            this.inProgressTasks.push(task);

            this.closeReturnModal();
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