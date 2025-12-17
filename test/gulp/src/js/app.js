(d => {
  d.addEventListener('DOMContentLoaded', () => {
    // scroll behavior
    d.querySelectorAll('.c-nav--lists--item--anchor').forEach(elem => {
      elem.addEventListener('click', e => {
        e.stopPropagation()
        e.preventDefault()

        const target = d.getElementById(e.target.getAttribute('href').replace('#', ''))
        if(target) {
          let y = target.offsetTop
          window.scrollTo({
            top: y,
            left: 0,
            behavior: 'smooth',
          })
        }

        return false
      })
    })
  })
})(document)