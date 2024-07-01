import { User } from '../../entities/user';
import { UsersRepository } from '../../repositories/users-repository';
import { UserNotFound } from './errors/UserNotFound'

interface UpdateUserDetailsRequest {
  id: string;
  bio?: string;
  link?: string;
}

type UpdateUserDetailsResponse = User

export class UpdateUserDetails {
  constructor (
    private usersRepository: UsersRepository
  ) {}
  
  async execute({
    id,
    bio,
    link
  }: UpdateUserDetailsRequest): Promise<UpdateUserDetailsResponse> {
    const user = await this.usersRepository.find(id)

    if(!user) {
      throw new UserNotFound()
    }

    if(bio) user.bio = bio
    if(link) user.link = link

    await this.usersRepository.save(user)
    
    return user
  }
}
