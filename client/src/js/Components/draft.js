
var React = require('react');
var MailComponent = require('./Mails');
//var GrandChildComponent1 = require('./GrandChildComponents1');
 //var arr=[];
 var DraftChildComponent = React.createClass({

render: function(){
  var arr=[];
  var froms='';
   var to='';
   var dateg='';

var aggregatedArray1=this.props.messageData;
//console.log('State data--->'+JSON.stringify(aggregatedArray1));
console.log('State data2--->'+this.props.messageData);


//var tempProps=this.props.aggregatedArray1;
   aggregatedArray1.forEach(function(email) {
     console.log('email--->'+JSON.stringify(email));
       froms=email[0].value;
       to=email[1].value;
       dateg= email[2].value;
      // mailId = email[3];
       arr.push(<MailComponent froms={froms} to={to} dateg={dateg}/>);
   });

/*  for(var j=0;j<aggregatedArray1.length;j++) {
    //console.log("data---->"+JSON.stringify(data));


       //console.log('Values---->'+aggregatedArray1[j].value);
      if(aggregatedArray1[0].name=='From'){
        froms=aggregatedArray1[0].value;
      }

      if(aggregatedArray1[0].name=='Subject'){
        to=aggregatedArray1[0].value;
      }
      if(aggregatedArray1[0].name=='Date'){
        dateg=aggregatedArray1[0].value;
      }
      //mailId = email[3];
     arr.push(<MailComponent froms={froms} to={to} dateg={dateg} />);
     console.log("final"+arr);
  }*/
  //console.log("476566");
  //console.log(arr);
  return(<div className="container-fluid">
  <table className="table table-inbox table-hover" >
                   <tbody>
                   {arr}
                   </tbody>
                   </table>

                   </div>
                 )
                 }
                 });
                 module.exports = DraftChildComponent
