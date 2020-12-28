import "./App.css";
import { DataStore } from "@aws-amplify/datastore";
import { Users } from "./models";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import Article from "./components/Article";
import GlobalStyle from "./styles/global";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store";

function App() {
  // const handleCreateUser = async () => {
  //   await DataStore.save(
  //     new Users({
  //       firstName: "Lorem ipsum dolor sit amet",
  //       lastName: "Lorem ipsum dolor sit amet",
  //       email: "test12346789@testemailtestemail.com",
  //       password: "Lorem ipsum dolor sit amet",
  //     })
  //   );

  //   const models = await DataStore.query(Users);
  //   console.log(models);
  // };

  // const handleDeleteUser = async () => {
  //   const modelToDelete = await DataStore.query(
  //     Users,
  //     "c448bb58-b406-4435-a179-38f8f681a938"
  //   );
  //   DataStore.delete(modelToDelete);
  // };

  return (
    <Provider store={store}>
      <Dashboard />
      <Footer />
      <Article />
      <GlobalStyle />
    </Provider>
  );
}

export default App;
