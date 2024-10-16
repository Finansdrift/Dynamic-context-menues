/**
 * Dynamic context menus
 * Script to demonstrate how to programmatically create a context menu with three options 
 * and add event listeners to them. This also demonstrates how to programmatically remove the elements and their eventhandlers
 */ 

var contextMenu;

// -----------------------------
// Add a mutation observer to detect when an element is added to the DOM. This is not essential for the overall operation of the script
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        console.log('Element added to the DOM:', mutation.addedNodes[0]);
      }
    });
  });
  observer.observe(document, {
    childList: true, subtree: true
  });
  // -----------------------------

const menuOptionsHandler = (e) => {
    console.log(e.target.textContent);
};

const invokerRightClickHandler = (e) => {
    e.preventDefault();
    contextMenu.style.display = 'block';
    contextMenu.style.top = e.clientY + 'px';
    contextMenu.style.left = e.clientX + 'px';
};

const invokerLeftClickHandler = (e) => {
    // Check if the left mouse button was clicked
    if (e.button === 0) {
        // Show the context menu
        contextMenu.style.display = 'block';
        contextMenu.style.top = e.clientY + 'px';
        contextMenu.style.left = e.clientX + 'px';
        e.stopPropagation();
    }
};

// Add event listener to hide the context menu when clicked outside
document.addEventListener('click', function(event) {
    if (event.target !== contextMenu && event.target.parentNode !== contextMenu) {  // && event.target !== element
        if (typeof contextMenu !== 'undefined') {
            contextMenu.style.display = 'none'; 
          }
    }
});

function createInvoker() {
    const invoker = document.createElement('button');
    invoker.className = 'invokerbutton';
    invoker.textContent = 'I have a context menu';
    // Add event listener for right-click
    invoker.addEventListener('contextmenu', invokerRightClickHandler);
    // Add event listener for left-click
    invoker.addEventListener('click', invokerLeftClickHandler);
    createContextMenu();
    document.body.appendChild(invoker);
}

function createContextMenu() {
        // Create a context menu
        contextMenu = document.createElement('div');
        contextMenu.className = 'context-menu';
        contextMenu.style.display = 'none;';
        // Add menu items
        const menuItem1 = document.createElement('div');
        menuItem1.textContent = 'Option 1';
        menuItem1.addEventListener('click', menuOptionsHandler);
        menuItem1.className = 'option';
        const menuItem2 = document.createElement('div');
        menuItem2.textContent = 'Option 2';
        menuItem2.addEventListener('click', menuOptionsHandler);
        menuItem2.className = 'option';
        const menuItem3 = document.createElement('div');
        menuItem3.textContent = 'Option 3';
        menuItem3.addEventListener('click', menuOptionsHandler);
        menuItem3.className = 'option';
        contextMenu.appendChild(menuItem1);
        contextMenu.appendChild(menuItem2);
        contextMenu.appendChild(menuItem3);
        // Add context menu to the page
        document.body.appendChild(contextMenu);
}

function buttonLogicForRemoveButton() {
    // remove event handlers for the context menu options
    var options = document.querySelectorAll(".option");
    var invokerbuttons = document.querySelectorAll(".invokerbutton");
    for (var i = 0; i < options.length; i++) {
        options[i].removeEventListener("click", menuOptionsHandler);
    }
    // remove event handlers for the invoker-buttons
    for (var i = 0; i < invokerbuttons.length; i++) {
        invokerbuttons[i].removeEventListener("contextmenu", invokerRightClickHandler);
        invokerbuttons[i].removeEventListener("click", invokerLeftClickHandler); 
        invokerbuttons[i].remove();
    }
}

window.onload = function () {    
    
}