import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import { TodoContextProvider } from '../../Components/Context'
import { AppUI } from './AppUI'

 const App = () => {

 
  return (
    <BrowserRouter>

      <TodoContextProvider>
        <Switch>
          <Route exact path='/' >
            <AppUI/>
          </Route>  
          <Route path='/home' >
            <AppUI/>
          </Route>  
          <Route path='*'>
            <p>Not Found</p>
          </Route>
        </Switch>  
        
      </TodoContextProvider>
    </BrowserRouter>
  )
 }
 export {App}