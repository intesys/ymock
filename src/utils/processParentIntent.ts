export const processParentIntent = (data: any) => {
  switch (data) {
    case "close":
      window.close();
  }
};
