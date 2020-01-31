let editor = document.querySelector('.CodeMirror');
editor.addEventListener('paste', function () {
    let lang = document.querySelector('#sel_lang').value;
    if (lang === 'J') {
        let codemirror = editor.CodeMirror;
        codemirror.setValue(changeCode(codemirror.getValue(), "Solution"))
    }
});

function changeCode(code, name) {
    let rexPackage = new RegExp('package');
    let rexClass = new RegExp('class .*');
    let rexPsvm = new RegExp('public static void main');
    let classStack = [];
    let lines = code.trim().split('\n');
    if (rexPackage.test(lines[0])) {
        lines = lines.slice(1, lines.length)
    }
    for (let i = 0; i < lines.length; i++) {
        if (rexPsvm.test(lines[i])) {
            let line = classStack[0].line;
            while (!rexClass.test(lines[line])) {
                line--;
            }
            let checkClass = false
            let arr = lines[line].split(' ');
            for (let idx = 0; idx < arr.length; idx++) {
                if (checkClass) {
                    if (arr[idx][arr[idx].length - 1] === '{') {
                        name += ' {'
                    }
                    arr[idx] = name
                    break
                } else if (arr[idx] === 'class') {
                    checkClass = true
                }
            }
            lines[line] = arr.join(' ');
            break;
        }
        let chars = lines[i].split('');
        for (let char of chars) {
            if (char === '{') {
                if (classStack.length === 0) {
                    classStack.push({ 'line': i, 'count': 1 })
                } else {
                    classStack[classStack.length - 1].count++
                }
            } else if (char === '}') {
                if (classStack[classStack.length - 1].count === 1) {
                    classStack.pop()
                } else {
                    classStack[classStack.length - 1].count--
                }
            }
        }
    }
    return lines.join('\n').trim()
}