document.addEventListener("selectionchange", () => {
  removeExistingButtonAndPopup();

  const selectedText = window.getSelection().toString().trim();
  if (!selectedText) return;

  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  const contextNode = range.startContainer;
  if (contextNode.nodeType !== Node.TEXT_NODE) {
    return;
  }
  const startOffset = range.startOffset;
  console.log(selectedText);
  const context = getContextOfWord(contextNode, selectedText, startOffset);
  console.log(context);
  fetch(chrome.runtime.getURL("buttonTemplate.html"))
    .then((res) => res.text())
    .then((htmlContent) => {
      console.log("123");
      const buttonContiner = document.createElement("div");
      buttonContiner.id = "highlight-btn";
      buttonContiner.style.top = `${window.scrollY + rect.bottom + 5}px`;
      buttonContiner.style.left = `${window.scrollX + rect.left}px`;
      buttonContiner.innerHTML = htmlContent;
      document.body.appendChild(buttonContiner);
      const button = buttonContiner.querySelector("button");
      button.addEventListener("click", (event) => {
        showPopup(selectedText, context, rect);
      });
    })
    .catch((e) => console.log(e));
});

function removeExistingButtonAndPopup() {
  const existingButton = document.getElementById("highlight-btn");
  if (existingButton) existingButton.remove();

  const existingPopup = document.getElementById("text-popup");
  if (existingPopup) existingPopup.remove();
}

function showPopup(text, context, rect) {
  removeExistingButtonAndPopup();
  fetchAPIBackground(text, context, rect);
}

function fetchAPIBackground(text, context, rect) {
  chrome.runtime.sendMessage({
    action: "fetchData",
    word: text,
    context: context,
  });
  const opts = {
    lines: 12, // Số lượng vòng xoay
    length: 7, // Độ dài mỗi đoạn
    width: 4, // Độ dày đoạn nhỏ lại
    radius: 10, // Bán kính của spinner
    scale: 0.5, // Tỷ lệ thu nhỏ (0.5 = 50%)
  };
  let spinner;
  fetch(chrome.runtime.getURL("popup.html"))
    .then((res) => res.text())
    .then((htmlContent) => {
      const popupContainer = document.createElement("div");

      popupContainer.id = "text-popup";
      popupContainer.style.top = `${window.scrollY + rect.bottom + 10}px`;
      popupContainer.style.left = `${window.scrollX + rect.left}px`;
      popupContainer.innerHTML = htmlContent;
      document.body.appendChild(popupContainer);

      const popup = document.getElementById("popup");
      spinner = new Spinner(opts).spin(popup);
    })
    .catch((e) => console.log(e));

  chrome.runtime.onMessage.addListener((res) => {
    if (res.success) {
      const html = marked.parse(res.data);
      spinner.stop();
      const popup = document.getElementById("popup");
      if (popup) {
        popup.innerHTML = html;
      }
    } else {
      const html = "<p style={color:'red'}>Something went wrong</p>";
      spinner.stop();
      const popup = document.getElementById("popup");
      if (popup) {
        popup.innerHTML = html;
      }
    }
  });
}

function getContextOfWord(node, selectedText, startOffset) {
  let textContent = node.textContent || "";
  if (node.nodeType !== Node.TEXT_NODE) {
    textContent = node.parentNode.textContent || "";
  }
  const sentences = [];
  let regex = /[^.!?]+[.!?]/g;
  let match;
  while ((match = regex.exec(textContent)) !== null) {
    sentences.push({
      text: match[0].trim(),
      start: match.index,
      end: match.index + match[0].length,
    });
  }
  if (sentences.length == 0) return textContent;
  for (const sentence of sentences) {
    if (
      sentence.text.includes(selectedText) &&
      startOffset >= sentence.start &&
      startOffset < sentence.end
    ) {
      return sentence.text;
    }
  }

  return null;
}
