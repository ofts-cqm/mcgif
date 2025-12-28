import { createRoot } from 'react-dom/client'
import './index.css'
import './mdui-imports.js'
import Root from './Root';

import('./i18n').then(_ => createRoot(document.getElementById('root')).render(<Root />))
