import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) {}

  async fetchRandomUsers(results: number, page: number) {
    const url = `https://randomuser.me/api?results=${results}&page=${page}`;
    const response = await firstValueFrom(this.httpService.get(url));
    const manipluateUsers = response.data.results.map((user) => ({
      name: `${user.name.first} ${user.name.last}`,
      location: `${user.location.street.number},${user.location.street.name}, ${user.location.state} , ${user.location.country}`,
      email: user.email,
      age: user.dob.age,
      phone: user.phone,
      cell: user.cell.split(' ').join('-'),
      picture: [
        user.picture.large,
        user.picture.medium,
        user.picture.thumbnail,
      ],
    }));
    return manipluateUsers;
  }
}
