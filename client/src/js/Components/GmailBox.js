var React = require('react');
var DraftChildComponent = require('./draft');
var GmailLeftComponent = require('./GmailLeftComponent');
var Compose = require('./Compose');
var NavChildComponents = require('./NavChildComponents');

var Nav2ChildComponent= require('./Nav2ChildComponent');
var loadedData = false;
var GmailBox = React.createClass({
  getInitialState: function()
  {
    return({accessToken:'', accessTokenType:'',labelData:[],messageWithId:[],data:[]});
  },
  gmailLogin: function()
  {
    var acToken, tokenType, expiresIn;
    var OAUTHURL    =   'https://accounts.google.com/o/oauth2/v2/auth?';
    var VALIDURL    =   'https://www.googleapis.com/oauth2/v4/token?access_token=';
    var SCOPE       =   'https://mail.google.com/ https://www.googleapis.com/auth/gmail.readonly';
    var CLIENTID    =   '815862200760-ibs6p57kocp8e1ll585a681clflogdtt.apps.googleusercontent.com';
    var REDIRECT    =   'http://localhost:8080';
    var TYPE        =   'token';
    var _url        =   OAUTHURL + 'scope=' + SCOPE + '&client_id=' + CLIENTID + '&redirect_uri=' + REDIRECT + '&response_type=' + TYPE;
    var win         =   window.open(_url, "windowname1", 'width=800, height=600');

    var pollTimer   =   window.setInterval(function()
    {
        try
        {
            if (win.document.URL.indexOf(REDIRECT) != -1)
            {
                window.clearInterval(pollTimer);
                var url =   win.document.URL;
                acToken =   gup(url, 'access_token');
                tokenType = gup(url, 'token_type');
                expiresIn = gup(url, 'expires_in');
                localStorage.setItem('gToken',acToken);
                localStorage.setItem('gTokenType',tokenType);
                localStorage.setItem('gExprireIn',expiresIn);
                //console.log("gToken.."+localStorage.getItem('gToken'));
                //console.log("gTokenType.."+localStorage.getItem('gTokenType'));
                //console.log("gExprireIn.."+localStorage.getItem('gExprireIn'));
                function gup(url, name) {
                    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
                    var regexS = "[\\#&]"+name+"=([^&#]*)";
                    var regex = new RegExp( regexS );
                    var results = regex.exec( url );
                    if( results == null )
                        return "";
                    else
                        return results[1];
                }
                win.close();
            }
        }
        catch(e)
        {
          console.log(e);
        }
    }, 500);
    this.allLabels();
  },
  allLabels: function()
  {
      var accessToken = localStorage.getItem('gToken');
      $.ajax({
       url: 'https://www.googleapis.com/gmail/v1/users/kb.shamini%40gmail.com/labels?key={AIzaSyA7vlcclaPew1-wrTpzvC3AFZF34qQIJKw}',
       dataType: 'json',
       async:false,
       type: 'GET',
       beforeSend: function (request)
       {
         request.setRequestHeader("Authorization", "Bearer "+accessToken);
       },
       success: function(data)
       {
         loadedData=true;
      // console.log("data"+data.labels);
      console.log("label"+JSON.stringify(data.labels));
       this.setState({labelData:data.labels})
       }.bind(this),
       error: function(xhr, status, err) {
         console.error(err.toString());
       }.bind(this)
    });

  },
  getLabelWithId: function(labels)
  {
      var accessToken = localStorage.getItem('gToken');
      $.ajax({
       url: 'https://www.googleapis.com/gmail/v1/users/kb.shamini%40gmail.com/messages?labelIds='+labels.labelId+'&maxResults=10&key={AIzaSyA7vlcclaPew1-wrTpzvC3AFZF34qQIJKw}',
       dataType: 'json',
       type: 'GET',
       beforeSend: function (request)
       {
         request.setRequestHeader("Authorization", "Bearer "+accessToken);
       },
       success: function(data)
       {

         var pushedArr=[];
           var row=[];
           var msglist=[];
         console.log("messagedata1"+JSON.stringify(data));
           console.log("length"+data.messages.length);
           for(var i=0;i<data.messages.length;i++)
           {

             //console.log("id"+data.messages[0].id);

             var id1=data.messages[i].id;
             console.log("id1"+id1);
             row.push(id1);
             console.log("row"+row);
           }
           for(var i=0;i<row.length;i++)
         {
           console.log("for");
           //console.log("Angel5");
           //console.log(listid[i]);
             var accessToken1 = localStorage.getItem('gToken');
             //console.log(listid[i]);
             $.ajax({
              url: 'https://www.googleapis.com/gmail/v1/users/me/messages/'+row[i]+'?fields=payload%2Fheaders&key={AIzaSyA7vlcclaPew1-wrTpzvC3AFZF34qQIJKw}',
              dataType: 'json',
              async :false,
              type: 'GET',
              beforeSend: function (request)
              {
                request.setRequestHeader("Authorization", "Bearer "+accessToken1);
              },
              success: function(data)
              {


                var dataArr = Object.keys(data).map(function(k) { return data[k] });
                    var mailDataArr=dataArr[0].headers;
                    var fromArray = mailDataArr.filter(function(item) { return item.name === 'From';});
                    var subjectArray = mailDataArr.filter(function(item) { return item.name === 'Subject';});
                    var dateArray = mailDataArr.filter(function(item) { return item.name === 'Date';});
                    var aggregatedArray=fromArray.concat(subjectArray).concat(dateArray);
                    //retrievedMailArr.push(aggregatedArray);
                    pushedArr.push(aggregatedArray);
                    console.log("pushedArr"+JSON.stringify(pushedArr));
                    this.setState({data:pushedArr});


              }.bind(this),
              error: function(xhr, status, err) {
                console.log("error");
                console.error(err.toString());
              }.bind(this)
           });

        }

          // console.log('listId  length----->'+listid.length);
       }.bind(this),
       async:false,
       error: function(xhr, status, err) {
         console.error(err.toString());
       }.bind(this)
    });

  },
  componentWillMount:function()
  {
  this.getLabelWithId({labelId:'INBOX'});
},
  render:function()
  {
    console.log('this state called1-->'+JSON.stringify(this.state.data));
    var data;
    var com;
    var labels;
    if(loadedData){
      com=  <Compose/>;
      labels=<GmailLeftComponent  labeldata={this.state.labelData} handleClick={this.getLabelWithId}/>;
      data = <DraftChildComponent messageData={this.state.data}/>;
    }
    //console.log(this.state.messageWithId);
      return(
        <div className="GmailBox">
          <div className="container">
            <div className="mail-box">
              <div className="container-fluid">
              <div className="row">
              <button id="authorize-button" onClick={this.gmailLogin} className="btn btn-primary pull-right">Login1</button>
              </div>

              <NavChildComponents/>
              <Nav2ChildComponent/>
                  {com}
                  <br/>
                  <div className="row">
                  <div className="col-sm-2">
                  {labels}
                  <br/>
                  </div>
                  <div className="col-sm-10">
                    {data}
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      );
  }
  });

module.exports = GmailBox;
