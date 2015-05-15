var milkcocoa = new MilkCocoa("hoti9owfcaf.mlkcca.com");
/* your-app-id �ɃA�v���쐬���ɔ��s�����app-id���L�����܂� */
var chatDataStore = milkcocoa.dataStore('chat');
var textArea, board;
window.onload = function () {
    textArea = document.getElementById("msg");
    board = document.getElementById("board");
    // ����܂ł̃f�[�^�����ׂēǂݏo��
    getChatAll();
}

function getChatAll() {
    chatDataStore.stream().next(
        function (err, data) {
            for (var i = 0 ; i < data.length ; i++) {
                addText(data[i].value.message);
            }
        }
    );
}

function clickEvent() {
    var text = textArea.value;
    sendText(text);
}

function sendText(text) {
    chatDataStore.push({ message: text });
    console.log("���M����!");
    textArea.value = "";
}

chatDataStore.on("push", function (data) {
    addText(data.value.message);
});

function addText(text) {
    var msgDom = document.createElement("li");
    msgDom.innerHTML = text;
    board.insertBefore(msgDom, board.firstChild);
}
