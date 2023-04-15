const input = document.querySelector('.queue__input')
const addButton = document.querySelector('.queue__add')
const removeButton = document.querySelector('.queue__remove')
const queueItems = document.querySelector('.queue__items')
const queueError = document.querySelector('.queue__error')

const queue = JSON.parse(localStorage.getItem('queue')) || []

const newQueueItemLayout = (text) => {
    const p = document.createElement("p")
    p.className = "queue__item"
    p.textContent = text
    return p
}

const loadQueueFromLocalStorage = () => {
    if (queue.length > 0) {
        queue.map(line => {
            queueItems.append(newQueueItemLayout(line))
        })
    }
}

window.onload = loadQueueFromLocalStorage

const addItemToQueue = () => {

    queueError.textContent = ""

    if (queue.length === 21) {
        queueError.textContent = "The queue is full. Maximum available size is 21"
        return
    }

    const newElem = input.value

    if (newElem === "") {
        queueError.textContent = "Fill the input"
        return
    }

    queue.push(newElem)
    localStorage.setItem('queue', JSON.stringify(queue))

    queueItems.append(newQueueItemLayout(newElem))

    input.value = ""
}

const removeItemFromQueue = () => {
    if (queue.length === 0)
        return

    queue.shift()
    queueItems.firstChild.remove()
    localStorage.setItem('queue', JSON.stringify(queue))
}

addButton.addEventListener('click', addItemToQueue)
removeButton.addEventListener('click', removeItemFromQueue)