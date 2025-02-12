new Vue({
    el: '#app',
    data: {
        plannedTasks: [],
        newTask: {
            title: '',
            description: '',
            deadline: ''
        }
    },
    methods: {
        addTask() {
            if (this.newTask.title.trim() === '') {
                alert('Заголовок задачи не может быть пустым!');
                return;
            }

            const task = {
                id: Date.now(),
                createdDate: new Date().toLocaleDateString(),
                title: this.newTask.title,
                description: this.newTask.description,
                deadline: this.newTask.deadline || 'Не указан'
            };

            this.plannedTasks.push(task);

            this.newTask.title = '';
            this.newTask.description = '';
            this.newTask.deadline = '';
        }
    }
});