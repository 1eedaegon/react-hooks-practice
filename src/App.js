import { useState, Component } from "react";
import { useInput } from "./customHooks"

const App = () => {
  const checkMaxLen = (value) => value.length < 10;
  const name = useInput('Mr.', checkMaxLen);
  const [item, setItem] = useState(1)
  const incrementItem = () => setItem(item + 1)
  const decrementItem = () => setItem(item - 1)
  return (
    <div className="APP">
      <input placeholder="Name" {...name}></input>
      <h2>Hello!: {item}</h2>
      <button onClick={incrementItem}>+</button>
      <button onClick={decrementItem}>-</button>
    </div>
  );
}

const ClassifyApp = class extends Component {
  state = {
    item: 1
  }
  incrementItem = () => {
    this.setState(prev => {
      return { item: prev.item + 1 }
    })
  }
  decrementItem = () => {
    this.setState(prev => {
      return { item: prev.item - 1 }
    })
  }
  render() {
    const { item } = this.state
    return (
      <div className="ClassifyApp">
        <h2>Hello React world! {item}</h2>
        <button onClick={this.incrementItem}>+</button>
        <button onClick={this.decrementItem}>-</button>
      </div>
    )
  }
}

export { App, ClassifyApp };
