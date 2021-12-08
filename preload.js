window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (text) => {
      const element = document.getElementById("api-output");
      if (element) element.innerText = text
    }
    replaceText("");
})