import { Route, Routes, BrowserRouter } from 'react-router-dom';
import CreateWorkFlow from './component/CreateWorkFlow';
import '@xyflow/react/dist/style.css';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create-workflow" element={<CreateWorkFlow />} />
      </Routes>
    </BrowserRouter>
  )
}