import { createRoot } from 'react-dom/client';

import App from './App';

const rootElement = createRoot(document.querySelector('#root'));

rootElement.render(<App />);
