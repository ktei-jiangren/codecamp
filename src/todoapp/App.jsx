import React from "react";
import classnames from "classnames";
import uuid from "uuid";

import "./todo.css";

class TodoItem extends React.Component {
  handleToggleComplete = () => {
    const { onToggleComplete, item } = this.props;
    if (onToggleComplete) {
      onToggleComplete(item);
    }
  };

  handleDelete = () => {
    const { onDelete, item } = this.props;
    if (onDelete) {
      onDelete(item);
    }
  };

  render() {
    const { item } = this.props;

    return (
      <li
        className={classnames("list-group-item todo-item", {
          "todo-item--completed": item.completed
        })}
      >
        <div className="todo-item__name">{item.name}</div>
        <div className="todo-item__check">
          <i className="fa fa-check" onClick={this.handleToggleComplete} />
        </div>
        <div className="todo-item__trash">
          <i className="fa fa-trash" onClick={this.handleDelete} />
        </div>
      </li>
    );
  }
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      newItemName: "",
      items: [
        {
          id: uuid.v4(),
          name: "Buy milk",
          completed: false
        },
        {
          id: uuid.v4(),
          name: "Do homework",
          completed: true
        }
      ],
      filter: "all"
    };
  }

  getDisplayItems() {
    const { filter } = this.state;
    let filterFunc = () => true;
    if (filter === "completed") {
      filterFunc = item => item.completed;
    } else if (filter === "pending") {
      filterFunc = item => !item.completed;
    }
    return this.state.items.filter(filterFunc);
  }

  handleNewItemNameChange = e => {
    const name = e.target.value;
    this.setState({ newItemName: name });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newItemName = this.state.newItemName.trim();
    if (!newItemName) {
      return;
    }

    const newItem = {
      id: uuid.v4(),
      name: this.state.newItemName,
      completed: false
    };
    this.setState({
      newItemName: "",
      items: [newItem].concat(this.state.items)
    });
  };

  handleToggleItemComplete = item => {
    const newItems = this.state.items.map(x => {
      if (x.id === item.id) {
        return { ...x, completed: !item.completed };
      }
      return x;
    });
    this.setState({ items: newItems });
  };

  handleDeleteItem = item => {
    const newItems = this.state.items.filter(x => x.id !== item.id);
    this.setState({ items: newItems });
  };

  handleFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  renderItems() {
    return this.getDisplayItems().map(item => {
      return (
        <TodoItem
          key={item.id}
          item={item}
          onToggleComplete={this.handleToggleItemComplete}
          onDelete={this.handleDeleteItem}
        />
      );
    });
  }

  render() {
    return (
      <div className="todo-container">
        <h3>My Todo List</h3>
        <form className="todo-form" onSubmit={this.handleSubmit}>
          <div className="input-group">
            <input
              value={this.state.newItemName}
              onChange={this.handleNewItemNameChange}
              placeholder="What are you gonna do next"
              className="form-control"
            />
            <span className="input-group-btn">
              <button className="btn btn-primary" type="submit">
                Add item
              </button>
            </span>
          </div>
        </form>
        <div className="todo-filter">
          <label className="radio-inline">
            <input
              type="radio"
              name="filter"
              value="all"
              onChange={this.handleFilterChange}
              checked={this.state.filter === "all"}
            />{" "}
            All
          </label>
          <label className="radio-inline">
            <input
              type="radio"
              name="filter"
              value="pending"
              onChange={this.handleFilterChange}
              checked={this.state.filter === "pending"}
            />{" "}
            Pending
          </label>
          <label className="radio-inline">
            <input
              type="radio"
              name="filter"
              value="completed"
              onChange={this.handleFilterChange}
              checked={this.state.filter === "completed"}
            />{" "}
            Completed
          </label>
        </div>
        <div className="list-group">{this.renderItems()}</div>
      </div>
    );
  }
}
