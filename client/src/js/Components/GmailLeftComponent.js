var React=require('react')
var ReactDOM=require('react-dom')
var GmailLeftChildComponent=require('./GmailLeftChildComponent')
var labelData1=[];
var arr=[];
var GmailLeftComponent=React.createClass({
  handleClick:function(data)
{
  this.props.handleClick({labelId:data.labelId});
},
  render:function()
  {


    labelData1=this.props.labeldata
  labelData1.forEach(function(data){
    if(data.name==="INBOX"||data.name==="SENT"||data.name==="IMPORTANT"||data.name==="DRAFT"||data.name==="TRASH")
    {
      console.log("leftlabel"+data);
      arr.push(<GmailLeftChildComponent value={data} handleClick={this.handleClick} key={data.id}/>)
    }
  }.bind(this));

return(<table><tbody>{arr}</tbody></table>);
}
})
module.exports=GmailLeftComponent
