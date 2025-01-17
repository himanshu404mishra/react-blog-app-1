import { Client, Account, ID } from "appwrite";
import config from "../../config";
import notify from "../Toast/Toast";

class Auth {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwrite_url)
      .setProject(config.appwrite_projectId);
    this.account=new Account(this.client)
  }

  async createAccount({email,password,name}){
    try {
        const user = await this.account.create( ID.unique(), 
        email, 
        password,
        name
      )
      if(user){
        notify.SuccessToast(`Todo:, Now Login user automatically`)
        // Todo: Login user
      }
      return user
    } catch (error) {
        notify.ErrorToast(`Error: ${error}`)        
    }
  }

  async loginAccount({email,password}){
   try {
    const session = await this.account.createEmailPasswordSession(
      email, 
      password
    );
    return session
   } catch (error) {
    notify.ErrorToast(`Error: ${error}`)        

   }
  }

  async getCurrentUser(){
    try {
    const user = await this.account.get();
    if(user) return user
    return null
    } catch (error) {
      notify.ErrorToast(`Error: login to see posts`)        
      
    }
  }

  async logout(){
    try {
      const result = await this.account.deleteSessions();
      return result
    } catch (error) {
      notify.ErrorToast(`Error: ${error}`)        
      
    }
  }

}

const authService = new Auth();


export default authService;
