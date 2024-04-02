const draggableBox = document.getElementById('draggableBox');

let offsetX, offsetY, isDragging = false;

draggableBox.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopDrag);

function startDrag(e) {
  isDragging = true;
  offsetX = e.clientX - draggableBox.getBoundingClientRect().left;
  offsetY = e.clientY - draggableBox.getBoundingClientRect().top;
}

function drag(e) {
  if (isDragging) {
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    draggableBox.style.left = x + 'px';
    draggableBox.style.top = y + 'px';
  }
}

function stopDrag() {
  isDragging = false;
}
