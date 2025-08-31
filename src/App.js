import logo from './logo.svg';
import './App.css';

import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './components/Layout';
import Home from './components/main/Home';

const font = "'Inter', sans-serif"

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#141414',
      paper: '#6c6c6cff',
    },
  },
  typography: {
    fontFamily: font,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
