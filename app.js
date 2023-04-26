const form = document.querySelector('form')
    const input = document.querySelector('#new-item')
    const itemList = document.querySelector('#item-list ul')
    const selectAllButton = document.querySelector('#select-all')
    const deleteAllButton = document.querySelector('#delete-all')
    let items = JSON.parse(localStorage.getItem('items')) || []

    function addItem(e) {
      e.preventDefault()
      if (!input.value) return
      const item = {
        text: input.value,
        completed: false
      }
      items.push(item)
      localStorage.setItem('items', JSON.stringify(items))
      input.value = ''
      displayItems()
    }

    function displayItems() {
      itemList.innerHTML = ''
      items.forEach((item, index) => {
        const li = document.createElement('li')


        const span = document.createElement('span')
        span.textContent = item.text
        span.className = item.completed ? 'completed' : ''
        li.appendChild(span)

        const deleteButton = document.createElement('button')
        deleteButton.className = 'delete-button'
        deleteButton.textContent = 'x'
        deleteButton.dataset.index = index
        deleteButton.addEventListener('click', deleteItem)
        li.appendChild(deleteButton)
        itemList.appendChild(li)

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = item.completed
        checkbox.addEventListener('click', toggleCompleted)
        li.appendChild(checkbox)
      })
    }

    function toggleCompleted(e) {
      const index = e.target.parentElement.querySelector('.delete-button').dataset.index
      items[index].completed = !items[index].completed
      localStorage.setItem('items', JSON.stringify(items))
      displayItems()
    }

    // 여기입니다
    function deleteItem(e) {
      const index = e.target.dataset.index
      items.splice(index, 1)
      localStorage.setItem('items', JSON.stringify(items))
      displayItems()
    }

    function selectAllItems() {
      items.forEach((item) => {
        item.completed = true
      })
      localStorage.setItem('items', JSON.stringify(items))
      displayItems()
    }

    function deleteAllItems() {
      items = []
      localStorage.setItem('items', JSON.stringify(items))
      displayItems()
    }

    form.addEventListener('submit', addItem)
    selectAllButton.addEventListener('click', selectAllItems)
    deleteAllButton.addEventListener('click', deleteAllItems)
    displayItems()