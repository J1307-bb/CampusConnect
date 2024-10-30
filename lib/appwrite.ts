import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
  } from "react-native-appwrite";

  export const appwriteConfig = {
        endpoint: "https://campusconnect.appwrite.io/v1",
        platform: "com.test.campus",
        projectId: "6719989f0031c9322f46",
        databaseId: "67199ab9000efe7ab27f",
        storageId: "",
        userCollectionId: "67199abd0027849453df",
    };

  const client = new Client()
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

    const account = new Account(client);
    const storage = new Storage(client);
    const avatars = new Avatars(client);
    const databases = new Databases(client);
    
    // Register user
    export async function createUser(email: string, password: string, username: string) {
      try {
        const newAccount = await account.create(
          ID.unique(),
          email,
          password,
          username
        );
    
        if (!newAccount) throw Error;
    
        const avatarUrl = avatars.getInitials(username);
    
        await signIn(email, password);
    
        const newUser = await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.userCollectionId,
          ID.unique(),
          {
            accountId: newAccount.$id,
            email: email,
            username: username,
            avatar: avatarUrl,
          }
        );
    
        return newUser;
      } catch (error: any) {
        throw new Error(error);
      }
    }
    
    // Sign In
    export async function signIn(email: string, password: string) {
      try {
        const session = await account.createEmailPasswordSession(email, password);
    
        return session;
      } catch (error: any) {
        throw new Error(error);
      }
    }

    // Get Account
    export async function getAccount() {
        try {
        const currentAccount = await account.get();
    
        return currentAccount;
        } catch (error: any) {
        throw new Error(error);
        }
    }

    export async function getCurrentUser() {
        try {
          const currentAccount = await getAccount();
          if (!currentAccount) throw Error;
      
          const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
          );
      
          if (!currentUser) throw Error;
      
          return currentUser.documents[0];
        } catch (error) {
          console.log(error);
          return null;
        }
      }

      // Sign Out
    export async function signOut() {
        try {
        const session = await account.deleteSession("current");
    
        return session;
        } catch (error: any) {
        throw new Error(error);
        }
    }