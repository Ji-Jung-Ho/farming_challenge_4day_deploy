import React, { useState } from 'react';
import './css/style.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]); // 할 일 목록 상태를 저장하는 배열
  const [newTodo, setNewTodo] = useState(''); // 새로운 할 일을 입력하는 입력 필드의 상태
  const [priority, setPriority] = useState(''); // 할 일의 우선순위를 선택하는 라디오 버튼의 상태
  const [filter, setFilter] = useState('all'); // 할 일 목록을 필터링할 때 사용하는 필터 상태
  const [isAll, setIsAll] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [isUnComplete, setIsUnComplete] = useState(false);

  const onChangeNewTodoChange = (e) => {
    setNewTodo(e.target.value);
  };

  const PriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const AddTodo = () => {
    const todo = {
      id: todos.length + 1, // 새로운 할 일의 고유한 ID
      text: newTodo, // 새로운 할 일의 내용
      priority: priority, // 새로운 할 일의 우선순위
      completed: false, // 새로운 할 일의 완료 여부
    };

    setTodos([...todos, todo]); // 새로운 할 일을 기존의 할 일 목록에 추가
    setNewTodo(''); // 입력 필드 초기화
    setPriority(''); // 우선순위 선택 초기화
  };

  const ToggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    
  };

  const DeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };
  
  const AllDeleteTodo =() => {
    setTodos([]);
  }

  const UpdateTodo = (id, updatedText) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: updatedText } : todo
    );
    setTodos(updatedTodos);
  };

  const toggleListBox = (filterType) => {
    setFilter(filterType);
    setIsAll(filterType === 'all');
    setIsComplete(filterType === 'completed');
    setIsUnComplete(filterType === 'uncompleted');
  };

  const filterTodos = (status) => {
    switch (status) {
      case 'completed':
        return todos.filter((todo) => todo.completed);
      case 'uncompleted':
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = filter === 'all' ? todos : filterTodos(filter);

  return (
    <div id="wrap">
      <div className="wrap-container">
        <div className="todo-list-box">
          <h2>to-do list</h2>
        </div>
        <div className="todo-option-btn">
          <button className={isAll ? 'active' : ''} onClick={() => toggleListBox('all')}>전체</button>
          <button className={isComplete ? 'active' : ''} onClick={() => toggleListBox('completed')}>완료</button>
          <button className={isUnComplete ? 'active' : ''} onClick={() => toggleListBox('uncompleted')}>미완료</button>
        </div>
        <div className="text-box">
          <input type="text" value={newTodo} onChange={onChangeNewTodoChange} placeholder="할 일을 작성해주세요"/>
          <div className="radio-btn">
            <input type="radio" id='low' name="priority" value="낮음" checked={priority === '낮음'}onChange={PriorityChange}/>
            <label htmlFor="low">낮음</label>
            <input type="radio" id='nomal' name="priority" value="보통" checked={priority === '보통'} onChange={PriorityChange}/>
            <label htmlFor='nomal'>보통</label>
            <input type="radio" id='high' name="priority" value="높음" checked={priority === '높음'} onChange={PriorityChange}/>
            <label htmlFor='high'>높음</label>
            <input type="radio" id='veryhigh' name="priority" value="아주 높음" checked={priority === '아주 높음'} onChange={PriorityChange}/>
            <label htmlFor="veryhigh">아주 높음</label>
            <button type="submit" onClick={AddTodo}>추가</button>
          </div>
        </div>
        <div className="todo-items">
          <div className="title">
            <h2>Todos</h2>
            <button onClick={AllDeleteTodo}>모두 삭제</button>
          </div>
          <ul>
            {filteredTodos.map((todo) => (
              <li key={todo.id}>
                <div className="to-do-list-box">
                  <input value={todo.text} onChange={(event) => UpdateTodo(todo.id, event.target.value) }/>
                  {todo.priority !== '' ? (
                    <span className="priority">{todo.priority}</span>
                  ) : (
                    <span className="priority">순위 없음</span>
                  )}
                </div>
                <div className="opption-btn">
                  <input type="checkbox" id={todo.id} checked={todo.completed} onChange={() => ToggleComplete(todo.id)}/>
                  <label htmlFor={todo.id}>완료</label>
                  <button button onClick={() => DeleteTodo(todo.id)}>삭제</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
