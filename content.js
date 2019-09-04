var url = window.location.href
const Re_boj = /https:\/\/www.acmicpc.net\/submit\//
const Re_swea = /https:\/\/swexpertacademy.com\/main\/solvingProblem\/solvingProblem.do/
var name = "Main"
var temp = 0
var lang
if (Re_boj.test(url)) {
    console.log("boj!")
    lang = document.querySelector('.chosen-single').innerText
} else if (Re_swea.test(url)) {
    if (document.querySelector('#sel_lang').value === "J") {
        lang = "Java"
        name = "Solution"
        temp = 1
    }
}
if (lang === "Java") {
    var editor = document.querySelector('.CodeMirror')
    const Re_package = /package/
    const Re_class = /class/
    const Re_psvm = /public static void main/
    editor.addEventListener('paste', function () {
        var codemirror = editor.CodeMirror
        var classLine;
        var line = 0;
        while (line < codemirror.lastLine()) {
            codemirror.setCursor(line)
            var code = codemirror.getLine(line)
            if (Re_package.test(code)) {
                codemirror.execCommand("deleteLine")
            } else if (Re_class.test(code)) {
                classLine = line++
            } else if (Re_psvm.test(code)) {
                document.getElementsByClassName("CodeMirror-line")[classLine + temp].querySelector(".cm-def").innerText = name
                var text = document.getElementsByClassName("CodeMirror-line")[classLine + temp].innerText
                codemirror.setCursor(classLine)
                codemirror.execCommand("killLine")
                codemirror.replaceSelection(text)
                break;
            } else {
                line++
            }
        }
    })
}