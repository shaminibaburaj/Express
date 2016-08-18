var React = require('react');
var MailComponent = React.createClass({


  save:function()
  {
    var from=this.props.froms;
    var subject=this.props.to;
    var date=this.props.dateg;
    var ob={"from":from,"subject":subject,"date":date};
    $.ajax({
     url:'http://localhost:8080/users',
     dataType: 'json',
     async :false,
     type: 'POST',
     data:ob,
     success: function(data)
     {
     console.log("save"+JSON.stringify(data));
   }.bind(this),
   error: function(xhr, status, err) {
     console.log(err);
   }.bind(this)
});

},

 // console.log('listId  length----->'+listid.length);

  render: function(){
    //console.log("476566");
    //console.log(arr);
    return(
      <div className="container-fluid">
      <table className="table table-inbox table-hover" >
                       <tbody>
                       <tr>
                       <td className="view-message">{this.props.froms}</td>
                        <td className="view-message">{this.props.to}</td>
                         <td className="view-message  text-right">{this.props.dateg}</td>
                         <td><a id="labelclick" onClick={this.save} className="btn btn-primary">save</a></td>
                         </tr>
                         </tbody>
                         </table>
                         </div>
                   );
                   }

                   });
                   module.exports = MailComponent;
