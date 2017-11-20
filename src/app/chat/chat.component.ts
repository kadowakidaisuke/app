import { Component, OnInit } from '@angular/core';
import { Comment, User } from '../class/chat'; // パスを調整
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

const CURRENT_USER: User = new User(1, 'Tanaka Jiro');
const ANOTHER_USER: User = new User(2, 'Suzuki Taro');

(function(){
  var drag_x:number;
  var drag_y:number;
  //ドラッグ&ドロップ
  var elements: any = document.getElementsByClassName("media");
  console.log(elements);
  //マウスが要素内で押されたとき、又はタッチされたとき発火
  for(var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("mousedown", mdown, false);
    elements[i].addEventListener("touchstart", mdown, false);
  }
  function mdown(e){
    this.classList.add('drag');
    console.log('aaa')
    //タッチデイベントとマウスのイベントの差異を吸収
    if(e.type === "mousedown") {
      var event = e;
    }
    else {
      var event = e.changedTouches[0];
    }
    //要素内の相対座標を取得
    drag_x = event.pageX - this.offsetLeft;
    drag_y = event.pageY - this.offsetTop;
    //ムーブイベントにコールバック
    document.addEventListener("mousemove", mmove, false);
    document.addEventListener("touchmove", mmove, false);
  }
  //マウスカーソルが動いたときに発火
  function mmove(e) {
    //ドラッグしている要素を取得
    var drag = <HTMLElement>document.getElementsByClassName("drag")[0];
    //同様にマウスとタッチの差異を吸収
    if(e.type === "mousemove") {
       var event = e;
    } else {
       var event = e.changedTouches[0];
    }
    //フリックしたときに画面を動かさないようにデフォルト動作を抑制
    e.preventDefault();
    //マウスが動いた場所に要素を動かす
    drag.style.top = event.pageY - drag_y + "px";
    drag.style.left = event.pageX - drag_x + "px";
    //マウスボタンが離されたとき、またはカーソルが外れたとき発火
    drag.addEventListener("mouseup", mup, false);
    document.body.addEventListener("mouseleave", mup, false);
    drag.addEventListener("touchend", mup, false);
    document.body.addEventListener("touchleave", mup, false);
  }

  //マウスボタンが上がったら発火
  function mup(e) {
    var drag = document.getElementsByClassName("drag")[0];
    //ムーブベントハンドラの消去
    document.body.removeEventListener("mousemove", mmove, false);
    drag.removeEventListener("mouseup", mup, false);
    document.body.removeEventListener("touchmove", mmove, false);
    drag.removeEventListener("touchend", mup, false);
    //クラス名 .drag も消す
    drag.classList.remove("drag");
  }
})()

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
  //console.log(this)

  constructor(private db: AngularFireDatabase){ } // praivateを追加

  ngOnInit() { // コンストラクタの内容を移す
    this.FB_comments = this.db.list('/comments'); // thisを追加
    this.FB_comments.subscribe((snapshots: any[]) => {
      this.comments = [];
      console.log(snapshots);
      snapshots.forEach((snapshot: any) => {
        this.comments.push(new Comment(snapshot.user, snapshot.content).setData(snapshot));
        //最大保持数の設定
        while(this.comments.length > 10){
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

}
