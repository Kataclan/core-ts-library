import User from '../../User/entity/User';

export default class PassengerAllocation {
  private _travel_plan_id: string;
  private _user: User;
  private _seats: number;
  private _legs: any;

  get travel_plan_id(): string {
    return this._travel_plan_id;
  }

  set travel_plan_id(value: string) {
    this._travel_plan_id = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get seats(): number {
    return this._seats;
  }

  set seats(value: number) {
    this._seats = value;
  }

  get legs(): any {
    return this._legs;
  }

  set legs(value: any) {
    this._legs = value;
  }
}
