export const TRANSITIONS = {
  duration: {
    heading: 0.6,
    paragraph: 0.5,
    button: 0.45,
    stagger: 0.06,
  },
  ease: [0.16, 1, 0.3, 1] as const,
};

export const ANIMATION_VARIANTS = {
  heading: {
    hidden: { opacity: 0, rotateX: 35, y: 80, scale: 0.95 },
    visible: { opacity: 1, rotateX: 0, y: 0, scale: 1 },
  },
  paragraph: {
    hidden: { opacity: 0, rotateX: 15, y: 40 },
    visible: { opacity: 1, rotateX: 0, y: 0 },
  },
  sectionTitle: {
    hidden: { opacity: 0, rotateX: 15, y: 40 },
    visible: { opacity: 1, rotateX: 0, y: 0 },
  },
  card: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  ctaZoomOut: {
    hidden: { opacity: 0, scale: 1.08, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  }
};
