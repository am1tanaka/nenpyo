参考URL https://gihyo.jp/dev/feature/01/milkcocoa-baas/0010?page=2

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
- 認証時に許可するURLが必要なので、github pagesなどに、サンプルをアップしておく


# ユーザー認証をつける
- https://mlkcca.com/document/start-js-auth.html を参照して、作成したアプリ用の情報を登録する
## 登録手順
- [auth0](https://auth0.com/) を開いて、[CREATE FREE ACCOUNT]で無料アカウントを作成する
- Github、Google+、Microsoftアカウントのいずれかで認証するか、メールアドレスと新規のパスワードで登録する
- Reginは選択肢がないのでUS West。domainは任意のものを登録しておく
- 連携させたいサービスを選択して[Save]
- 登録が終わると画面が切り替わるので、左のメニューから[Apps/APIs]を選択
- 右上の[+ NEW APP/API]をクリック
- 新規に作成するので[CREATE A NEW APP/API]を押す
- 作成しているアプリの名前を入力する
- 画面が切り替わるので[Settings]を選ぶ
- 別のウィンドウでMilkcocoaのHPにログインして、アプリの設定を開いて、[認証]を選び、Auth0のシークレットキーをコピーしておく
- Auth0のページに戻り、コピーしたシークレットキーを張り付ける
- 公開したページへのURLをAllowed Callback URLs とAllowed Origins (CORS) に入力する
- [SAVE CHANGES]で保存する
- 左のメニューから[Connections]を押す
- ユーザー名とパスワードでの認証を行う場合
    - Databaseを選択
    - [+ NEW DATABASE CONNECTION]を押す
    - 任意のデータベース名を入力する
- ソーシャルログインを使う場合は、[Social]をクリック
    - 使いたいものを有効にして、SAVE
以上で、Auth0の設定は完了。

- https://github.com/milk-cocoa/document/blob/master/examples/auth-auth0/index.html にアクセスして、ソースコードを自前のindex.htmlに貼り付ける
- var lock = new Auth0Lock()の引数を、自分で登録したDomainとClientIDに変更する
- new MilkCocoa()の引数を、自分のアプリのものに変更




管理者ユーザーを作成
管理データは管理者のみアクセス可能に設定する
-設定方法を書いておく



