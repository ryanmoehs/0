const API_KEY = 'AIzaSyDDiO8nLVRMDaXwrJp61Cdcar5gFmmiR1Q';
let fontsList = [];
const el = document.querySelector(".text");
el.addEventListener('click', () => {
    const choosedFont = loadRandomFont(fontsList);
    updateFont(el, choosedFont);
});
async function loadFontsList() {
    try {
        const result = await fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=' + API_KEY);
        const data = await result.json();
        console.log('loaded google fonts list: ', data.items.length);
        return data.items;
    } catch (error) {
        console.log('loadFontsList', error, error.message);
    }
}
function loadRandomFont(fontsList) {
    const randomIndex = Math.floor(Math.random() * fontsList.length);
    const choosedFont = fontsList[randomIndex].family;
    WebFont.load({
        google: {
            families: [choosedFont]
        }
    });
    console.log('choosed font: ', choosedFont);
    return choosedFont;
}
function updateFont(el, choosedFont) {
    el = document.querySelector(".text");
    el.style.fontFamily = choosedFont;
    el.setAttribute('title', choosedFont);
}
async function main() {
    fontsList = await loadFontsList();
    const choosedFont = loadRandomFont(fontsList);
    updateFont(el, choosedFont);
}
main();