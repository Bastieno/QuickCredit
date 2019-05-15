// Get the Sidebar
const mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
const overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
fopen = () => {
  if (mySidebar.style.display === 'block') {
	mySidebar.style.display = 'none';
	overlayBg.style.display = "none";
  } else {
  mySidebar.style.display = 'block';
  mySidebar.classList.remove('hide');
	overlayBg.style.display = "block";
  }
}

// Close the sidebar with the close button
fclose = () => {
  mySidebar.style.display = "none";
  overlayBg.style.display = "none";
}