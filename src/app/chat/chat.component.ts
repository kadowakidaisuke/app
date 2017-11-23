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
    console.log(this.FB_comments);
    this.FB_comments.subscribe((snapshots: any[]) => {
      this.comments = [];
      console.log(snapshots);
      snapshots.forEach((snapshot: any) => {
        this.comments.push(new Comment(snapshot.user, snapshot.content).setData(snapshot));
        //最大保持数の設定
        while(this.comments.length > 20){
          this.comments.shift();
        }
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

  // ドラッグ
  drag: any;
  dragList: any;
  mdown(e:any){
    console.log(e);
    e.target.classList.add('drag');
    this.dragList = document.getElementsByClassName("media");
    this.drag = <HTMLElement>document.getElementsByClassName("drag")[0];
    //ドラッグした要素を最前面に配置
    let zIndexList = [];
    for(let i of this.dragList){
      zIndexList.push(i.style.zIndex);
    }
    this.drag.style.zIndex = Math.max.apply(null,zIndexList) + 1;
  }
  mmove(e:any){
    this.drag = <HTMLElement>document.getElementsByClassName("drag")[0];
    if(!this.drag){
      return false;
    }
    this.drag.style.left = e.clientX + 'px';
    this.drag.style.top = e.clientY + 'px';
  }
  mup(e:any){
    if(!this.drag){
      return false;
    }
    // 位置を保存する
    this.FB_comments.update(this.drag.getAttribute('key'),{
      cloud_x : e.clientX / window.innerWidth * 100,
      cloud_y : e.clientY / window.innerHeight * 100
    })
    this.drag.classList.remove('drag');
  }

}
