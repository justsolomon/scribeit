import { App } from 'containers';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

root.render(<App />);
