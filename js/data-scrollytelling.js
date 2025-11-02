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

        // Only act when element is clearly visible and not already active
        if (entry.isIntersecting && index !== activeIndex) {
          clearTimeout(scrollTimeout); // debounce rapid scrolls

          // Small delay to ensure direction stability (prevents flicker)
          scrollTimeout = setTimeout(() => {
            activeIndex = index;

            steps.removeClass("active past");
            entry.target.classList.add("active");
            steps.slice(0, index).addClass("past");

            // 🔹 Trigger your data-viz animation
            if ($(entry.target).hasClass("data-viz-box")) {
              $(".bluebox, .graybox").css("opacity", "1");
            }

            // 🔹 Auto scroll precisely to that section
            isAutoScrolling = true;
            $("html, body")
              .stop()
              .animate(
                {
                  scrollTop: $(entry.target).offset().top - 450,
                },
                150, // ⏱ shorter duration — feels snappier
                "swing",
                () => {
                  isAutoScrolling = false;
                }
              );
          }, 100); // small debounce so it doesn't bounce back/forth
        }
      });
    },
    {
      threshold: 0.1, // wait until 70% visible before triggering
    }
  );

  steps.each(function () {
    observer.observe(this);
  });
});
