import { Directive } from "vue";

const lazyLoad: Directive = {
  mounted(el, binding) {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.dispatchEvent(
              new CustomEvent("loadImage", { detail: binding.value })
            );
          }, 1000);
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "0px",
      threshold: 0.1,
    });

    observer.observe(el);
  },
};

export default lazyLoad;
