const data = require('./data');

class Controller {
	async getTodos() {
		return new Promise((resolve, reject) => resolve(data));
	}

	async getTodo(id) {
		return new Promise((resolve, reject) => {
			let todo = data.find((todo) => todo.id === parseInt(id));
			if (todo) {
				resolve(todo);
			} else {
				reject(`Todo with id ${id} not found`);
			}
		});
	}

	async createTodo(todo) {
		return new Promise((resolve, reject) => {
			let newTodo = {
				id: Math.floor(4 + Math.random() * 10),
				...todo,
			};
			resolve(newTodo);
		});
	}

	async updateTodo(id) {
		return new Promise((resolve, reject) => {
			let todo = data.find((todo) => todo.id === parseInt(id));
			if (!todo) {
				reject(`No todo with id ${id} found`);
			}
			todo['completed'] = true;
			resolve(todo);
		});
	}

	async udateTodoWithPut(id, reqData) {
		return new Promise((resolve, reject) => {
			let todo = data.findIndex((todo) => todo.id === parseInt(id));
			if (!todo) {
				reject(`No todo with id ${id} found`);
			}
			data[todo] = { ...data[todo], ...reqData };
			resolve(data[todo]);
		});
	}

	async deleteTodo(id) {
		return new Promise((resolve, reject) => {
			// get the todo
			let todo = data.find((todo) => todo.id === parseInt(id));
			// if no todo, return an error
			if (!todo) {
				reject(`No todo with id ${id} found`);
			}
			// else, return a success message
			resolve(`Todo deleted successfully`);
		});
	}
}

module.exports = Controller;
