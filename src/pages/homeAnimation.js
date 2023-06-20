// Function to check if an element is visible in the viewport
function isElementVisible(element) {
  var rect = element.getBoundingClientRect();
  var windowHeight = window.innerHeight || document.documentElement.clientHeight;
  return (rect.top >= 0 && rect.bottom <= windowHeight);
}

// Function to handle the scroll event
function handleScroll() {
  var elements = document.querySelectorAll('.animate-on-scroll');
  elements.forEach(function(element) {
    if (isElementVisible(element)) {
      element.classList.add('show');
    }
  });
}

// Attach the scroll event listener
window.addEventListener('scroll', handleScroll);

// Trigger the animation on initial page load
handleScroll();
