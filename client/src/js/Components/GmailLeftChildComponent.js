var React=require('react')
var ReactDOM=require('react-dom')
var GmailLeftChildComponent=React.createClass({

  click:function()
  {
    this.props.handleClick({labelId:this.props.value.id});
  },
  render:function()
  {
return(<table>
  <tbody>
  <tr>
  <td id="btnpad"><a onClick={this.click} id="labelclick" className="btn btn-primary">{this.props.value.name}</a></td>
  </tr>
  </tbody>
  </table>

)
  }
})
module.exports=GmailLeftChildComponent
