const boards = document.querySelectorAll('ol')
const listItems = document.querySelectorAll('ol > li')
const keyText = ['OR press J', 'OR press J', 'OR press K', 'OR press L']
const boardColors = ['var(--accent)', 'var(--accent2)', 'var(--accent3)', 'var(--accent4)']

let editActive = true;
let selectedItem = null;

listItems.forEach(function(li, index) {
  li.addEventListener('click', function() {
    selectedItem = this

    if (editActive) {
      const siblingItems = this.parentElement.children
      
      // make all items in the clicked BOARD low opacity
      for (i = 0; i < siblingItems.length; i++) {
        siblingItems[i].style.opacity = '0.3';
      }

      // make the clicked TASK & the title of the clicked BOARD high opacity again
      this.style.opacity = '1';
      this.parentElement.children[0].style.opacity = '1';

      // make all boards low opacity except for the clicked board
      for (i = 0; i < boards.length; i++) {
        if (boards[i] !== this.parentElement){
          boards[i].style.opacity = '0.3';
        }
      }
      
      // hide all the tasks for the other boards
      listItems.forEach(function emptyBoards(li) {
        if (li.parentElement.children !==  siblingItems) {
          // li.classList.add('hide')
          li.style.opacity = '0.3';
        }
      })

      // add the submenu
      let div = document.createElement('div');
      div.className = 'dropmenu';
      this.appendChild(div);

      let submenu = this.querySelector('div')
      
      let movetitle = document.createElement('h3');
      submenu.appendChild(movetitle);
      movetitle.textContent = 'Move to';
      
      for (i = 0; i < boards.length; i++){
        let p = document.createElement('p');
        if (boards[i] !== this.parentElement) {
            submenu.appendChild(p);
            p.textContent = boards[i].children[0].textContent; //+ " " + keyText[i];
            
            let otherboards = boards[i]
            let otherboardsColors = boardColors[i]
            p.addEventListener('mouseover', function() {
              otherboards.style.border = '3px solid ' + otherboardsColors;
            })

            p.addEventListener('mouseout', function() {
              otherboards.style.border = 'none';
            })

            p.addEventListener('click', function() {
              otherboards.appendChild(selectedItem);
              otherboards.style.border = 'none';
              otherboards.style.opacity = '1';
            })

            p.style.borderLeft = '4px solid ' + boardColors[i];
        }
      }

      editActive = false;
    } else {
      // reset everything
        for (i = 0; i < boards.length; i++) {
          if (boards[i] !== this.parentElement){
            boards[i].style.opacity = '1';
          }
        }
  
        listItems.forEach(function emptyBoards(li) {
            li.classList.remove('hide');
            li.style.opacity = '1';
        })

        let submenu = document.querySelector('.dropmenu');
        submenu.parentNode.removeChild(submenu);

        editActive = true;
    } 
  })
});
