import { Injectable, NotFoundException } from '@nestjs/common';
import _ from 'lodash';
import { PrismaService } from 'src/database';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly dbContext: PrismaService) {}

  public async comparePassword(option: {inputPassword: string, existedPassword: string}): Promise<boolean> {
    const {inputPassword, existedPassword} =  option;

    const isEqual = await bcrypt.compare(inputPassword, existedPassword);
    
    return isEqual;
  }

  public async verifyUser(option: {email: string, password: string}) {
    const {email, password} = option;

    const user = await this.dbContext.user.findUnique({
      where: { 
        email
      }, 
      select: {
        id: true, 
        password: true,
        email: true,
        name: true,
        country: true,
        dob: true,
        role:{
          select: {
            type: true
          }
        },
      }
    });
    
    if (!user?.id) {
      throw new NotFoundException('There is no user with that email in the system');
    }

    const isRightPassword = await this.comparePassword({existedPassword: user.password, inputPassword: password})

    return isRightPassword ? user : false;
  }
}
