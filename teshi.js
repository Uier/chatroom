var name = prompt("Nickname(user): ");

document.addEventListener("DOMContentLoaded", function() {
    socket.on("connect", function() {
        $("#status").text("Connected");
        $("#user").text(name);
    });

    socket.on("disconnect", function() {
       	$("#status").text("Disconnected");
    });

    socket.on("online", function(amount) {
        $("#online").text(amount);
    });

    function submit(e) {
        e.preventDefault();
        var content = "<div id=user>"+name+":</div><div>"+$("textarea").val()+"</div>";
        console.log("send: "+name+": "+$("textarea").val());
        socket.emit("send", content);
        $("textarea").val('');
        $("textarea").height(30);
    }

    socket.on("msg", function(content) {
    	$("#content").append(content);
	$("#content").scrollTop($("#content").prop("scrollHeight"));
    });

    $("textarea").on("keydown", function(e) {
        if ( e.ctrlKey && e.keyCode === 13 ) {
            submit(e);
        }
    });

    $("button").click(function(e) {
    	submit(e);
    });
});
