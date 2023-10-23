export const useUtils = () => {
  const formatDate = (postTime) => {
    const now = new Date();
    const postDate = new Date(postTime);
    const elapsedMilliseconds = now - postDate;
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    const elapsedHours = Math.floor(elapsedMinutes / 60);

    if (elapsedMinutes < 1) {
      return "1 minute ago";
    } else if (elapsedMinutes < 60) {
      return `${elapsedMinutes} minutes ago`;
    } else if (elapsedHours < 24) {
      return `${elapsedHours} hours ago`;
    } else {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      return  postDate.toLocaleDateString('en-US', options).replace(/\//g, '.');
    }
  }

  return {formatDate}
}





