import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <button onClick={() => console.log('not used')}>
          count is: {count}
        </button>
        <button data-testid="button" onClick={() => setCount((count) => count + 1)}>
          count is: {count}
        </button>
    </div>
  )
}

export default App
