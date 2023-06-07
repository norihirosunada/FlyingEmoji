function connectDone() {
    select("#connection_text").html("Connected");
}

function preload() {
    let params = getURLParams();
    partyConnect(
        "wss://web-production-81f2a.up.railway.app/",
        "like_button",
        params.room ?? "main",
        connectDone,
    );
}

function setup() {
    noCanvas();

    selectAll("button").forEach((button) => {
        if (button.attribute("data-type") == "emoji") {
            button.touchStarted((_) => {
                partyEmit(
                    button.attribute("data-func"),
                    button.attribute("data-emoji"),
                );
            });
        }
    });
}
