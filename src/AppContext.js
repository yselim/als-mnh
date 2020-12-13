import React, { Component } from "react";
import { listenUsers } from "./firestoreMethods";
// import {
//   pullQuestions,
//   pullAnswers,
//   listenAuthenticatedUserChanges,
// } from "./db/FirebaseMethods";
// import { getServerDate } from "./db/FirebaseMethods";
// import { convertStringToDate, convertDateToString } from "./HelperFunctions";

const AppContext = React.createContext();

class AppProvider extends Component {


  constructor(props) {
    super(props);
    this.state = {
      selectedList:"",
      admins : [], 
      patients: [],
      nurses: [],
      docs: [],
      reports:[],
      selectedUser:null

      // admins, patients vs. listelerinde başkası değişiklik yaparsa, bunları kullanan tüm insanların ekranları re-render olacak.
      // bu saçma render'lara sebep oluyor. context-api'nin kötü özelliği. Ama kişi listesi seyrek değişeceği için bunu kabul ediyorum.
      // raporlar gibi sık güncellenecek alanları context-api'de değil local state'te tutmalıyım. 
    };
  }

  

  componentDidMount() {
    listenUsers((userType, newUsers) => {
      if(userType==="admins")
       this.setState({ admins: newUsers });
       else if(userType==="patients")
       this.setState({ patients: newUsers });
       else if(userType==="nurses")
       this.setState({ nurses: newUsers });
        else if(userType==="docs")
        this.setState({ docs: newUsers });

    }); // TODO: Burası hemşire için çalışmayacak. Hocalar sadece hastaları görecek filan...
  }




  // pullQuestionsFromDb = async (questionDate) => {
  //   if (!this.state.isPullingQuestions) {
  //     this.setState({ isPullingQuestions: true }, async () => {
  //       const questions = await pullQuestions(questionDate);
  //       this.setState({ questions, isPullingQuestions: false });
  //     });
  //   }
  // };

  // pullAnswersFromDb = async (answerDate) => {
  //   if (!this.state.isPullingAnswers) {
  //     this.setState({ isPullingAnswers: true }, async () => {
  //       const answers = await pullAnswers(answerDate);
  //       this.setState({ answers, isPullingAnswers: false });
  //     });
  //   }
  // };

  // setDateToToday = async () => {
  //   // burada today user'ın bilgisyarının tarihi değil, firebase db'nin tarihi olacak.
  //   const today = await getServerDate();
  //   this.changeDate(today);
  // };

  // changeDate = (newDate) => {
  //   this.setState({ selectedDate: newDate });
  //   this.pullQuestionsFromDb(newDate);
  //   this.pullAnswersFromDb(newDate);
  // };

  // setUser = (user) => {
  //   if (user) {
  //     const userIsAnAdmin = Object.keys(user).length > 0;
  //     this.setState({ user, userIsAnAdmin });
  //   } else {
  //     this.setState({ user: {}, userIsAnAdmin: false });
  //   }
  // };

  // reorderQuestions = (orders) => {
  //   //orders objesi. key'ler question id, value'lar soru sırası olacak şekilde key-value çiftleri içerir.

  //   let questions = this.state.questions;

  //   Object.keys(orders).map(function (key) {
  //     let q = questions.find((item) => item.dbKey === key);
  //     q.order = orders[key];
  //     return null;
  //   });

  //   questions.sort(function (first, second) {
  //     return first.order - second.order;
  //   });

  //   this.setState({ questions });
  // };

  changeCentralState = (key, value)=>{
   
      this.setState({[key]: value});
  }

  render() {

    const {
      changeCentralState
    } = this;

    return (
      <AppContext.Provider
        value={{
         ...this.state,
          changeCentralState
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContext;

export { AppProvider };
