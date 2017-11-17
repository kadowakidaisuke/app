import { Component, OnInit } from '@angular/core';
import { Comment, User } from '../class/chat'; // パスを調整
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

const CURRENT_USER: User = new User(1, 'Tanaka Jiro');
const ANOTHER_USER: User = new User(2, 'Suzuki Taro');

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  public FB_comments: FirebaseListObservable<any[]>;
  public content = '';
  public comments: Comment[] = [];
  public current_user = CURRENT_USER;

  constructor(private db: AngularFireDatabase){ } // praivateを追加

  ngOnInit() { // コンストラクタの内容を移す
    this.FB_comments = this.db.list('/comments'); // thisを追加
    this.FB_comments.subscribe((snapshots: any[]) => {
      this.comments = [];
      snapshots.forEach((snapshot: any) => {
        this.comments.push(new Comment(snapshot.user, snapshot.content).setData(snapshot));
      });
    });
  }

  // 新しいコメントを追加
  addComment(comment: string) {
     if (this.count < 0) {
       return false;
     }
     if (comment) {
       this.FB_comments.push(new Comment(this.current_user, comment));
       //最大保持数の設定
       while(this.comments.length > 20){
         this.comments.shift();
       }
       this.content = '';
       //文字数カウントリセット
       this.count = this.max;
     }
     console.log(this.comments);
  }

  // 編集フィールドの切り替え
  toggleEditComment(num: number) {
    let num1 = this.comments.length - 1;
    num = num1 - num;
    this.comments[num].edit_flag = (this.comments[num].edit_flag) ? false : true;
  }

  // コメントを更新する
  saveEditComment(num: number, key: string) {
    let num1 = this.comments.length - 1;
    num = num1 - num;
    this.FB_comments.update(key, {
      content: this.comments[num].content,
      date: this.comments[num].date
    }).then( () => {
      alert('コメントを更新しました');
      this.comments[num].edit_flag = false;
    });
  }

  // コメントをリセットする
  resetEditComment(num: number) {
    this.comments[num].content = '';
  }

  // コメントを削除する
  deleteComment(key: string) {
    this.FB_comments.remove(key);
  }

  //トラッキング
  trackFn(index: any, comment: any){
    return comment.key;
  }

  //入力文字数カウント
  max = 100;
  count = this.max;
  myStyle = {background:'none'};
  setCount(){
    this.count = this.max - this.content.length;
    if(this.count < 0){
      this.myStyle = {background:'red'};
    }
    else {
      this.myStyle = {background:'none'};
    }
  }

}