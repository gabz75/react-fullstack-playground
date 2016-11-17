import React from 'react';

export default class EditableInput extends React.Component {
  static propTypes = {
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    onChange: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      value: this.props.value,
    };
  }

  componentDidUpdate() {
    if (this.state.editMode) {
      this.textInput.focus();
    }
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

  onBlur() {
    this.setState({ value: this.props.value });
    this.toggleEditMode();
  }

  toggleEditMode() {
    this.setState({ editMode: !this.state.editMode });
  }

  submit(event) {
    switch (event.keyCode) {
      case 13: // ENTER
        //
        if (this.props.onChange) {
          this.props.onChange(this.state.value);
        }
        this.toggleEditMode();
        break;

      case 27: // ESCAPE
        this.onBlur();
        break;

      default:
        return;
    }
  }

  render() {
    if (this.state.editMode) {
      return (
        <li>
          <input
            type='text'
            ref={input => (this.textInput = input)}
            onBlur={this.onBlur.bind(this)}
            onChange={this.onChange.bind(this)}
            onKeyDown={this.submit.bind(this)}
            value={this.state.value}
          />
        </li>
      );
    }

    return <li><button onClick={this.toggleEditMode.bind(this)}>{this.state.value}</button></li>;
  }
}
