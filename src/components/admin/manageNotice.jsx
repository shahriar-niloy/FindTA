import React from "react";
import Header from "../../common/header";
import { getNotices, updateNotice, deleteNotice } from '../../api/notice';
import Datagrid from "../../common/datagrid";
import Manager from './../../common/admin/manage';
import Delete from './../../common/Delete';

class ManageNotice extends Manager {
  state = {
    notices: [],
    failed: false,
    success: false
  };

  style = {
    minWidth: "500px"
  };

  path = [{pathname: "code", disallowed: true}, 
  {pathname: "sec", disallowed: true}, 
  {pathname: "subject", disallowed: false}, 
  {pathname: "content", disallowed: false},
  {pathname: "action", disallowed: true},];

  async componentDidMount() {
    const notices = await getNotices();
    console.log(notices);
    this.setState({ notices });
  }

  handleOnBlur = async (event) => {
    const { e: {target}, rowCol } = event;
    const row = rowCol[0];
    const col = rowCol[1];
    const notices = [...this.state.notices];
    const rowData = this.state.notices[row];
    rowData[this.path[col].pathname] = target.innerText;
    const result = await updateNotice(rowData.id, rowData);
    if(result !== 0){
      notices[row] = rowData;
      this.setState({ notices, success: true, failed: false });
    }else{
      this.setState({ failed: true, success: false });
    }
  }

  handleDelete = async (id) => {
    const code = await deleteNotice(id);
    if(code === 200){
      console.log("Delete Success");
      const ntcs = this.state.notices.filter((item) => item.id !== id)
      this.setState({ notices: ntcs });
    }
  }

  deleteIconGenerator = (item) => {
    return <Delete id={item.id} onClick={this.handleDelete} />;
  }

  render() {
    const { notices, failed, success } = this.state;
    if (notices.length === 0) return <div>No notices to display</div>;
    let noticesExt = this.addContentDynamic(notices, "action", this.deleteIconGenerator);
    console.log("Render",noticesExt);
    return (
      <div style={this.style} className="shadow-sm bg-white rounded">
        <Header heading="Manage Notice" />
        <div className="pr-4 pl-4 pb-4 d-flex flex-row">
          <Datagrid headings={this.path} data={noticesExt} onBlur={this.handleOnBlur} path={this.path} />
        </div>
        <div className="pr-4 pl-4" style={{ fontSize: "12px" }}>
          <p style={{ display: "inline-block" }}>Double click on a cell to edit</p>
          {success && <div className="float-right">
            <i className="fas fa-thumbs-up d-inline mr-2"/> 
            <p className="float-right">Successfully Saved!</p>
          </div>}
          {failed && <div className="float-right">
            <i className="fas fa-times d-inline mr-2" />
            <p className="float-right">Couldn't Save!</p>
          </div>}
        </div>
      </div>
    );
  }
}

export default ManageNotice;
