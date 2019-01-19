let div = document.createElement('div')
div.className = 'tao-loading';
div.innerHTML = `<div class="tao-box">
                    <svg class="circular" viewBox="25 25 50 50">
                        <circle class="path" cx="50" cy="50" r="20" fill="none"/>
                    </svg>
                </div>`;
div.addEventListener('touchmove', function(e) {
    e.stopPropagation();
    e.preventDefault()
})
export default class TaoLoading {
    static show () {
        !div.parentNode && document.body.appendChild(div)
    }
    static hide() {
        div.parentNode && document.body.removeChild(div)
    }
}