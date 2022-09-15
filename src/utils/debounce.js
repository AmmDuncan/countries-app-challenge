let timeout;

function debounce(func, after = 1000) {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    func();
  }, after);
}

export { debounce };
