Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。

### 何时使用 Refs
> 勿过度使用 Refs

下面是几个适合使用 refs 的情况：
* 管理焦点，文本选择或媒体播放。
* 触发强制动画。
* 集成第三方 DOM 库。

>  React 16.3 版本引入的 React.createRef() API。如果正在使用一个较早版本的 React，推荐使用回调形式的 refs。
不建议使用string 类型的 refs，因为 string 类型的 refs 存在 一些问题。它已过时并可能会在未来的版本被移除。

### 创建回调形式 Refs
基本用法:
```
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // 组件挂载后，让文本框自动获得焦点
    this.focusTextInput();
  }
  focusTextInput = () => {
      // 使用原生 DOM API 使 text 输入框获得焦点
      if (this.textInput) this.textInput.focus();
  };
  render() {
    return (
      <div>
        <input
          type="text"
          ref={element => {
                     this.textInput = element;
              }}
        />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

在组件间传递回调形式的 refs:
```
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput
        inputRef={el => this.inputElement = el}
      />
    );
  }
}
```
在 Parent 中的 this.inputElement 会被设置为与 CustomTextInput 中的 input 元素相对应的 DOM 节点。


### 使用 React.createRef() 创建Refs
```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

当 ref 被传递给 render 中的元素时，对该节点的引用可以在 ref 的 **current** 属性中被访问。
ref 的值根据节点的类型而有所不同：
* 当 ref 属性用于**DOM 元素**时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性。
* 当 ref 属性用于自定义 **class 组件**时，ref 对象接收组件的挂载实例作为其 current 属性。

#### 为 DOM 元素添加 ref
```
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  focusTextInput=()=> {
    // 直接使用原生 API 使 text 输入框获得焦点
    // 注意：我们通过 "current" 来访问 DOM 节点
    this.textInput.current.focus();
  }

  render() {
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />

        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```
React 会在组件挂载时给 current 属性传入 DOM 元素，并在组件卸载时传入 null 值。ref 会在 componentDidMount 或 componentDidUpdate 生命周期钩子触发前更新。

#### 为 class 组件添加 Ref
如果我们想包装上面的 CustomTextInput，来模拟它挂载之后立即被点击的操作，我们可以使用 ref 来获取这个自定义的 input 组件并手动调用它的 focusTextInput 方法

```
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput(); //调用子组件的方法
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}
```
> 请注意，这仅在 CustomTextInput 声明为 class 时才有效，你不能在函数组件(直接通过function创建)上使用 ref 属性。


