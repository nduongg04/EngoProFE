const url = "http://localhost:3000/api/v1/search";

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action == "fetchData") {
        const body = {
            keyword: message.word,
            context: message.context,
        };
        try {
            const response = await fetch(url, {
                method: "POST",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            if (response.ok) {
                const res = await response.json();
                chrome.tabs.sendMessage(sender.tab.id, {
                    success: true,
                    data: res.data,
                });
            } else {
                chrome.tabs.sendMessage(sender.tab.id, {
                    success: false,
                    message: "Something went wrong",
                });
            }
        } catch (e) {
            chrome.tabs.sendMessage(sender.tab.id, {
                success: false,
                message: "Something went wrong",
            });
        }
    }

    return true;
});
