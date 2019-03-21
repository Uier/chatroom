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
        $("#content").append("<div id=user>"+name+":</div>");
    	$("#content").append("<div>"+$("textarea").val()+"</div>");
        $("#content").scrollTop($("#content").prop("scrollHeight"));
        $("textarea").val('');
        $("textarea").height(30);
    }

    $("textarea").on("keydown", function(e) {
        if ( e.ctrlKey && e.keyCode === 13 ) {
            submit(e);
        }
    });

    $("button").click(function(e) {
    	submit(e);
    });
});