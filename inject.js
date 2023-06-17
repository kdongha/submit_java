function injectScript(file_path, tag) {
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
}
const rexBoj = new RegExp("https://www.acmicpc.net/submit/")
const rexBojContest = new RegExp("https://www.acmicpc.net/contest/submit/")
const rexSwea = new RegExp("https://swexpertacademy.com/main/solvingProblem/solvingProblem.do")
const rexJungol = new RegExp("http://www.jungol.co.kr/theme/jungol/submitpage.php?")

let url = window.location.href
if (rexBoj.test(url) || rexBojContest.test(url)) {
    injectScript(chrome.runtime.getURL('boj.js'), 'body');
} else if (rexSwea.test(url)) {
    injectScript(chrome.runtime.getURL('swea.js'), 'body');
} else if (rexJungol.test(url)) {
    injectScript(chrome.runtime.getURL('jungol.js'), 'body');
}