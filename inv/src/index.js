import {createRoot} from 'react-dom/client';
 import {App}  from "./component/app.component";
// import {Test} from "./component/test.component";
/*
 let info ={
     name:"Arush",
     address:"Bkt"
 }
 */
 
const root = createRoot (document.getElementById('app'));
root.render(<App></App>)

//ReactDOM.render(<Test />, document.getElementById('app'));

