window.onload = function() {
  var form = document.getElementById('message-form');
  var messageField = document.getElementById('message');
  var messagesList = document.getElementById('messages');
  var socketStatus = document.getElementById('status');
  var closeBtn = document.getElementById('close');

  var socket = new WebSocket('ws://echo.websocket.org');

  //open event is fired when connection is established
  socket.onopen = function(event){
    // console.log(event);
    socketStatus.innerHTML = 'Connected to: ' + event.currentTarget.url;
    socketStatus.className = 'open';
  };

  //error handling
  socket.onerror = function(error) {
    console.log('Websocket Error: ' + error)
  }

  //when form is submitted
  form.onsubmit = function(e) {
    e.preventDefault();
    var message = messageField.value;
    socket.send(message);    //text and binary data allowed
    messagesList.innerHTML = '<li class = "sent"><span>Sent:</span>' + message + '</li>';
    messageField.value = '';
    return false;            //Returning false tells the default event handler to be skipped
  };

  //when message is received
  socket.onmessage = function(event) {
    var message = event.data;
    messagesList.innerHTML = '<li class = "received"><span>Received:</span>' + message + '</li>';
  };

  closeBtn.onclick = function(e){
    e.preventDefault();
    socket.close();       //terminate websocket connection
    return false;
  };
  
  //close event is fired after connection is closed
  socket.onclose = function(e) {
    socketStatus.innerHTML = 'Disconnected from Websocket';
    socketStatus.className = 'closed';
  };
}