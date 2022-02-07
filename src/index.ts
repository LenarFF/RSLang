import { Footer } from './components/Footer/Footer';
import { MainPage } from './pages/MainPage/main-Page';
import './styles.scss';

const root = document.getElementById('root');
if (root) {
  new MainPage(root);
  new Footer(root);
}
