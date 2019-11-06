import { API } from './components/api';
import setSources from './components/setSources';
import proxy from './components/proxyFactoryRequests';
import '../sass/style.sass';
import drawFirstArticles from './components/drawArticles';
import search from './components/search';

async function getSources(language) {
	// document.querySelector('#search').disabled = true;

	// const language = document.querySelector('input[name="language"]:checked').value;
	const response = await proxy.createRequest(`https://newsapi.org/v2/sources?language=${language}&apiKey=${API}`, 'GET').sendRequest();

	if (response.ok === false) {
		import(/* webpackChunkName: "lazyLoaderError" */ './components/lazyLoaderError').then(module => {
			const Error = module.default;
			let newError = new Error(responseNews.statusText);
			newError.showError();
            newError.hideError();
		});
	} else {
		const myJson = await response.json();
		const sources = myJson.sources;

		if (sources.length > 100) {
			import(/* webpackChunkName: "lazyLoaderError" */ './components/lazyLoaderError').then(module => {
				const Error = module.default;
			    let newError = new Error('Error. You got more than 100 sources');
			    newError.showError();
                newError.hideError();
			});
		} else {
			setSources(sources);
		}
	}
}

window.onload = () => {
    document.querySelectorAll('input[name="language"]').forEach(item => item.addEventListener('click', getSources));
};


class Model {
	constructor() {
	  this.sourses = [];
	  this.data = [];
	  this.showData = [];
	  this.startNum;
      this.endNum;
	}

	getArticlesData() {
		this.data = [];
		let data = search();

		if (data) {
			this.addData(data)

			this.initStartEndArticles()
		    this.setShowData()
		}
	}

	initStartEndArticles() {
		this.startNum = 0;
		this.endNum = 10;
	}

	getDataSources(language) {
		this.sourses = [];
		let sources = getSources(language);

		if (sources) {
			this.addSourses(sources)
		}
	}

	setShowData() {
        let length = this.data.length;

		if (length > this.endNum) {
			this.endNum = length;
		}

		if (this.startNum < 0) {
			this.startNum = 0
		}

		this.showData = this.data.slice(this.startNum, this.endNum)
	}

	addData(data) {
		this.data.push(data)
	}

	// deleteData() {
	// 	this.data = [];
	// }

	addSourses(sourses) {
		this.sourses.push(sourses)
	}

	// deleteSourses() {
	// 	this.sourses = [];
	// }

	nextArticles() {
		this.startNum += 10;
		this.endNum += 10;
		this.setShowData()
	}

	prevArticles() {
		this.startNum -= 10;
		this.endNum -= 10;
		this.setShowData()
	}

	lastArticles() {
		this.data = this.data.sort((a, b) => {
			a = new Date(a.publishedAt);
			b = new Date(b.publishedAt);
			return a > b ? -1 : a < b ? 1 : 0;
		});

		this.initStartEndArticles();
	}

	// bindInputChecked() {

	// }

	// bindSourseListChanged(callback) {
	//     this.onSourseListChanged = callback
	// }

	// bindDataListChanged(callback) {
	//     this.onDataListChanged = callback
	// }

	// _commit(todos) {
	//   this.onTodoListChanged(todos)
	//   localStorage.setItem('todos', JSON.stringify(todos))
	// }




	//   this._commit(this.todos)
	// }

	// editTodo(id, updatedText) {
	//   this.todos = this.todos.map(todo =>
	// 	todo.id === id ? { id: todo.id, text: updatedText, complete: todo.complete } : todo
	//   )

	//   this._commit(this.todos)
	// }

	// deleteTodo(id) {
	//   this.todos = this.todos.filter(todo => todo.id !== id)

	//   this._commit(this.todos)
	// }

	// toggleTodo(id) {
	//   this.todos = this.todos.map(todo =>
	// 	todo.id === id ? { id: todo.id, text: todo.text, complete: !todo.complete } : todo
	//   )

	//   this._commit(this.todos)
	// }
  }

  class View {
	constructor() {
	  this.app = document.querySelectorAll('input[name="language"]')
      this.idSearch = document.querySelector('#search')
	  this.idSources = document.querySelector('#sources')
	  this.inputChecked;
	//   this.initListener();
	//   this.form = this.createElement('form')
	//   this.input = this.createElement('input')
	//   this.input.type = 'text'
	//   this.input.placeholder = 'Add todo'
	//   this.input.name = 'todo'
	//   this.submitButton = this.createElement('button')
	//   this.submitButton.textContent = 'Submit'
	//   this.form.append(this.input, this.submitButton)
	//   this.title = this.createElement('h1')
	//   this.title.textContent = 'Todos'
	//   this.todoList = this.createElement('ul', 'todo-list')
	//   this.app.append(this.title, this.form, this.todoList)

	//   this._temporaryTodoText = ''
	//   this._initLocalListeners()
	  this.localListener();
	}

	// localListener() {
	// 	this.app.forEach(item => item.addEventListener('click', () => {
	// 		this.inputChecked = this.querySelector('input[name="language"]:checked').value;
	// 	}));
	// }

	bindAddSources(handler) {
		this.app.forEach(item => item.addEventListener('click', handler));
	}

	getValueLanguage() {
		return document.querySelector('input[name="language"]:checked').value;
	}




	// initListener() {
	// 	this.app.forEach(item => item.addEventListener('click', getSources));
	// }


	// get _todoText() {
	//   return this.input.value
	// }

	// _resetInput() {
	//   this.input.value = ''
	// }

	// createElement(tag, className) {
	//   const element = document.createElement(tag)

	//   if (className) element.classList.add(className)

	//   return element
	// }

	// getElement(selector) {
	//   const element = document.querySelector(selector)

	//   return element
	// }

	// displayData(data) {

	  // Delete all nodes
	//   while (this.todoList.firstChild) {
	// 	this.todoList.removeChild(this.todoList.firstChild)
	//   }

	//   // Show default message
	//   if (todos.length === 0) {
	// 	const p = this.createElement('p')
	// 	p.textContent = 'Nothing to do! Add a task?'
	// 	this.todoList.append(p)
	//   } else {
	// 	// Create nodes
	// 	todos.forEach(todo => {
	// 	  const li = this.createElement('li')
	// 	  li.id = todo.id

	// 	  const checkbox = this.createElement('input')
	// 	  checkbox.type = 'checkbox'
	// 	  checkbox.checked = todo.complete

	// 	  const span = this.createElement('span')
	// 	  span.contentEditable = true
	// 	  span.classList.add('editable')

	// 	  if (todo.complete) {
	// 		const strike = this.createElement('s')
	// 		strike.textContent = todo.text
	// 		span.append(strike)
	// 	  } else {
	// 		span.textContent = todo.text
	// 	  }

	// 	  const deleteButton = this.createElement('button', 'delete')
	// 	  deleteButton.textContent = 'Delete'
	// 	  li.append(checkbox, span, deleteButton)

	// 	  // Append nodes
	// 	  this.todoList.append(li)
	// 	})
	//   }

	//   // Debugging
	//   console.log(todos)
	// }

	displaySourses(sources) {
		setSources(sources)
	}



	// _initLocalListeners() {
	//   this.todoList.addEventListener('input', event => {
	// 	if (event.target.className === 'editable') {
	// 	  this._temporaryTodoText = event.target.innerText
	// 	}
	//   })
	// }


	// bindAddSourses() {
	// 	this.app.forEach(item => item.addEventListener('click', getSources));
	// }

	// bindAddDate() {
	// 	this.search.addEventListener('click', drawFirstArticles);
	// }



	// bindAddTodo(handler) {
	//   this.form.addEventListener('submit', event => {
	// 	event.preventDefault()

	// 	if (this._todoText) {
	// 	  handler(this._todoText)
	// 	  this._resetInput()
	// 	}
	//   })
	// }

	// bindDeleteTodo(handler) {
	//   this.todoList.addEventListener('click', event => {
	// 	if (event.target.className === 'delete') {
	// 	  const id = parseInt(event.target.parentElement.id)

	// 	  handler(id)
	// 	}
	//   })
	// }

	// bindEditTodo(handler) {
	//   this.todoList.addEventListener('focusout', event => {
	// 	if (this._temporaryTodoText) {
	// 	  const id = parseInt(event.target.parentElement.id)

	// 	  handler(id, this._temporaryTodoText)
	// 	  this._temporaryTodoText = ''
	// 	}
	//   })
	// }

	// bindToggleTodo(handler) {
	//   this.todoList.addEventListener('change', event => {
	// 	if (event.target.type === 'checkbox') {
	// 	  const id = parseInt(event.target.parentElement.id)

	// 	  handler(id)
	// 	}
	//   })
	// }
  }

  class Controller {
	constructor(model, view) {
	  this.model = model
	  this.view = view

	  // Explicit this binding
      this.model.bindTodoListChanged(this.onTodoListChanged)
      this.view.bindAddSources(this.model.getDataSources(this.view.getValueLanguage()))
	//   this.model.bindAddDate(this.onDataListChanged)
	//   this.model.bindAddSourses(this.onDataListChanged)
	//   this.model.bindTodoListChanged(this.onTodoListChanged)
	//   this.view.bindAddTodo(this.handleAddTodo)
	//   this.view.bindEditTodo(this.handleEditTodo)
	//   this.view.bindDeleteTodo(this.handleDeleteTodo)
	//   this.view.bindToggleTodo(this.handleToggleTodo)

	//   // Display initial todos
	//   this.onTodoListChanged(this.model.todos)
	 this.onSoursesListChanged(this.model.sources)
	}

	onDataListChanged = data => {
	  this.view.displayData(data)
	}

	onSoursesListChanged = sourses => {
		this.view.idSearch.disabled = true;
		this.view.displaySourses(sourses)
	}

	// handleAddTodo = todoText => {
	//   this.model.addTodo(todoText)
	// }

	// handleEditTodo = (id, todoText) => {
	//   this.model.editTodo(id, todoText)
	// }

	// handleDeleteTodo = id => {
	//   this.model.deleteTodo(id)
	// }

	// handleToggleTodo = id => {
	//   this.model.toggleTodo(id)
	// }
  }

  const app = new Controller(new Model(), new View())
