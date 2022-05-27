let globalOnlyComputed = 0;

export const onlyComputedWrapper = (handler: () => unknown) => {
  globalOnlyComputed++;
  try {
    return handler();
  } finally {
    globalOnlyComputed--;
  }
};

export const isInOnlyComputed = () => globalOnlyComputed > 0;
