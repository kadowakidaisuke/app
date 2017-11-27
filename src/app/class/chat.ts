import * as moment from 'moment'; // 追加

export class User {
  uid: number;
  name: string;

  constructor(uid: number, name: string) {
  	this.uid = uid;
  	this.name = name;
  }
}

export class Comment {
  user: User;
  initial: string;
  content: string;
  date: number;
  key?: string; // 追加
  edit_flag?: boolean; // 追加
  cloud_x?: number;
  cloud_y?: number;
  cloud_z?: number;
  constructor(user: User, content: string, cloud_z:number) {
    this.user = user;
    this.initial = user.name.slice(0, 1);
    this.content = content;
    this.date = +moment();
    this.cloud_x = Math.floor(Math.random() * 80) + 10;
    this.cloud_y = Math.floor(Math.random() * 80) + 10;
    this.cloud_z = cloud_z;
  }

  // 取得した日付を反映し、更新フラグをつける
  setData(value: any): Comment {
    this.date = value.date;
    this.key = value.$key // 追加
    this.edit_flag = false; // 追加
    this.cloud_x = value.cloud_x;
    this.cloud_y = value.cloud_y;
    this.cloud_z = value.cloud_z;
    return this;
  }
}
