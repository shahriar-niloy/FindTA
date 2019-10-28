import React, { Component } from 'react';
import '../styles/Datagrid.css';


class Datagrid extends Component {
  state = {
    editable: []
  };

  constructor(props){
    super(props);
    this.state.editable = this.resetEditable();
  }

  resetEditable = () => {
    const { data, path } = this.props;
    const editable = [...this.state.editable];
    for(let i = 0; i < data.length; ++i){
      editable[i] = [];
      for(let j = 0; j < path.length; ++j){
        editable[i][j] = false; 
      }
    }
    return editable;
  }

  handleDblClick = (e) => {
    const rowCol = this.extractRowCol(e.target.id);
    const editable = this.resetEditable();
    editable[rowCol[0]][rowCol[1]] = true;
    this.setState({ editable });
  }

  extractRowCol = (id) => {
    const rowCol = id.split('-');
    return rowCol;
  }

  handleOnBlur = (e) => {
    console.log("component level onblur handling");
    const event = {
      e: e,
      rowCol: this.extractRowCol(e.target.id)
    }
    this.props.onBlur(event);
    this.setState({ editable: this.resetEditable() });
  } 

  render() {
    const { headings, data, path, onBlur } = this.props;
    const { editable } = this.state;
    console.log(data);
    console.log(this.state.editable);
    return (
      <div className="datagrid">
        <table>
          <thead>
            <tr>
              {headings.map((item, ind) => (
                <th key={ind}>{item.pathname}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, row) => (
              <tr key={row}>
                {path.map((it, col) => (
                  <td
                    key={`${row.toString()}-${col.toString()}`}
                    id={`${row.toString()}-${col.toString()}`}
                    contentEditable={(editable[row][col] ? true : false) && !it.disallowed}
                    onBlur={this.handleOnBlur}
                    onDoubleClick={this.handleDblClick}
                    className={(editable[row][col] && !it.disallowed) ? "editable" : ""}
                  >
                    {data[row][it.pathname]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Datagrid;
