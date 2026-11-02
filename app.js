const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
$("#year").textContent = new Date().getFullYear();

const translations = {
  ru: {
    navEngines:"Двигатели",navModules:"Модули",navWorkspace:"Рабочая зона",openWorkspace:"Открыть платформу",
    eyebrow:"ИНТЕЛЛЕКТУАЛЬНАЯ ЭКОСИСТЕМА · ВЕРСИЯ 0.1",heroSubtitle:"Думать глубже. Исследовать точнее. Превращать идеи в цифровую ценность.",
    startNow:"Начать работу",exploreSystem:"Изучить систему ↓",metaEngines:"интеллектуальных двигателя",metaModules:"основных модулей",metaMission:"общая миссия",
    twoEngines:"Два двигателя.<br><em>Одна экосистема.</em>",twoEnginesText:"Два взаимосвязанных направления: исследовать и создавать — затем упаковывать результат в полезные продукты.",
    neuroDesc:"Интеллектуальная лаборатория для анализа, исследований, поиска закономерностей и развития идей.",
    moneyDesc:"Экономическая лаборатория для создания цифровых продуктов, бизнес-концепций и стратегий продаж.",
    openNeuro:"Открыть NEURO",openMoney:"Открыть AI MONEY",modulesTitle:"Инструменты для<br><em>движения вперёд.</em>",
    modulesText:"Начинаем с понятных функций и постепенно добавляем реальные AI-интеграции, хранение данных и коммерческие возможности.",
    mResearch:"Структурирование вопросов и исследовательских задач.",mPattern:"Поиск повторяющихся связей и проверка гипотез.",
    mKnowledge:"Организация заметок, выводов и источников.",mIdeas:"Преобразование идей в планы и прототипы.",
    mProduct:"Проектирование электронных книг, шаблонов и наборов.",mSales:"Анализ аудитории, позиционирование и план продаж.",
    workspaceTitle:"Рабочая <em>зона.</em>",demoStatus:"ДЕМО-РЕЖИМ",selectEngine:"ВЫБЕРИТЕ ДВИГАТЕЛЬ",prototypeNote:"Прототип интерфейса",
    taskType:"ТИП ЗАДАЧИ",describeTask:"ОПИШИТЕ ЗАДАЧУ",privacyNote:"Не вводите пароли и платёжные данные.",
    runButton:"Подготовить результат",resultPlaceholder:"Здесь появится структурированный план вашей задачи.",
    disclaimer:"Демонстрация: результат формируется в браузере по шаблону. Подключение настоящей AI-модели и сохранение проектов добавим на следующих этапах.",
    closingText:"Создаём платформу шаг за шагом — от первого прототипа к реальным инструментам.",backToWorkspace:"Перейти в рабочую зону ↗"
  },
  en: {
    navEngines:"Engines",navModules:"Modules",navWorkspace:"Workspace",openWorkspace:"Open platform",
    eyebrow:"INTELLIGENCE ECOSYSTEM · VERSION 0.1",heroSubtitle:"Think deeper. Research smarter. Turn ideas into digital value.",
    startNow:"Start working",exploreSystem:"Explore system ↓",metaEngines:"intelligence engines",metaModules:"core modules",metaMission:"shared mission",
    twoEngines:"Two engines.<br><em>One ecosystem.</em>",twoEnginesText:"Two connected directions: research and create — then shape the results into useful products.",
    neuroDesc:"An intelligence lab for analysis, research, pattern discovery and idea development.",
    moneyDesc:"An economic lab for digital products, business concepts and sales strategies.",
    openNeuro:"Open NEURO",openMoney:"Open AI MONEY",modulesTitle:"Tools to move<br><em>forward.</em>",
    modulesText:"We start with clear features and gradually add real AI integrations, data storage and commercial capabilities.",
    mResearch:"Structure questions and research tasks.",mPattern:"Find recurring connections and test hypotheses.",
    mKnowledge:"Organize notes, findings and sources.",mIdeas:"Turn ideas into plans and prototypes.",
    mProduct:"Design ebooks, templates and digital bundles.",mSales:"Audience research, positioning and sales plans.",
    workspaceTitle:"Work <em>space.</em>",demoStatus:"DEMO MODE",selectEngine:"SELECT AN ENGINE",prototypeNote:"Interface prototype",
    taskType:"TASK TYPE",describeTask:"DESCRIBE YOUR TASK",privacyNote:"Do not enter passwords or payment details.",
    runButton:"Prepare result",resultPlaceholder:"A structured plan for your task will appear here.",
    disclaimer:"Demo: results are generated in the browser from a template. A real AI model connection and project saving will be added in later stages.",
    closingText:"Building the platform step by step — from the first prototype to real tools.",backToWorkspace:"Go to workspace ↗"
  }
};
let language = "ru";
$("#langToggle").addEventListener("click", () => {
  language = language === "ru" ? "en" : "ru";
  document.documentElement.lang = language;
  $("#langToggle").textContent = language === "ru" ? "EN" : "RU";
  $$("[data-i18n]").forEach(el => { const key=el.dataset.i18n; if(translations[language][key]) el.innerHTML=translations[language][key]; });
});
$("#menuToggle").addEventListener("click", () => $(".nav").classList.toggle("open"));
$$(".nav a").forEach(a => a.addEventListener("click",()=>$(".nav").classList.remove("open")));

const taskOptions = {
  neuro: [
    ["research","Исследование / Research"],["patterns","Поиск закономерностей / Patterns"],
    ["knowledge","Структура базы знаний / Knowledge"],["ideas","Разработка идеи / Ideas"]
  ],
  money: [
    ["product","Цифровой продукт / Product"],["business","Бизнес-концепция / Business"],
    ["market","Анализ рынка / Market research"],["sales","Стратегия продаж / Sales"]
  ]
};
let activeEngine = "neuro";
function setEngine(engine) {
  activeEngine = engine;
  $$(".engine-tab").forEach(b=>b.classList.toggle("active",b.dataset.tab===engine));
  $("#workspaceKicker").textContent = engine==="neuro" ? "NEURO MIND ENGINE" : "AI MONEY ENGINE";
  $("#workspaceTitle").textContent = engine==="neuro" ? "Research Assistant" : "Business Assistant";
  $("#taskType").innerHTML = taskOptions[engine].map(([v,l])=>`<option value="${v}">${l}</option>`).join("");
  $("#resultPanel").innerHTML = `<div class="result-empty"><span>✧</span><p>${language==="ru"?"Здесь появится структурированный план вашей задачи.":"A structured plan for your task will appear here."}</p></div>`;
}
$$(".engine-tab").forEach(b=>b.addEventListener("click",()=>setEngine(b.dataset.tab)));
$$(".card-link").forEach(a=>a.addEventListener("click",()=>setEngine(a.dataset.engine)));

$("#runTask").addEventListener("click", async () => {
  const task = $("#taskInput").value.trim();
  if(!task){ $("#taskInput").focus(); $("#taskInput").placeholder=language==="ru"?"Сначала опишите задачу…":"Describe your task first…"; return; }
  const selected = $("#taskType").selectedOptions[0].textContent;
  const button = $("#runTask");
  const originalLabel = button.textContent;
  button.disabled = true;
  button.textContent = language==="ru" ? "ИИ анализирует…" : "AI is analyzing…";
  $("#resultPanel").innerHTML = `<div class="result-content"><h4>✧ ${language==="ru"?"Выполняется анализ":"Analysis in progress"}</h4><p>${language==="ru"?"Подключаемся к AI-модели. Это может занять несколько секунд.":"Connecting to the AI model. This may take a few seconds."}</p></div>`;
  try {
    const response = await fetch("/.netlify/functions/ai-assistant", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ engine: activeEngine, taskType: selected, task })
    });
    const data = await response.json();
    if(!response.ok) throw new Error(data.error || `Request failed (${response.status})`);
    const safeResult = escapeHtml(data.result || "").replace(/\n/g,"<br>");
    $("#resultPanel").innerHTML = `<div class="result-content"><h4>✧ ${language==="ru"?"AI-результат":"AI result"}</h4><div style="font-size:12px;color:#d6e0ee;line-height:1.85;white-space:normal">${safeResult}</div><p style="font-size:9px;color:#8194aa;margin-top:14px">${language==="ru"?"AI-ответ может содержать ошибки. Проверяйте важные сведения.":"AI responses may contain errors. Verify important information."}</p></div>`;
  } catch(error) {
    const msg = escapeHtml(error.message || "Unknown error");
    $("#resultPanel").innerHTML = `<div class="result-content"><h4>✧ ${language==="ru"?"Не удалось получить ответ":"Could not get a response"}</h4><p style="font-size:12px;color:#d6e0ee;line-height:1.7">${msg}</p><p style="font-size:10px;color:#8194aa">${language==="ru"?"Проверьте подключение функции и ключ Gemini в настройках Netlify.":"Check the Netlify function and Gemini key configuration."}</p></div>`;
  } finally {
    button.disabled = false;
    button.textContent = originalLabel;
  }
});
function escapeHtml(str){return str.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
