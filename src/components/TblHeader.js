import React, { Component } from 'react'
import { connect } from 'react-redux'
class TblHeader extends Component{
    
    render(){
  
        return(
            <div className=" col-md-8 tbl-res">
                <table>
                    <thead>
                        <tr>
                            <th>Itme ({this.props.length})</th>
                            <th>Qty</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                </table>
            </div>
        )
    }
}


const mapStateToProps = (state)=>{
    return{
        length: state.length,
    }
}

export default connect(mapStateToProps)(TblHeader)

