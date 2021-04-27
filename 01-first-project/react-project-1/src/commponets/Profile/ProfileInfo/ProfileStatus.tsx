import React, {ChangeEvent} from 'react';
type PropsType={
    status: string
    updateUserStatus: (newStatus: string)=>void
}
type StateType={
    editMode: boolean
    status: string
}
class ProfileStatus extends  React.Component<PropsType, StateType>{
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = ()=>{
        this.setState({
            editMode: true,
        })
    }
    diactivateEditMode = () =>{
        this.setState({
            editMode: false,
        })
        this.props.updateUserStatus(this.state.status)
    }
    setStatus = (e: ChangeEvent<HTMLInputElement>)=>{
        let value = e.currentTarget.value;
        this.setState({
            status: value
        })
    }
    componentDidUpdate(prevProps:PropsType, prevState:StateType) {
        if(prevProps.status != this.props.status){
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
      return  (
        <div>
            {!this.state.editMode &&
            <div className="">
                <span onDoubleClick={this.activateEditMode}>{this.props.status || 'Create your first status'}</span>
            </div>
            }
            {this.state.editMode &&
            <div className="">
                <input onChange={this.setStatus} autoFocus={true} onBlur={this.diactivateEditMode} type="text" value={this.state.status}/>
            </div>
            }
        </div>
      )
    }
}
export default  ProfileStatus;