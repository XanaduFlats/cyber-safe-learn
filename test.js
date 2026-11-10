// CyberSafe Learn — node tests. Run: node test.js
const fs=require('fs'), vm=require('vm'), path=require('path');
const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
let pass=0,fail=0; const results=[];
function check(name,cond){ if(cond){pass++;results.push('PASS '+name);} else {fail++;results.push('FAIL '+name);} }
// --- static file checks ---
check('file is non-empty and >20000 bytes', html.length>20000);
check('has DOCTYPE html', html.includes('<!DOCTYPE html>'));
check('no external script src', !/<script[^>]+src=/i.test(html));
check('no external stylesheet link', !/<link[^>]+href="https?:/i.test(html));
check('no external image src', !/<img[^>]+src="https?:/i.test(html));
check('no fetch() network call in core code', !/fetch\(/.test(html));
check('no XMLHttpRequest', !/XMLHttpRequest/.test(html));
check('has Home section', html.includes('id="section-home"'));
check('has Learn section', html.includes('id="section-learn"'));
check('has Practice section', html.includes('id="section-practice"'));
check('has My Safety section', html.includes('id="section-safety"'));
check('has Continue button', html.includes('Continue where I left off'));
check('has progress ring', html.includes('id="ring-fg"'));
check('has 3 picture cards on Home', (html.match(/class="pick"/g)||[]).length===3);
check('has Large text toggle', html.includes('Large text'));
check('has High contrast toggle', html.includes('High contrast'));
check('has Read aloud toggle', html.includes('Read aloud'));
check('has No ads toggle', html.includes('No ads'));
check('ad label exact text present', html.includes('Sponsored — this helps keep this app free for everyone.'));
check('ad slot only on Home (one ad-slot element)', (html.match(/id="ad-slot"/g)||[]).length===1);
check('no real ad network script (googlesyndication / doubleclick)', !/googlesyndication|doubleclick|adsbygoogle/i.test(html));
check('mentions no account / no data leaves device', html.includes('No account') && html.includes('No data leaves your device'));
check('mentions pretend data only in Practice', html.includes('pretend data only'));
// --- load JS in vm ---
const scriptMatch=html.match(/<script>([\s\S]*?)<\/script>/);
check('script block found', !!scriptMatch);
let M=null;
if(scriptMatch){
  const store={}; const localStorage={getItem:k=>store[k]??null,setItem:(k,v)=>{store[k]=String(v);},removeItem:k=>{delete store[k];}};
  const sandbox={console,module:{exports:{}},localStorage,navigator:{onLine:true},speechSynthesis:undefined,alert:()=>{},
    document:{readyState:'loading',addEventListener:()=>{},getElementById:()=>null,querySelectorAll:()=>[],querySelector:()=>null,createElement:()=>({classList:{add:()=>{}},setAttribute:()=>{},appendChild:()=>{}}),body:{classList:{toggle:()=>false,contains:()=>false}}},
    window:{}};
  sandbox.window=sandbox; sandbox.globalThis=sandbox;
  try{ vm.createContext(sandbox); vm.runInContext(scriptMatch[1],sandbox,{filename:'index.html-script'}); M=sandbox.module.exports; check('script runs in vm without crashing', !!M); }catch(e){ check('script runs in vm without crashing ('+e.message+')', false); }
}
if(M){
  check('6 paths present', Array.isArray(M.PATHS) && M.PATHS.length===6);
  check('path titles in order', M.PATHS.map(p=>p.id).join(',')==='passwords,scams,privacy,devices,money,help');
  check('total lessons = 18', M.totalLessons()===18);
  check('each path has 3 lessons', M.PATHS.every(p=>p.lessons.length===3));
  check('every lesson has story, rule, tryIt, quiz, badge', M.PATHS.every(p=>p.lessons.every(l=>l.story&&l.story.length>20&&l.rule&&l.rule.length>20&&l.tryIt&&l.quiz&&l.quiz.q&&l.quiz.options.length===3&&typeof l.quiz.answer==='number'&&l.badge)));
  check('every quiz answer in range', M.PATHS.every(p=>p.lessons.every(l=>l.quiz.answer>=0&&l.quiz.answer<3)));
  check('findLesson works', M.findLesson('passwords','pw1') && M.findLesson('passwords','pw1').lesson.title.includes('password'));
  check('findLesson returns null for unknown', M.findLesson('nope','x')===null);
  check('quizAnswer correct', M.quizAnswer(M.findLesson('passwords','pw1').lesson,1)===true);
  check('quizAnswer wrong', M.quizAnswer(M.findLesson('passwords','pw1').lesson,0)===false);
  check('password: weak short password scores low', M.checkPassword('Fluffy123').score<=2);
  check('password: long passphrase scores high', M.checkPassword('correct-horse-battery-staple').score>=4 && M.checkPassword('correct-horse-battery-staple').label.includes('strong'));
  check('password: common password scores 0', M.checkPassword('password123').score===0);
  check('password: tips provided for weak', M.checkPassword('abc').tips.length>0);
  check('link: safe https link not risky', M.checkLink('https://example.com/learn').risky===false);
  check('link: http link risky', M.checkLink('http://example.com').risky===true);
  check('link: IP link risky', M.checkLink('http://192.168.1.1/login').risky===true);
  check('link: shortener risky', M.checkLink('https://bit.ly/abc123').risky===true);
  check('link: misspelled brand risky', M.checkLink('https://paypa1-secure.com/login').risky===true);
  check('phishing: urgent + password = phish', M.classifyMessage('URGENT tap here now verify your password').isPhish===true);
  check('phishing: normal message not phish', M.classifyMessage('Hi, are we still meeting Saturday?').isPhish===false);
  check('PHISH examples = 6 with reasons', Array.isArray(M.PHISH) && M.PHISH.length===6 && M.PHISH.every(m=>m.why&&typeof m.isPhish==='boolean'));
  check('PHISH has both real and scam', M.PHISH.some(m=>m.isPhish) && M.PHISH.some(m=>!m.isPhish));
  check('checklist = 6 items', Array.isArray(M.CHECKLIST) && M.CHECKLIST.length===6);
  check('ad: online + noAds false => show', M.shouldShowAd({online:true,noAds:false})===true);
  check('ad: offline => hide', M.shouldShowAd({online:false,noAds:false})===false);
  check('ad: noAds true => hide even online', M.shouldShowAd({online:true,noAds:true})===false);
  // progress save/load with mock store
  const s={}; const mock={getItem:k=>s[k]??null,setItem:(k,v)=>{s[k]=String(v);}};
  let p=M.loadProgress(mock); check('progress loads empty', p.lessons && Object.keys(p.lessons).length===0);
  M.completeLesson(p,'passwords','pw1'); check('completeLesson marks lesson + badge', p.lessons['passwords:pw1']===true && p.badges.includes('Passphrase Starter'));
  check('progressPercent after 1/18', M.progressPercent(p).done===1 && M.progressPercent(p).total===18);
  check('nextLesson after 1 is pw2', M.nextLesson(p)==='passwords:pw2');
  check('saveProgress returns true and round-trips', M.saveProgress(p,mock)===true && M.loadProgress(mock).lessons['passwords:pw1']===true);
  check('completeLesson unknown does not crash / no badge', (()=>{const q=M.loadProgress(mock); M.completeLesson(q,'nope','x'); return Object.keys(q.lessons).length===1;})());
  check('readAloud returns false without speechSynthesis', M.readAloud('hello')===false);
}
console.log(results.join('\n'));
console.log(`\n${pass} passed, ${fail} failed, ${pass+fail} total`);
process.exit(fail?1:0);
