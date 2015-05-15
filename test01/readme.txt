# milkcocoaの登録
- https://mlkcca.com に接続
- 新規登録でユーザー登録をする
- 新しいアプリを作る で、アプリ名を入力して作成

# 動作確認のため、チャットを作成
- Milkcocoaのチュートリアルにしたがって、チャットを作成

# これまでのチャットを表示
- ユーザー認証をしないとデータを読み出せなくなることを確認するために、ユーザー認証を追加する
- 以下のコードをmain.jsに追加
function getChatAll() {
    chatDataStore.stream().next(
        function (err, data) {
            for (var i = 0 ; i < data.length ; i++) {
                addText(data[i].value.message);
            }
        }
    );
}
- window.onload関数の最後に、getChatAll()の呼び出しを追加

# Auth0について確認
- 認証にAuth0というサービスを利用する。おおまかな流れを以下のチュートリアルで確認する。
https://auth0.com/docs


# テストアプリをURLに公開
- 認証時に許可するURLが必要そうなので


# ユーザー認証をつける
- https://mlkcca.com/document/start-js-auth.html を参照して、作成したアプリ用の情報を登録する
## 登録手順
- [auth0](https://auth0.com/) を開いて、[CREATE FREE ACCOUNT]で無料アカウントを作成する
- Github、Google+、Microsoftアカウントのいずれかで認証するか、メールアドレスと新規のパスワードで登録する
- Reginは選択肢がないのでUS West。domainは任意のものを登録しておく(tmnt-nenpyo)
- 連携させたいサービスを選択して[Save]
- 登録が終わると画面が切り替わるので、左のメニューから[Apps/APIs]を選択
- 右上の[+ NEW APP/API]をクリック
- 新規に作成するので[CREATE A NEW APP/API]を押す
- 作成しているアプリの名前を入力する
- 画面が切り替わるので[Settings]を選び、




管理者ユーザーを作成
管理データは管理者のみアクセス可能に設定する
-設定方法を書いておく



