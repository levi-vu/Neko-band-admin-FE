import './loading.styles.scss';

function Loading() {
  return (
    <div className='loading'>
    <svg viewBox="25 25 50 50" className="loading-container">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>
    </div>
  );
}

export default Loading;
