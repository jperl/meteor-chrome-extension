var ddp = new MeteorDdp("ws://localhost:3000/websocket");

var publicParties = 0;

ddp.connect().then(function () {
    ddp.subscribe("parties");

    ddp.watch("parties", function (changedDoc, message) {
        if (message === "added")
            publicParties++;
        if (message === "removed")
            publicParties--;

        chrome.browserAction.setBadgeText({text: publicParties.toString()});
    });
});