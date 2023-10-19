
class WfOnVisible extends HTMLElement {
  constructor() {
    super();
    this._observer = null;

    this._handleIntersection = this._handleIntersection.bind(this);

    this.animationClass = this.dataset.animation?.split(',');
    this.animationDelay = parseInt(this.dataset.animationDelay || '0', 10);

    this.style.display = 'block';
  }

  connectedCallback() {
    this._observer = new IntersectionObserver(this._handleIntersection, {
      threshold: 0.025,
    });
    this._observer.observe(this);
  }

  disconnectedCallback() {
    this._observer.unobserve(this);
  }

  _handleIntersection(entries) {
    const entry = entries[0];
    if (entry.isIntersecting) {
      setTimeout(() => {
        this.style.opacity = 1;
        this.classList.add('is-visible');
        this.classList.add(this.animationClass);
      }, this.animationDelay);
      this._observer.unobserve(this);
    }
  }
}

customElements.define('wf-on-visible', WfOnVisible);
