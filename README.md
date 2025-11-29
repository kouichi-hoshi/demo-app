# Demo App - Stella Dev

Next.jsとFirebaseで構築した学習用ToDoアプリです。Googleアカウントでログインするとタスク機能が有効になり、ドラッグ&ドロップで順序変更できるリッチなToDo管理を体験できます。

---

## 概要

- Google認証を通過したユーザーのみがタスクを追加・編集できます。
- Firestoreに保存されたタスクはリアルタイムで同期され、異なるデバイス間でも共有されます。
- PC/タブレット/スマートフォンに対応したレスポンシブUIを採用しています。

---

## 主な機能

- タスクの追加・編集・完了状態切り替え
- ドラッグ&ドロップによる順序変更（`@dnd-kit`）
- 完了済みタスクの表示/非表示切り替え
- 完了済みタスクの一括削除
- **注意**: 個別の削除ボタンは完了済みタスクにのみ表示されます。
- Google認証によるログイン/ログアウトとステータス表示

---

## 技術スタック

- Framework: Next.js 14.2.7（App Router）
- Language: TypeScript
- Auth/DB: Firebase Authentication & Firestore
- Styling: Tailwind CSS / SCSS
- Drag & Drop: `@dnd-kit/core`, `@dnd-kit/sortable`
- Date Utility: dayjs
- UI Icons: react-icons
- Testing: Jest, React Testing Library

---

## 必要な環境

- Node.js 22.12.0（Volta設定済み）
- npm / yarn / pnpm / bun のいずれか

---

## セットアップ

1. リポジトリを取得
   ```bash
   git clone <repository-url>
   cd demo-app
   ```
2. 依存関係をインストール
   ```bash
   npm install
   # または yarn / pnpm / bun install
   ```
3. 環境変数を設定（下記参照）
4. 開発サーバーを起動
   ```bash
   npm run dev
   ```
5. ブラウザで [http://localhost:3000](http://localhost:3000) を開く

---

## 環境変数

`/.env.local` などに以下を設定してください（Firebase Consoleから取得）。

```env
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
FIREBASE_STORAGE_BUCKET=xxx.appspot.com
FIREBASE_MESSAGING_SENDER_ID=xxxxxxxxxxxx
NEXT_PUBLIC_FIREBASE_APP_ID=1:xxxxxxxxxxxx:web:xxxxxxxxxxxxxxxxxxxxxx
```

---

## 利用可能なスクリプト

| コマンド           | 説明             |
| ------------------ | ---------------- |
| `npm run dev`      | 開発サーバー起動 |
| `npm run build`    | 本番ビルド       |
| `npm run start`    | 本番サーバー起動 |
| `npm run lint`     | ESLintチェック   |
| `npm run fix:lint` | ESLintの自動修正 |
| `npm test`         | Jestテスト実行   |

---

## プロジェクト構造（抜粋）

```
src/app/
├── _components/
│   ├── CommonHeader/        # ロゴ+ログインボタン
│   ├── FirebaseLogIn/       # Googleログイン/ログアウト
│   ├── LoginStatus/         # 認証状態表示
│   ├── PageHeader/          # ページ見出し（テストあり）
│   ├── SortableTaskList/    # DnD対応タスクUI
│   └── TaskList/            # タスクアイテム
├── _hooks/
│   └── useTasks/            # FirestoreとD&Dのロジック
├── _lib/
│   └── firebase.ts          # Firebase初期化
├── _provider/
│   ├── FirebaseProvider/    # Authコンテキスト
│   └── FirebaseWrapProvider/# Provider組み合わせ
├── todo-app/page.tsx        # ToDoアプリ本体
├── page.tsx                 # ホーム（ログイン誘導）
└── layout.tsx               # ページ共通レイアウト
```

---

## データの扱いと利用時の注意

- タスクはユーザーごとのFirestoreコレクションに保存されます。
- Googleログインを解除してもデータは自動で削除されません。削除したい場合はログイン中にタスクを削除してください。
- アプリはベータ版のため、予告なくサービス仕様が変わる可能性があります。

---

## テスト

Jest + React Testing Libraryを利用しています。

```bash
npm test
```

カバレッジレポートは `coverage/` に出力されます。

---

## デプロイ

Vercelへのデプロイを想定しています。

1. Vercelで新規プロジェクトを作成しGitリポジトリを連携
2. 上記環境変数をVercelに設定
3. Deployボタンを押すだけでビルド・デプロイが完了
