const Todo = require('./controller');
const getReqData = require('./utils');
var url = require('url');
const querystring = require('querystring');

const routes = async (req, res) => {
	if (req.method === 'GET' && req.url === '/api/todos') {
		const todos = await new Todo().getTodos();
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(
			JSON.stringify({
				success: true,
				data: todos,
			})
		);
	} else if (req.url.match(/\/api\/todo\/([0-9]+)/) && req.method === 'GET') {
		try {
			// get id from url
			console.log('req.url', req.url);
			// localhost:8000/api/todo/:id
			// localhost:8000/api/todo/3
			const id = req.url.split('/')[3];
			// get todo
			const todo = await new Todo().getTodo(id);
			// set the status code and content-type
			res.writeHead(200, { 'Content-Type': 'application/json' });
			// send the data
			res.end(JSON.stringify(todo));
		} catch (error) {
			// set the status code and content-type
			res.writeHead(404, { 'Content-Type': 'application/json' });
			// send the error
			res.end(JSON.stringify({ message: error }));
		}
	} else if (req.method === 'GET') {
		const parsed = url.parse(req.url);
		const query = querystring.parse(parsed.query);
		console.log(parsed, query);
	} else if (req.url === '/api/todos' && req.method === 'POST') {
		// get the data sent along
		let todo_data = await getReqData(req);
		// create the todo
		let todo = await new Todo().createTodo(JSON.parse(todo_data));
		// set the status code and content-type
		res.writeHead(200, { 'Content-Type': 'application/json' });
		//send the todo
		res.end(JSON.stringify(todo));
	} else if (
		req.url.match(/\/api\/todos\/([0-9]+)/) &&
		req.method === 'DELETE'
	) {
		try {
			// get the id from url
			const id = req.url.split('/')[3];
			// delete todo
			let message = await new Todo().deleteTodo(id);
			// set the status code and content-type
			res.writeHead(200, { 'Content-Type': 'application/json' });
			// send the message
			res.end(JSON.stringify({ message }));
		} catch (error) {
			// set the status code and content-type
			res.writeHead(404, { 'Content-Type': 'application/json' });
			// send the error
			res.end(JSON.stringify({ message: error }));
		}
	}

	// /api/todos/:id : UPDATE
	else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === 'PATCH') {
		try {
			// get the id from the url
			const id = req.url.split('/')[3];
			// update todo
			let updated_todo = await new Todo().updateTodo(id);
			// set the status code and content-type
			res.writeHead(200, { 'Content-Type': 'application/json' });
			// send the message
			res.end(JSON.stringify(updated_todo));
		} catch (error) {
			// set the status code and content type
			res.writeHead(404, { 'Content-Type': 'application/json' });
			// send the error
			res.end(JSON.stringify({ message: error }));
		}
	} else if (req.method === 'PUT') {
		try {
			let body = '';
			let id = req.url.split('/').pop();
			req.on('data', function (data) {
				body += data;
			});

			req.on('end', async function () {
				const post = JSON.parse(body);
				let updated_todo = await new Todo().udateTodoWithPut(id, post);

				console.log(post);
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify(updated_todo));
			});
		} catch (error) {
			res.writeHead(404, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: error }));
		}
	}
	// No route present
	else {
		res.writeHead(404, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'Route not found' }));
	}
};
// console.log(routes);
module.exports = routes;
