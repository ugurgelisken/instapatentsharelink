var i18nLangs;
const languages = ['tr', 'en'];
const urlParams = new URLSearchParams(window.location.search);
const lang = urlParams.get('lang');

const i18n = {
  lang: languages.includes(lang) ? lang : 'en',
  langPath: './../i18n/',

  _getScriptUrl() {
    return this.langPath + this.lang + '.json';
  },

  prefixLangScript() {
    document.documentElement.setAttribute('lang', i18n.lang);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        if (xhr.responseText) {
          const langScript = document.createElement('script');
          i18nLangs = JSON.parse(xhr.responseText);
          langScript.innerHTML = i18nLangs;
          if (i18nLangs && typeof i18n.replaceLang === 'function') {
            const launchI18nScript = document.createElement('script');
            launchI18nScript.innerHTML = 'i18n.replaceLang();';
            document.body.appendChild(launchI18nScript);
          }
        }
      }
    };
    xhr.open('GET', this._getScriptUrl(), true);
    xhr.send(null);
  },

  replaceLang() {
    document.querySelectorAll('[translate]').forEach(function (element) {
      try {
        let valuePathArray = element.getAttribute('translate').split('.');
        let result = i18nLangs;
        for (let value of valuePathArray) {
          result = result[value];
        }
        if (typeof result === 'string') {
          element.innerHTML = result;
        } else {
          element.innerHTML = '';
        }
      } catch (e) {
        element.innerHTML = '';
      }
    });
  },

  getLang() {
    return i18n.lang;
  },

  setLang(lang) {
    i18n.lang = lang;
    i18n.prefixLangScript();
  },

  translate(value) {
    if (!value) {
      return '';
    }
    return i18nLangs[value];
  },
};
i18n.prefixLangScript();
