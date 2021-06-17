let currentItem = null;
const items = document.querySelectorAll('.item');
const placeholders = document.querySelectorAll('.placeholder');
const buttons = document.querySelectorAll('.action-add');

items.forEach((item) => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

placeholders.forEach((placeholder) => {
    placeholder.addEventListener('dragover', dragOver);
    placeholder.addEventListener('dragenter', dragEnter);
    placeholder.addEventListener('dragleave', dragLeave);
    placeholder.addEventListener('drop', dragDrop);
});

buttons.forEach((button) => {
    button.addEventListener('click', addNewCard);
});

function addNewCard(event) {
    const item = createNewCard();
    const column = findPlaceholderId(placeholders, event.target.dataset.id);
    column.append(item);
}

function findPlaceholderId(placeholders, id) {
    let column = null;
    placeholders.forEach((placeholder) => {
        if (placeholder.dataset.id === id) {
            column = placeholder;
        }
    });

    return column;
}

function createNewCard() {
    const newCard = document.createElement('div');
    newCard.classList.add('item');
    newCard.setAttribute('draggable', true);
    newCard.textContent = 'Перетащи меня';

    newCard.addEventListener('dragstart', dragStart);
    newCard.addEventListener('dragend', dragEnd);

    return newCard;
}

function dragStart(event) {
    currentItem = event.target;
    event.target.classList.add('hold');
    setTimeout(() => event.target.classList.add('hide'), 0);
}

function dragEnd(event) {
    currentItem = null;
    event.target.classList.remove('hold', 'hide');
}

function dragOver(event) {
    event.preventDefault();
}

function dragEnter(event) {
    if (event.target.classList.contains('item')) return;
    event.target.classList.add('hovered');
}

function dragLeave(event) {
    event.target.classList.remove('hovered');
}

function dragDrop(event) {
    event.target.classList.remove('hovered');
    event.target.append(currentItem);
}