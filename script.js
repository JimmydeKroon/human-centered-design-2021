const boards = document.querySelectorAll('ol')
const listItems = document.querySelectorAll('ol > li')

listItems.forEach(function(li, index) {
  li.addEventListener('click', function() {
    const siblingItems = this.parentElement.children

    console.log(siblingItems);
    listItems.forEach(function(li) {
      li.classList.add('hide')
    })
    
    for (let item of siblingItems) {
      item.classList.remove('hide')
    }
  })
});