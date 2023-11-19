import { UserRepository } from '../../core/repositories/UserRepositories';
import User from '../../core/domain/entieies/User';

interface UserMap {
  id: object | undefined;
  username: string;
  password: string;
  date: Date;
}

export class UserRepositoriesImpl implements UserRepository {
  static UserModel: any;
  // getUserData(user: User): UserMap {
  //   return {
  //     idUser: user.getId(),
  //     username: user.getUsername(),
  //     password: user.getPassword(),
  //     date: user.getDate() as any
  //   };
  // }
  // getUserClass(userData: any) {
  //   const idUser: userData.dataValues.idUser; //forzar con Number()?
  //   const usernme: userData.dataValues.username;
  //   //añadir demás valores aquí
  //   const userInstance = new User(username, '', '', '');
  //   userInstance.setId(idUser);
  //   return userInstance;
  // }

  async create(user: User): Promise<void> {
    console.log(`falta implementar create con ${user}`);
    // const UserData = this.getUserData(user);
    // console.log(UserData);
    // if (UserRepositoriesImpl.UserModel) {
    //   try {
    //     await UserRepositoriesImpl.UserModel.create(UserData as any);
    //   } catch (error) {
    //     console.error('Error creating the user', error);
    //   }
    // }
  }

  async findById(id: number): Promise<User | null> {
    console.log(`falta implementar findById con ${id}`);
    return null;
  }

  async findAll(): Promise<User[] | null> {
    console.log('falta implementar');
    return null;
  }

  async update(user: User): Promise<void> {
    console.log(`falta implementar update con ${user}`);
  }

  async delete(id: number): Promise<void> {
    console.log(`falta implementar delete con ${id}`);
  }
}
