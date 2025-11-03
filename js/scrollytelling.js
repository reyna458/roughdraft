$(document).ready(function () {
  const steps = $(".step");
  let isAutoScrolling = false;
  let activeIndex = -1;
  let scrollTimeout;

  const observer = new IntersectionObserver(
    (entries) => {
      if (isAutoScrolling) return;

      entries.forEach((entry) => {
        const index = steps.index(entry.target);

        if (entry.isIntersecting && entry.intersectionRatio > 0.5 && index !== activeIndex) {
          clearTimeout(scrollTimeout);

          scrollTimeout = setTimeout(() => {
            activeIndex = index;

            steps.removeClass("active past");
            entry.target.classList.add("active");
            steps.slice(0, index).addClass("past");

            // Optional data-viz trigger
            if ($(entry.target).hasClass("data-viz-box")) {
              $(".bluebox, .graybox").css("opacity", "1");
            }

            // --- FIXED SCROLL TARGET ---
            // This uses getBoundingClientRect() to measure relative to viewport
            const rect = entry.target.getBoundingClientRect();
            const scrollOffset = window.scrollY + rect.top - 0; // 60px top offset
            const maxScroll = $(document).height() - window.innerHeight;
            const targetScroll = Math.min(scrollOffset, maxScroll);

            isAutoScrolling = true;
            $("html, body")
              .stop()
              .animate(
                { scrollTop: targetScroll },
                250,
                "swing",
                () => (isAutoScrolling = false)
              );
          }, 100);
        }
      });
    },
    {
      threshold: [0.3, 0.6, 0.9],
    }
  );

  steps.each(function () {
    observer.observe(this);
  });
});
