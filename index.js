const inputWrapper = document.querySelector('.input-wrapper');
const input = createElement('input', 'search-input');
inputWrapper.append(input);

const startSearch = debounce(searchRepository, 500);
let result;

input.addEventListener('keyup', startSearch);

function createElement(tagName, tagClass) {
    const element = document.createElement(tagName);
    if (tagClass) {
        element.classList.add(tagClass)
    }

    return element;
}

function debounce(fn, ms) {
    return function(...args) {
        let previousCall = this.lastCall
        this.lastCall = Date.now()
  
        if (previousCall && this.lastCall - previousCall <= ms) {
            clearTimeout(this.lastCallTimer)
        }

        this.lastCallTimer = setTimeout(() => fn(...args), ms)
    }
}

async function searchRepository() {
    return await fetch(`https://api.github.com/search/repositories?q=${input.value}&per_page=5`)
        .then(response => response.json())
        .then(response => {
            let createSelectRepositories;
            const selectRepositories = document.querySelector('.select-repositories');
            let element;
            result = response.items;

            if (input.value == '') {
                selectRepositories.remove();
                return;
            }

            if (!selectRepositories) {
                createSelectRepositories = createElement('ul', 'select-repositories');
                inputWrapper.append(createSelectRepositories);
    
                result.forEach(item => {
                    element = createElement('li', 'select-repositories__item');
                    element.textContent = `${item.name}`;
                    createSelectRepositories.append(element);
                });
            
            } else {
                let item = document.querySelectorAll('.select-repositories__item')
                item.forEach((el, i) => {
                    el.textContent = `${result[i]['name']}`
                });
            }

        })
        .catch(err => console.log(err));
}

const selectRepositories = document.querySelector('.select-repositories');
console.log(selectRepositories)
selectRepositories.addEventListener('click', (e) => {
    let target = e.target;
    if (target.tagName != 'li') return;
    console.log(e.target)
})






