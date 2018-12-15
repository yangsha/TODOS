import React from 'react'
import ReactDOM from 'react-dom'
// import './index.css'

class TodoMvc extends React.Component {
  state = {
    todoInput: '',
    todoList: [],
    search: 'allChecked',
  }
  constructor(props) {
    super(props)
  }
  handleHasCompleted = (index, checked) => {
    const list = this.state.todoList.slice()
    list[index]['hasCompleted'] = checked
    if (checked) {
    }
    this.setState({
      todoList: list,
    })
  }
  handleModify = (index, nextValue) => {
    const list = this.state.todoList.slice()
    list[index]['todoInput'] = nextValue
    this.setState({
      todoList: list,
    })
  }
  handleDelete = e => {
    let index = e.target.key
    //console.log(index);
    const list = this.state.todoList.slice()
    list.splice(index, 1)
    this.setState({
      todoList: list,
    })
  }
  handleInput = todoInput => {
    this.setState({
      todoInput: todoInput,
      // todoList:list
    })
  }
  handleAddTodo = () => {
    const todoInput = this.state.todoInput
    let list = this.state.todoList.slice()
    list.push({
      todoInput: todoInput,
      hasCompleted: false,
    })
    if (todoInput !== '') {
      // TODO add todo here
      this.setState({
        todoList: list,
      })
    }
  }
  handleSearch(search) {
    console.log(search)
    this.setState({
      search: search,
    })
  }
  render() {
    // TODO
    // 解构赋值
    // Array   map, filter, concat, slice, splice, find
    // for-of 循环
    // css flex 布局
    // setInterval setTimeout
    // 异步网络请求 fetch
    // Promise  http://liubin.org/promises-book/

    const { search, todoList } = this.state
    // const search = this.state.search
    // const todoList = this.state.todoList

    let count = 0
    // const list=this.state.todoList.slice();
    for (const todo of todoList) {
      if (todo.hasCompleted) {
        count++
      }
    }
    // for (let i = 0; i < todoList.length; i++) {
    //   if (todoList[i].hasCompleted === false) count++
    // }
    let visibleTodoList
    if (search === 'allChecked') {
      visibleTodoList = todoList
    } else if (search === 'activeChecked') {
      visibleTodoList = todoList.filter(todo => !todo.hasCompleted)
    } else { // completedChecked
      visibleTodoList = todoList.filter(todo => todo.hasCompleted)
    }

    return (
      <div>
        <div>
          <h1>{'TODOS'}</h1>
          <InputSet
            todoInput={this.state.todoInput}
            onInputChange={this.handleInput}
            onAddTodo={this.handleAddTodo}
          />
        </div>
        <div>
          {visibleTodoList.map((text, index) =><p key={index}>
            <input
              type="checkbox"
              value={text}
              checked={text.hasCompleted}
              onChange={e => this.handleHasCompleted(index, e.target.checked)}
            />
            <input
              type="text"
              value={text.todoInput}
              onChange={e => this.handleModify(index, e.target.value)}
            />
            <input type="button" value="x" onClick={this.handleDelete} />
          </p> )}
        </div>
        <hr/>
        <div>
          {this.state.search === 'allChecked' &&
            this.state.todoList.map((text, index) => (
              <p key={index}>
                <input
                  type="checkbox"
                  value={text}
                  checked={text.hasCompleted}
                  onChange={e => this.handleHasCompleted(index, e.target.checked)}
                />
                <input
                  type="text"
                  value={text.todoInput}
                  onChange={e => this.handleModify(index, e.target.value)}
                />
                <input type="button" value="x" onClick={this.handleDelete} />
              </p>
            ))}
        </div>
        <div>
          {this.state.search === 'activeChecked' &&
            this.state.todoList.map(
              (text, index) =>
                text.hasCompleted === false && (
                  <p key={index}>
                    <input
                      type="checkbox"
                      value={text}
                      checked={text.hasCompleted}
                      onChange={e => this.handleHasCompleted(index, e.target.checked)}
                    />
                    <input
                      type="text"
                      value={text.todoInput}
                      onChange={e => this.handleModify(index, e.target.value)}
                    />
                    <input type="button" value="x" onClick={this.handleDelete} />
                  </p>
                ),
            )}
        </div>
        <div>
          {this.state.search === 'completedChecked' &&
            this.state.todoList.map(
              (text, index) =>
                text.hasCompleted === true && (
                  <p key={index}>
                    <input
                      type="checkbox"
                      value={text}
                      checked={text.hasCompleted}
                      onChange={e => this.handleHasCompleted(index, e.target.checked)}
                    />
                    <input
                      type="text"
                      value={text.todoInput}
                      onChange={e => this.handleModify(index, e.target.value)}
                    />
                    <input type="button" value="x" onClick={this.handleDelete} />
                  </p>
                ),
            )}
        </div>
        <div>
          <p>{count + ' item left'}</p>
        </div>
        <select
          value={this.state.search}
          onChange={e => {
            this.handleSearch(e.target.value)
          }}
        >
          <option value="allChecked">All</option>
          <option value="activeChecked">Active</option>
          <option value="completedChecked">Completed</option>
        </select>
      </div>
    )
  }
}
class InputSet extends React.Component {
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }
  handleInputChange(e) {
    this.props.onInputChange(e.target.value)
  }
  handleKeyDown(e) {
    // console.log(e.key)
    if (e.key === 'Enter') {
      // console.log('you pressed Enter')
      this.props.onAddTodo()
    }
  }
  render() {
    return (
      <div>
        <input
          id="inputID"
          type="text"
          placeholder="What needs to be done?"
          value={this.props.todoInput}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    )
  }
}
ReactDOM.render(<TodoMvc />, document.getElementById('root'))
